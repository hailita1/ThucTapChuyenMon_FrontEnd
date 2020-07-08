import {Component, OnInit} from '@angular/core';
import {ComponentsService} from '../../components.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {IDeal} from '../../../interface/deal';
import {IHouse} from '../../../interface/house';

@Component({
  selector: 'app-checkout-deals',
  templateUrl: './checkout-deals.component.html',
  styleUrls: ['./checkout-deals.component.scss']
})
export class CheckoutDealsComponent implements OnInit {

  dealsList: any;
  idHouse: any;
  house: IHouse = {
    idNha: 0,
    tenNha: '',
    diaChi: '',
    soLuongPhongNgu: '',
    soLuongPhongTam: '',
    moTaChung: '',
    giaTienTheoDem: 0,
    trangThai: '',
    categoryHouse: {
      id: 0,
    },
    categoryRoom: {
      id: 0,
    },
    host: {
      idChuNha: 0,
    },
    picture: [{
      tenAnh: ''
    }]
  };
  deals: IDeal = {
    idGiaoDich: 0,
    ngayDen: '',
    ngayDi: '',
    danhGia: 0,
    trangThai: '',
    thanhTien: 0,
    phanHoi: '',
    house: {
      idNha: 0,
    },
    customer: {
      idCustomer: 0,
    }
  };
  formGroup = new FormGroup({
    ngayDen: new FormControl(),
    ngayDi: new FormControl(),
    danhGia: new FormControl(),
    thanhTien: new FormControl(),
    phanHoi: new FormControl()
  });

  constructor(private componentsService: ComponentsService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idSearch = params.get('id');
      this.componentsService.findByIdDeals(idSearch).subscribe(result => {
        this.dealsList = result;
        this.formGroup.controls.ngayDen.setValue(this.dealsList.ngayDen);
        this.formGroup.controls.ngayDi.setValue(this.dealsList.ngayDi);
        this.formGroup.controls.danhGia.setValue(this.dealsList.danhGia);
        this.formGroup.controls.thanhTien.setValue(this.dealsList.thanhTien);
        this.formGroup.controls.phanHoi.setValue(this.dealsList.phanHoi);
        this.idHouse = this.dealsList.house.idNha;
        console.log(this.idHouse);
        console.log(this.dealsList);
      });
    });
  }

  saveDeal() {
    this.deals.idGiaoDich = this.dealsList.idGiaoDich;
    this.deals.ngayDen = this.dealsList.ngayDen;
    this.deals.ngayDi = this.dealsList.ngayDi;
    this.deals.thanhTien = this.dealsList.thanhTien;
    this.deals.trangThai = 'Trả phòng';
    this.deals.danhGia = this.formGroup.get('danhGia').value;
    this.deals.phanHoi = this.formGroup.get('phanHoi').value;
    this.deals.house.idNha = this.dealsList.house.idNha;
    this.deals.customer.idCustomer = this.dealsList.customer.idCustomer;
    this.componentsService.updateDeals(this.deals).subscribe();
    this.updateHouse();
    alert('Trả phòng thành công');
    this.router.navigate(['/customer/', this.dealsList.customer.idCustomer]).then((e) => {
      if (e) {
        console.log('Navigation is successful!');
      } else {
        console.log('Navigation has failed!');
      }
    });
  }

  updateHouse() {
    const id = this.dealsList.house.idNha;
    const trangThai = 'Trống';
    this.componentsService.editHouseByTrangThai(id, trangThai).subscribe();
  }

}
