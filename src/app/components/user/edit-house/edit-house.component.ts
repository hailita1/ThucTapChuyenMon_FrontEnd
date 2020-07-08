import {Component, OnInit} from '@angular/core';
import {ComponentsService} from '../../components.service';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase';
import {AngularFireDatabase} from '@angular/fire/database';
import {Picture} from '../../../interface/picture';
import {IHouse} from '../../../interface/house';

declare const myTest: any;

@Component({
  selector: 'app-edit-house',
  templateUrl: './edit-house.component.html',
  styleUrls: ['./edit-house.component.scss']
})
export class EditHouseComponent implements OnInit {
  myItems: File[] = [];
  isDone = false;
  picture: Picture[];
  picture2: Picture[];
  listUser: any[];
  arrayPicture: Picture[] = [];
  categoryHouseList: any[];
  categoryRoomList: any[];
  message = '';
  isShow = false;
  isSuccess = true;
  isLoading = false;
  idTest: number;
  house: IHouse = {
    idNha: 0,
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
        name: new FormControl()
      }
    ),
    categoryRoom: new FormGroup({
        id: new FormControl(),
        name: new FormControl()
      }
    ),
    user: new FormGroup({
      id: new FormControl(),
      userName: new FormControl(),
      password: new FormControl(),
      hoTen: new FormControl(),
      diaChi: new FormControl(),
      sdt: new FormControl()
    }),
    picture: new FormArray([])
  });

  get pictureList(): FormArray {
    return this.formGroup.get('picture') as FormArray;
  }

  addPicture() {
    this.pictureList.push(new FormGroup({
      idAnh: new FormControl(),
      tenAnh: new FormControl(),
    }));
  }

  removePicture(index: number) {
    this.pictureList.removeAt(index);
  }

  constructor(private componentsService: ComponentsService, private route: ActivatedRoute, private db: AngularFireDatabase) {
  }

  ngOnInit(): void {
    this.componentsService.listUser().subscribe(result2 => {
      this.listUser = result2;
    });
    this.componentsService.listCategoryHouse().subscribe(result => {
      this.categoryHouseList = result;
    });
    this.componentsService.listCategoryRoom().subscribe(result1 => {
      this.categoryRoomList = result1;
    });
    this.route.paramMap.subscribe(params => {
      const idSearch = params.get('id');
      this.componentsService.findById(idSearch).subscribe(houses => {
        this.house = houses;
        this.formGroup.controls.tenNha.setValue(this.house.tenNha);
        this.formGroup.controls.diaChi.setValue(this.house.diaChi);
        this.formGroup.controls.soLuongPhongNgu.setValue(this.house.soLuongPhongNgu);
        this.formGroup.controls.soLuongPhongTam.setValue(this.house.soLuongPhongTam);
        this.formGroup.controls.moTaChung.setValue(this.house.moTaChung);
        this.formGroup.controls.giaTienTheoDem.setValue(this.house.giaTienTheoDem);
        this.formGroup.controls.trangThai.setValue(this.house.trangThai);
        this.formGroup.controls.categoryHouse.setValue(this.house.categoryHouse);
        this.formGroup.controls.categoryRoom.setValue(this.house.categoryRoom);
        for (let i = 0; i < this.house.picture.length; i++) {
          this.addPicture();
        }
        this.formGroup.controls.picture.setValue(this.house.picture);
      });
      this.idTest = Number(idSearch);
      this.image();
    });
  }

  image() {
    this.componentsService.Image(this.idTest).subscribe(result2 => {
      this.picture2 = result2;
    });
  }

  edit() {
    this.house.idNha = this.idTest;
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
    this.componentsService.editHouse(this.house).subscribe(result => {
      this.image();
      this.isShow = true;
      this.isSuccess = true;
      this.message = 'Sửa thành công!';
      this.formGroup.reset();
    }, error => {
      this.isShow = true;
      this.isSuccess = false;
      this.message = 'Sửa thất bại!';
      this.formGroup.reset();
    });
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
        let puctureAdd: Picture;
        for (let i = 0; i < url.length; i++) {
          puctureAdd = {idAnh: null, tenAnh: url[i].tenAnh};
          this.arrayPicture.push(puctureAdd);
        }
        console.log(this.arrayPicture);
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

  pushDeleteImage(index: number) {
    let picture1: Picture[];
    picture1 = this.picture2.splice(index, 1);
    for (let i = 0; i < picture1.length; i++) {
      this.arrayPicture.push(picture1[i]);
    }
    console.log(this.arrayPicture);
  }

  onClick() {
    myTest();
  }
}





