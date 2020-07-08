import {Component, OnInit} from '@angular/core';
import {ComponentsService} from '../../components.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IDeal} from '../../../interface/deal';

@Component({
  selector: 'app-delete-deals',
  templateUrl: './delete-deals.component.html',
  styleUrls: ['./delete-deals.component.scss']
})
export class DeleteDealsComponent implements OnInit {

  dealsList: any;
  idHouse: any;
  oneDay = 86400000;
  currentTime = new Date();

  constructor(private componentsService: ComponentsService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idSearch = params.get('id');
      this.componentsService.findByIdDeals(idSearch).subscribe(result => {
        this.dealsList = result;
      });
    });
  }

  deleteDeal(deal) {
    console.log(deal);
    const dealTime = new Date(deal.ngayDen);
    const orderTimeSecond = dealTime.getTime() - this.currentTime.getTime();
    console.log(dealTime.getTime());
    console.log(this.currentTime.getTime());
    console.log(orderTimeSecond - this.oneDay);
    if (orderTimeSecond > this.oneDay) {
      this.componentsService.deleteDeal(deal.idGiaoDich).subscribe(() => {
        alert('Thành Công!');
        this.updateHouse();
      }, error => {
        console.log('Loi! ' + error.toString());
        alert('Thất bại!');
      });
    } else {
      alert('Bạn không thể xoá đơn này do còn ít hơn 1 ngày!');
    }
  }

  updateHouse() {
    const id = this.dealsList.house.idNha;
    const trangThai = 'Trống';
    this.componentsService.editHouseByTrangThai(id, trangThai).subscribe();
  }

}
