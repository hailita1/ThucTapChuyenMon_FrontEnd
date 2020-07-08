import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ComponentsService} from '../../components.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-homepage',
  templateUrl: './login-homepage.component.html',
  styleUrls: ['./login-homepage.component.scss']
})
export class LoginHomepageComponent implements OnInit {
  customerName: any;
  formGroup = new FormGroup({
    userName: new FormControl(),
    password: new FormControl(),
    check: new FormControl(),
  });
  checkLogin: any;
  afterCheck: any;
  listCustomer: any[];
  customerId: any;
  message = '';
  isShow = false;
  isSuccess = true;

  constructor(private componentsService: ComponentsService, private route: Router) {
  }

  ngOnInit(): void {
    this.componentsService.getListCustomer().subscribe(result => {
      this.listCustomer = result;
    });
    this.componentsService.findByIdCheck(1).subscribe(result => {
      this.checkLogin = result;
      console.log(this.checkLogin.checkLogin);
      this.formGroup.controls.check.setValue(!this.checkLogin.checkLogin);
    });
  }

  updateCheck() {
    const id = 1;
    const check = this.formGroup.get('check').value;
    this.componentsService.updateCheck(id, check).subscribe(result => {
    });
    localStorage.setItem('check', check);
  }

  checkUser() {
    const userName = this.formGroup.get('userName').value;
    const password = this.formGroup.get('password').value;
    for (let i = 0; i < this.listCustomer.length; i++) {
      if (this.listCustomer[i].userName === userName && this.listCustomer[i].password === password) {
        this.customerId = this.listCustomer[i].idCustomer;
        localStorage.setItem('idCustomer', this.customerId);
        console.log(localStorage.getItem('idCustomer'));
        this.customerName = this.listCustomer[i].ten;
        localStorage.setItem('customerName', this.customerName);
        this.route.navigate(['/home/']).then((e) => {
          if (e) {
            console.log('Navigation is successful!');
          } else {
            console.log('Navigation has failed!');
          }
        });
        this.updateCheck();
      }
    }
  }
}
