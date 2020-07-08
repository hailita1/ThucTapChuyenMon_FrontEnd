import { Component, OnInit } from '@angular/core';
import {ComponentsService} from "../../components.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-show-detail-customer',
  templateUrl: './show-detail-customer.component.html',
  styleUrls: ['./show-detail-customer.component.scss']
})
export class ShowDetailCustomerComponent implements OnInit {

  customerList: any;
  dealsListTrong: any[];
  dealsListTraPhong: any[];
  constructor(private componentsService: ComponentsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      const idSearch = params.get('id');
      this.componentsService.findByIdCustomer(idSearch).subscribe( result => {
        this.customerList = result;
      });
      this.componentsService.findByDealOfIdCustomerTrong(idSearch).subscribe( result => {
        this.dealsListTrong = result;
      });
      this.componentsService.findByDealOfIdCustomerTraPhong(idSearch).subscribe( result => {
        this.dealsListTraPhong = result;
      });
    });
  }

}
