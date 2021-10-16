import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // this.authService.validarAcceso()
  }

  onLogin(form): void {
    this.authService.login(form.value).subscribe(res => {
      if (res.rol == "admin") {
        this.router.navigateByUrl("/admin")
      } else {
        this.router.navigateByUrl("/user")
      }
    });
  }

}