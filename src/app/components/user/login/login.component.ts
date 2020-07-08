import {Component, OnInit} from '@angular/core';
import {ComponentsService} from '../../components.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Route, Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  formGroup = new FormGroup({
    userName: new FormControl(),
    password: new FormControl()
  });
  listUser: any[];
  userId: number;
  check = false;
  message = '';
  isShow = false;
  isSuccess = true;

  constructor(private componentsService: ComponentsService, private route: Router) {
  }

  ngOnInit(): void {
    this.componentsService.listUser().subscribe(result => {
      this.listUser = result;
    });
  }

  checkUser() {
    const userName = this.formGroup.get('userName').value;
    const password = this.formGroup.get('password').value;
    for (let i = 0; i < this.listUser.length; i++) {
      if (this.listUser[i].userName === userName && this.listUser[i].password === password) {
        this.check = true;
        this.userId = this.listUser[i].idChuNha;
        this.route.navigate(['/user/', this.userId]).then((e) => {
          if (e) {
            console.log('Navigation is successful!');
          } else {
            console.log('Navigation has failed!');
          }
        });
      }
    }
  }
}
