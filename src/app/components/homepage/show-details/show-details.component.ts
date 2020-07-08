import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ComponentsService} from '../../components.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss']
})
export class ShowDetailsComponent implements OnInit {

  listHouse: any;
  id: number;
  deaslList: any[];
  idHouseLocal: any;
  categoryHouseList: any[];
  categoryRoomList: any[];
  formGroup = new FormGroup({
    categoryHouseId: new FormControl(),
    categoryRoomId: new FormControl()
  });
  constructor(private componentsService: ComponentsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      const idSearch = params.get('id');
      this.componentsService.findById(idSearch).subscribe( result => {
        this.listHouse = result;
        this.formGroup.controls.categoryHouseId.setValue(this.listHouse.categoryHouse.id);
        this.formGroup.controls.categoryRoomId.setValue(this.listHouse.categoryRoom.id);
        this.id = Number(idSearch);
        this.idHouseLocal = this.listHouse.idNha;
        console.log(this.idHouseLocal);
        localStorage.setItem('idHouse', this.idHouseLocal);

      });
      this.componentsService.findByDealOfHouse(idSearch).subscribe( result => {
        this.deaslList = result;
        console.log(this.deaslList);
      });
    });
    this.componentsService.listCategoryHouse().subscribe( result => {
      this.categoryHouseList = result;
    });
    this.componentsService.listCategoryRoom().subscribe( result1 => {
      this.categoryRoomList = result1;
    });
  }

}
