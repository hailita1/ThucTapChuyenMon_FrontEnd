import {Component, OnInit} from '@angular/core';
import {ComponentsService} from '../../components.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.scss']
})
export class HouseListComponent implements OnInit {

  houseList: any[];
  message = '';
  isShow = false;
  isSuccess = true;
  categoryHouseList: any[];
  categoryRoomList: any[];
  id: string;

  constructor(private componentsService: ComponentsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idChuNha = params.get('id');
      this.componentsService.findByIdChuNha(idChuNha).subscribe(result2 => {
        this.houseList = result2;
        this.id = idChuNha;
      });
    });
    this.componentsService.listCategoryHouse().subscribe(result => {
      this.categoryHouseList = result;
    });
    this.componentsService.listCategoryRoom().subscribe(result1 => {
      this.categoryRoomList = result1;
    });
  }

  public findId(id: number) {
    this.componentsService.findById(id).subscribe(result => {
      this.houseList = result;
    });
  }

  public getHouse() {
    this.componentsService.findByIdChuNha(this.id).subscribe(result => {
      this.houseList = result;
    });
  }

  public delete(id: number) {
    this.componentsService.deleteHouse(id).subscribe(result => {
      this.isShow = true;
      this.isSuccess = true;
      this.message = 'Xóa thành công!';
      this.getHouse();
    }, error => {
      this.isShow = true;
      this.isSuccess = false;
      this.message = 'Xóa thất bại!';
    });
    this.ngOnInit();
  }

  trackByFn(index, house) {
    return house.id;
  }


}
