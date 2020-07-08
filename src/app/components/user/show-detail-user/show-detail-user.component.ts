import { Component, OnInit } from '@angular/core';
import {ComponentsService} from '../../components.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-show-detail-user',
  templateUrl: './show-detail-user.component.html',
  styleUrls: ['./show-detail-user.component.scss']
})
export class ShowDetailUserComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  urlHaiLit = 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.15752-9/91350837_211883533382731_506886620025192448_n.jpg?_nc_cat=104&_nc_sid=b96e70&_nc_ohc=obZFoZXgT9UAX8Z1mDx&_nc_ht=scontent-sin6-1.xx&oh=c65a4f956a3f7853e9d8739241b333bd&oe=5EA4D9CC';

  id: string;
  listUser: any;
  constructor(private componentsService: ComponentsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      const idChuNha = params.get('id');
      this.id = idChuNha;
      this.componentsService.findByIdHost(idChuNha).subscribe( result => {
        this.listUser = result;
        // console.log(this.listUser);
      });
    });
  }

}
