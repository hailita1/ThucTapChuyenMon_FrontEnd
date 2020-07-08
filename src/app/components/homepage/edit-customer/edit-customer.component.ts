import {Component, OnInit} from '@angular/core';
import {ComponentsService} from '../../components.service';
import {ActivatedRoute} from '@angular/router';
import {ICustomer} from '../../../interface/customer';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  idTest: any;
  message = '';
  isShow = false;
  isSuccess = true;
  isLoading = false;
  customer: ICustomer = {
    idCustomer: 0,
    userName: '',
    password: '',
    ho: '',
    ten: '',
    cmnd: 0,
    diaChi: '',
    sdt: 0,
    avt: '',
  };
  formGroup = new FormGroup({
    userName: new FormControl(),
    password: new FormControl(),
    ho: new FormControl(),
    ten: new FormControl(),
    cmnd: new FormControl(),
    diaChi: new FormControl(),
    sdt: new FormControl()
  });

  constructor(private componentsService: ComponentsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idSearch = params.get('id');
      this.componentsService.findByIdCustomer(idSearch).subscribe(result => {
        this.customer = result;
        this.formGroup.controls.userName.setValue(this.customer.userName);
        this.formGroup.controls.password.setValue(this.customer.password);
        this.formGroup.controls.ho.setValue(this.customer.ho);
        this.formGroup.controls.ten.setValue(this.customer.ten);
        this.formGroup.controls.cmnd.setValue(this.customer.cmnd);
        this.formGroup.controls.diaChi.setValue(this.customer.diaChi);
        this.formGroup.controls.sdt.setValue(this.customer.sdt);
        this.idTest = Number(idSearch);
      });
    });
  }

  edit() {
    this.customer.idCustomer = this.idTest;
    this.customer.userName = this.formGroup.get('userName').value;
    this.customer.password = this.formGroup.get('password').value;
    this.customer.ho = this.formGroup.get('ho').value;
    this.customer.ten = this.formGroup.get('ten').value;
    this.customer.cmnd = this.formGroup.get('cmnd').value;
    this.customer.diaChi = this.formGroup.get('diaChi').value;
    this.customer.sdt = this.formGroup.get('sdt').value;
    this.componentsService.editCustomer(this.customer).subscribe(result => {
      this.isShow = true;
      this.isSuccess = true;
      this.message = 'Sửa thành công!';
      this.formGroup.reset();
    }, error => {
      this.isShow = true;
      this.isSuccess = false;
      this.message = 'Sửa thất bại!';
      this.formGroup.reset();
    });
  }

}
