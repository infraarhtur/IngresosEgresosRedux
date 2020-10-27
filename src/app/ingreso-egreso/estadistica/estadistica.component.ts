import { Component, OnInit } from '@angular/core';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../../models/ingreso-egreso-model';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  ingresos: number = 0;
  egresos: number = 0;

  totalEgresos: number = 0;
  totalIngresos: number = 0;


  public doughnutChartLabels: Label[] = ['Ingresos ', 'Egresos'];
  public doughnutChartData: MultiDataSet = [[] ];
  public doughnutChartType: ChartType = 'doughnut';


  constructor(private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>) {


  }

  ngOnInit() {

    this.store.select('ingresosEgresos').subscribe(

      ({ items }) => {
        this.generarEstadistica(items)

      }
    )
  }



  generarEstadistica(items: IngresoEgreso[]) {
    this.ingresos = 0;
    this.egresos = 0;

    this. totalEgresos = 0;
    this.totalIngresos = 0;

    for (const item of items) {

      if (item.tipo === 'ingreso') {

        this.totalIngresos += Number(item.monto);
        this.ingresos ++;
      }else{

        this.totalEgresos += Number(item.monto);
        this.egresos++;
      }
    }

    this.doughnutChartData= [[ this.totalIngresos, this.totalEgresos]];
    console.log(items);
  }
}
