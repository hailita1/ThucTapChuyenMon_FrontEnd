import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {ComponentsService} from '../../components.service';
import {AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase';
import {ActivatedRoute} from '@angular/router';
import {IHouse} from '../../../interface/house';
import {Picture} from '../../../interface/picture';

declare const myTest: any;

@Component({
  selector: 'app-add-house',
  templateUrl: './add-house.component.html',
  styleUrls: ['./add-house.component.scss']
})
export class AddHouseComponent implements OnInit {


  myItems: File[] = [];
  categoryHouseList: any[];
  categoryRoomList: any[];
  idHost: string;
  hostList: any;
  house: IHouse = {
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
  formGroup = new FormGroup({
    tenNha: new FormControl(),
    diaChi: new FormControl(),
    soLuongPhongNgu: new FormControl(),
    soLuongPhongTam: new FormControl(),
    moTaChung: new FormControl(),
    giaTienTheoDem: new FormControl(),
    trangThai: new FormControl(),
    categoryHouse: new FormGroup({
        id: new FormControl(),
      }
    ),
    categoryRoom: new FormGroup({
        id: new FormControl(),
      }
    ),
    // host: new FormGroup({
    //   idChuNha: new FormControl(),
    // }),
    picture: new FormArray([
      new FormGroup({
        tenAnh: new FormControl(),
      })
    ])
  });
  arrayPicture: Picture[] = [];
  message = '';
  isShow = false;
  isSuccess = true;
  isLoading = false;
  isDone = false;

  constructor(private componentsService: ComponentsService, private db: AngularFireDatabase, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idChuNha = params.get('id');
      this.idHost = idChuNha;
      console.log(this.idHost);
      this.componentsService.findByIdHost(idChuNha).subscribe(result2 => {
        this.house.host = result2;
      });
    });
    this.componentsService.listCategoryHouse().subscribe(result => {
      this.categoryHouseList = result;
    });
    this.componentsService.listCategoryRoom().subscribe(result1 => {
      this.categoryRoomList = result1;
    });
  }

  save() {
    this.house.tenNha = this.formGroup.get('tenNha').value;
    this.house.diaChi = this.formGroup.get('diaChi').value;
    this.house.soLuongPhongNgu = this.formGroup.get('soLuongPhongNgu').value;
    this.house.soLuongPhongTam = this.formGroup.get('soLuongPhongTam').value;
    this.house.moTaChung = this.formGroup.get('moTaChung').value;
    this.house.giaTienTheoDem = this.formGroup.get('giaTienTheoDem').value;
    this.house.trangThai = this.formGroup.get('trangThai').value;
    // this.house.host =  this.formGroup.get('host').value;
    this.house.categoryHouse = this.formGroup.get('categoryHouse').value;
    this.house.categoryRoom = this.formGroup.get('categoryRoom').value;
    this.house.picture = this.arrayPicture;
    console.log(this.house);
    if (this.isDone === true) {
      this.componentsService.addHouse(this.house).subscribe(result => {
        this.isShow = true;
        this.isSuccess = true;
        this.message = 'Thêm thành công!';
        this.formGroup.reset();
      }, error => {
        this.isShow = true;
        this.isSuccess = false;
        this.message = 'Thêm thất bại!';
        this.formGroup.reset();
      });
    }
  }

  uploadFile(event) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.myItems.push(files[i]);
    }
    this.uploadAll();
  }

  uploadAll() {
    this.isLoading = true;
    Promise.all(
      this.myItems.map(file => this.putStorageItem(file))
    )
      .then((url) => {
        console.log(`All success`, url);
        this.arrayPicture = url;
        this.isDone = true;
        this.isLoading = false;
      })
      .catch((error) => {
        console.log(`Some failed: `, error.message);
        this.isLoading = false;
        this.isDone = false;
      });
  }

  putStorageItem(file): Promise<Picture> {
    // the return value will be a Promise
    const metadata = {
      contentType: 'image/jpeg',
    };
    console.log(file);
    return new Promise<Picture>((resolve, reject) => {
      firebase.storage().ref('img/' + Date.now()).put(file, metadata)
        .then(snapshot => {
          snapshot.ref.getDownloadURL().then(downloadURL => {
            const picture = {tenAnh: downloadURL};
            resolve(picture);
          });
        })
        .catch(error => reject(error));
    });
  }

  onClick() {
    myTest();
  }
}
