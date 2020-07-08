import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ComponentsService} from '../../components.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  isShowForm = false;
  checkLogin: any;
  idCustomer: any;
  listHouse: any[];
  listCustomer: any[];
  listCheck: any;
  customerName: any;
  check = false;
  message = '';
  isShow = false;
  isSuccess = true;
  formGroupCheck = new FormGroup({
    check: new FormControl()
  });
  formGroup = new FormGroup({
    diaChi: new FormControl(),
    soTienNhoHon: new FormControl(),
    soTienLonHon: new FormControl(),
    soLuongPhongNgu: new FormControl(),
    soLuongPhongTam: new FormControl(),
  });

  constructor(private componentsService: ComponentsService, private route: Router) {
  }

  ngOnInit(): void {
    this.componentsService.getListCustomer().subscribe(result => {
      this.listCustomer = result;
    });
    this.checkLogin = localStorage.getItem('check');
    console.log(this.checkLogin);
    this.idCustomer = localStorage.getItem('idCustomer');
    this.customerName = localStorage.getItem('customerName');
    console.log(this.customerName);
    this.componentsService.findByIdCheck(1).subscribe(result => {
      this.listCheck = result;
      this.formGroupCheck.controls.check.setValue(!this.listCheck.checkLogin);
    });
    this.isShowForm = Boolean(localStorage.getItem('check'));
  }

  exit() {
    this.updateCheck();
  }

  updateCheck() {
    const id = 1;
    const check = this.formGroupCheck.get('check').value;
    this.componentsService.updateCheck(id, check).subscribe(result => {
    });
    this.checkLogin = 'true';
    console.log(this.checkLogin);
    localStorage.removeItem('check');
    localStorage.removeItem('customerName');
  }

  public search() {
    let diaChi = this.formGroup.get('diaChi').value;
    let slpn = this.formGroup.get('soLuongPhongNgu').value;
    let slpt = this.formGroup.get('soLuongPhongTam').value;
    let dauTren = this.formGroup.get('soTienLonHon').value;
    let dauDuoi = this.formGroup.get('soTienNhoHon').value;
    // tslint:disable-next-line:triple-equals
    if (slpn == null && slpt == null && dauTren == null && dauDuoi == null) {
      slpn = '0';
      slpt = '0';
      dauTren = '0';
      dauDuoi = '0';
      this.componentsService.search1(diaChi, slpn, slpt, dauDuoi, dauTren).subscribe(result => {
        this.listHouse = result;
      });
      // tslint:disable-next-line:triple-equals
    } else if (diaChi == null && slpt == null && dauTren == null && dauDuoi == null) {
      diaChi = '0';
      slpt = '0';
      dauTren = '0';
      dauDuoi = '0';
      this.componentsService.search2(slpn, diaChi, slpt, dauDuoi, dauTren).subscribe(result => {
        this.listHouse = result;
      });
      // tslint:disable-next-line:triple-equals
    } else if (diaChi == null && slpn == null && dauTren == null && dauDuoi == null) {
      diaChi = '0';
      slpn = '0';
      dauTren = '0';
      dauDuoi = '0';
      this.componentsService.search3(slpt, diaChi, slpn, dauDuoi, dauTren).subscribe(result => {
        this.listHouse = result;
      });
      // tslint:disable-next-line:triple-equals
    } else if (diaChi == null && slpn == null && slpt == null) {
      diaChi = '0';
      slpn = '0';
      slpt = '0';
      this.componentsService.search4(dauTren, dauDuoi, diaChi, slpn, slpt).subscribe(result => {
        this.listHouse = result;
      });
      // tslint:disable-next-line:triple-equals
    } else if (slpn == null && dauTren == null && dauDuoi == null) {
      slpn = '0';
      dauDuoi = '0';
      dauTren = '0';
      this.componentsService.search5(diaChi, slpn, slpt, dauDuoi, dauTren).subscribe(result => {
        this.listHouse = result;
      });
    } else if (slpt == null && dauTren == null && dauDuoi == null) {
      slpt = '0';
      dauDuoi = '0';
      dauTren = '0';
      this.componentsService.search6(diaChi, slpn, slpt, dauDuoi, dauTren).subscribe(result => {
        this.listHouse = result;
      });
    } else if (slpt == null && slpn == null) {
      slpt = '0';
      slpn = '0';
      this.componentsService.search7(diaChi, slpn, slpt, dauDuoi, dauTren).subscribe(result => {
        this.listHouse = result;
      });
    } else if (diaChi == null && dauDuoi == null && dauTren == null) {
      diaChi = '0';
      dauTren = '0';
      dauDuoi = '0';
      this.componentsService.search8(diaChi, slpn, slpt, dauDuoi, dauTren).subscribe(result => {
        this.listHouse = result;
      });
    } else if (diaChi == null && slpn == null) {
      diaChi = '0';
      slpn = '0';
      this.componentsService.search9(diaChi, slpn, slpt, dauDuoi, dauTren).subscribe(result => {
        this.listHouse = result;
      });
    } else if (diaChi == null && slpt == null) {
      diaChi = '0';
      slpt = '0';
      this.componentsService.search10(diaChi, slpn, slpt, dauDuoi, dauTren).subscribe(result => {
        this.listHouse = result;
      });
    } else if (dauDuoi == null && dauTren == null) {
      dauTren = '0';
      dauDuoi = '0';
      this.componentsService.search11(diaChi, slpn, slpt, dauDuoi, dauTren).subscribe(result => {
        this.listHouse = result;
      });
    } else if (slpn == null) {
      slpn = '0';
      this.componentsService.search12(diaChi, slpn, slpt, dauDuoi, dauTren).subscribe(result => {
        this.listHouse = result;
      });
    } else if (slpt == null) {
      slpt = '0';
      this.componentsService.search13(diaChi, slpn, slpt, dauDuoi, dauTren).subscribe(result => {
        this.listHouse = result;
      });
    } else if (diaChi == null) {
      diaChi = '0';
      this.componentsService.search14(diaChi, slpn, slpt, dauDuoi, dauTren).subscribe(result => {
        this.listHouse = result;
      });
    } else {
      this.componentsService.search15(diaChi, slpn, slpt, dauDuoi, dauTren).subscribe(result => {
        this.listHouse = result;
      });
    }
  }
}
