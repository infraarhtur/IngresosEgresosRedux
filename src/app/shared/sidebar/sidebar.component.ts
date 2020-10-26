import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor( private router:Router,  private authService:AuthService,) { }

  ngOnInit() {
  }

  logOut(){
    this.authService.logOut().then(resp=> {
      this.router.navigate(['/login']);

    });

  }

}
