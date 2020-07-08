import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ComponentsService} from '../../components.service';
import {ActivatedRoute} from '@angular/router';
import {IHost} from '../../../interface/host';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  host: IHost = {
    idChuNha: 0,
    userName: '',
    password: '',
    hoTen: '',
    diaChi: '',
    sdt: '',
  }
  idtest: any;
  message = '';
  isShow = false;
  isSuccess = true;
  isLoading = false;
  formGroup = new FormGroup({
    idChuNha: new FormControl(),
    userName: new FormControl(),
    password: new FormControl(),
    hoTen: new FormControl(),
    diaChi: new FormControl(),
    sdt: new FormControl()
  });
  constructor(private componentsService: ComponentsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      const idSearch = params.get('id');
      this.componentsService.findByIdHost(idSearch).subscribe( result => {
        this.host = result;
        this.formGroup.controls.userName.setValue(this.host.userName);
        this.formGroup.controls.password.setValue(this.host.password);
        this.formGroup.controls.hoTen.setValue(this.host.hoTen);
        this.formGroup.controls.diaChi.setValue(this.host.diaChi);
        this.formGroup.controls.sdt.setValue(this.host.sdt);
        this.idtest = Number(idSearch);
      });
    });
  }
  edit() {
    this.isLoading = true;
    this.host.idChuNha = this.idtest;
    this.host.userName = this.formGroup.get('userName').value;
    this.host.password = this.formGroup.get('password').value;
    this.host.hoTen = this.formGroup.get('hoTen').value;
    this.host.diaChi = this.formGroup.get('diaChi').value;
    this.host.sdt = this.formGroup.get('sdt').value;
    console.log(this.host);
    this.componentsService.editUser(this.host).subscribe(result => {
      this.isShow = true;
      this.isSuccess = true;
      this.message = 'Sửa thành công!';
      this.formGroup.reset();
    }, error => {
      this.isShow = true;
      this.isSuccess = false;
      this.message = 'Sửa thất bại!';
      this.isLoading = false;
      this.formGroup.reset();
    });
  }
}
