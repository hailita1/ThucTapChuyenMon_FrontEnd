import { Component, OnInit } from '@angular/core';
import {ComponentsService} from "../../components.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-history-house',
  templateUrl: './history-house.component.html',
  styleUrls: ['./history-house.component.scss']
})
export class HistoryHouseComponent implements OnInit {

  dealsList: any[];
  constructor(private componentsService: ComponentsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      const idSearch = params.get('id');
      this.componentsService.findByDealOfHouse(idSearch).subscribe( result => {
        this.dealsList = result;
      });
    });
  }

}
