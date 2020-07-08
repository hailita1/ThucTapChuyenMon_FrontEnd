import { Component, OnInit } from '@angular/core';
import {ComponentsService} from '../../components.service';
import {FormControl, FormGroup} from '@angular/forms';
import {IHost} from '../../../interface/host';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  host: IHost = {
    userName: '',
    password: '',
    hoTen: '',
    diaChi: '',
    sdt: ''
}
  formGroup = new FormGroup({
    userName: new FormControl(),
    password: new FormControl(),
    hoTen: new FormControl(),
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
    this.host.userName = this.formGroup.get('userName').value;
    this.host.password = this.formGroup.get('password').value;
    this.host.hoTen = this.formGroup.get('hoTen').value;
    this.host.diaChi = this.formGroup.get('diaChi').value;
    this.host.sdt = this.formGroup.get('sdt').value;
    this.componentsService.addUser(this.host).subscribe( result => {
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
