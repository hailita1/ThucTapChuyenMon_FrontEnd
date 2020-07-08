import { Component, OnInit } from '@angular/core';
import {IHost} from '../../../interface/host';
import {FormControl, FormGroup} from '@angular/forms';
import {ComponentsService} from '../../components.service';
import {ICustomer} from '../../../interface/customer';

@Component({
  selector: 'app-signup-homepage',
  templateUrl: './signup-homepage.component.html',
  styleUrls: ['./signup-homepage.component.scss']
})
export class SignupHomepageComponent implements OnInit {

  customer: ICustomer = {
    userName: '',
    password: '',
    ho: '',
    ten: '',
    cmnd: 0,
    diaChi: '',
    sdt: 0,
  }
  formGroup = new FormGroup({
    userName: new FormControl(),
    password: new FormControl(),
    ho: new FormControl(),
    ten: new FormControl(),
    cmnd: new FormControl(),
    diaChi: new FormControl(),
    sdt: new FormControl()
  });
  message = '';
  isShow = false;
  isSuccess = true;
  isLoading = false;
  constructor(private componentsService: ComponentsService) { }

  ngOnInit(): void {
  }
  save() {
    this.isLoading = true;
    this.customer.userName = this.formGroup.get('userName').value;
    this.customer.password = this.formGroup.get('password').value;
    this.customer.ho = this.formGroup.get('ho').value;
    this.customer.ten = this.formGroup.get('ten').value;
    this.customer.cmnd = this.formGroup.get('cmnd').value;
    this.customer.diaChi = this.formGroup.get('diaChi').value;
    this.customer.sdt = this.formGroup.get('sdt').value;
    this.componentsService.addCustomer(this.customer).subscribe( result => {
      this.isShow = true;
      this.isSuccess = true;
      this.message = 'Đăng kí thành công!';
      this.formGroup.reset();
    }, error => {
      this.isShow = true;
      this.isSuccess = false;
      this.message = 'Đăng kí thất bại!';
      this.isLoading = false;
      this.formGroup.reset();
    });
  }

}
