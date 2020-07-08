import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ComponentsService} from '../../components.service';
import {ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-show-detail-house',
  templateUrl: './show-detail-house.component.html',
  styleUrls: ['./show-detail-house.component.scss']
})
export class ShowDetailHouseComponent implements OnInit {

  listHouse: any;
  id: number;
  formGroup = new FormGroup({
    hostId: new FormControl(),
    categoryHouseId: new FormControl(),
    categoryRoomId: new FormControl()
  });
  constructor(private componentsService: ComponentsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      const idSearch = params.get('id');
      this.componentsService.findById(idSearch).subscribe( result => {
        this.listHouse = result;
        this.formGroup.controls.hostId.setValue(this.listHouse.host.idChuNha);
        this.formGroup.controls.categoryHouseId.setValue(this.listHouse.categoryHouse.id);
        this.formGroup.controls.categoryRoomId.setValue(this.listHouse.categoryRoom.id);
        this.id = Number(idSearch);
      });
    });
  }


}
