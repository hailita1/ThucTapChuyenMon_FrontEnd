import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ComponentsService} from '../../components.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IDeal} from '../../../interface/deal';
import {IHouse} from '../../../interface/house';
import {ICustomer} from '../../../interface/customer';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {
  oneDay = 86400000;
  message = '';
  isShow = false;
  isSuccess = true;
  isLoading = false;
  listHouse: any;
  id: number;
  idCustomer: any;
  categoryHouseList: any[];
  categoryRoomList: any[];
  thanhTien: number;
  currentTime = new Date();
  deals: IDeal = {
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
    categoryHouseId: new FormControl(),
    categoryRoomId: new FormControl(),
    ngayDen: new FormControl(),
    ngayDi: new FormControl(),
    danhGia: new FormControl(),
    trangThai: new FormControl(),
    thanhTien: new FormControl(),
    phanHoi: new FormControl()
  });

  constructor(private componentsService: ComponentsService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    const idSearch = localStorage.getItem('idHouse');
    this.id = Number(idSearch);
    console.log(this.id);
    this.componentsService.findById(idSearch).subscribe(result => {
      this.listHouse = result;
    });
    this.componentsService.listCategoryHouse().subscribe(result => {
      this.categoryHouseList = result;
    });
    this.componentsService.listCategoryRoom().subscribe(result1 => {
      this.categoryRoomList = result1;
    });
  }

  saveDeal() {
    this.idCustomer = localStorage.getItem('idCustomer');
    this.deals.ngayDen = this.formGroup.get('ngayDen').value;
    this.deals.ngayDi = this.formGroup.get('ngayDi').value;
    this.deals.danhGia = this.formGroup.get('danhGia').value;
    this.deals.trangThai = 'Trống';
    this.deals.thanhTien = this.thanhTien;
    this.deals.phanHoi = this.formGroup.get('phanHoi').value;
    this.deals.house.idNha = this.id;
    this.deals.customer.idCustomer = Number(this.idCustomer);
    console.log(this.deals);
    const dealTime = new Date(this.deals.ngayDen);
    console.log(dealTime.getTime());
    console.log(this.currentTime.getTime());
    if (this.deals.ngayDen < this.deals.ngayDi && dealTime.getTime() - this.currentTime.getTime() >= 0) {
      this.componentsService.addDeals(this.deals).subscribe(result => {
        this.isShow = true;
        this.isSuccess = true;
        this.message = 'Thuê thành công!';
        this.router.navigate(['/customer/', Number(this.idCustomer)]).then((e) => {
          if (e) {
            console.log('Navigation is successful!');
            alert('Đặt phòng thành công ');
            this.updateHouse();
          } else {
            console.log('Navigation has failed!');
          }
        });
        this.formGroup.reset();
      }, error => {
        this.isShow = true;
        this.isSuccess = false;
        alert('Đặt phòng thất bại ');
        this.formGroup.reset();
      });
    } else {
      alert('Đặt phòng thất bại');
    }
  }

  updateHouse() {
    const id = this.listHouse.idNha;
    const trangThai = 'Đã thuê';
    this.componentsService.editHouseByTrangThai(id, trangThai).subscribe();
  }

  payDeal() {
    const ngayDen = this.formGroup.get('ngayDen').value;
    console.log(ngayDen);
    const ngayDi = this.formGroup.get('ngayDi').value;
    console.log(ngayDi);
    const ngayDen1 = new Date(ngayDen);
    const ngayDi1 = new Date(ngayDi);
    const ngayO = ngayDi1.getTime() - ngayDen1.getTime();
    console.log(ngayO);
    const giaTienTheoDem = this.listHouse.giaTienTheoDem;
    const giaTienOTheoGiay = (giaTienTheoDem / this.oneDay);
    this.thanhTien = ngayO * giaTienOTheoGiay;
    console.log(this.thanhTien);
  }
}
