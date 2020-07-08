import {Component, OnInit} from '@angular/core';
import {ComponentsService} from '../../components.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit {

  id: string;
  listUser: any[];
  // tslint:disable-next-line:max-line-length
  urlTiDa = 'https://scontent.fhan1-1.fna.fbcdn.net/v/t31.0-8/p720x720/13662253_1769718869936369_4466533024091102384_o.jpg?_nc_cat=110&_nc_sid=e007fa&_nc_ohc=moNgJ23OsGcAX-gxM8w&_nc_ht=scontent.fhan1-1.fna&_nc_tp=6&oh=5bb2e2af3057b4e0546460517552838b&oe=5ED780C5';
  // tslint:disable-next-line:max-line-length
  urlHaiLit = 'https://scontent.fhan1-1.fna.fbcdn.net/v/t1.0-9/67941865_2456397517929546_7418600163163242496_n.jpg?_nc_cat=106&_nc_sid=0be424&_nc_ohc=92G7O64X4swAX_0DC-S&_nc_ht=scontent.fhan1-1.fna&oh=b91772451e6881c9b06e557367c1f685&oe=5ED58B00';
  // tslint:disable-next-line:max-line-length
  urlHuyVy = 'https://scontent.fhan1-1.fna.fbcdn.net/v/t1.0-9/31564008_832748793600001_6120938227176413335_n.jpg?_nc_cat=100&_nc_sid=110474&_nc_ohc=w8C5PTESHkkAX953bRO&_nc_ht=scontent.fhan1-1.fna&oh=60f7a67f739afd8085d59c00496fa932&oe=5ED7889B';

  constructor(private componentsService: ComponentsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idChuNha = params.get('id');
      this.id = idChuNha;
      localStorage.setItem('id', this.id);
    });
  }

}
