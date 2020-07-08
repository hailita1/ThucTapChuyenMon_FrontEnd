import {Component, OnInit} from '@angular/core';
import {IHost} from '../../../interface/host';
import {FormControl, FormGroup} from '@angular/forms';
import {ComponentsService} from '../../components.service';
import {ICustomer} from '../../../interface/customer';
import {AngularFireDatabase} from '@angular/fire/database';
import {ActivatedRoute} from '@angular/router';
import {Picture} from '../../../interface/picture';
import * as firebase from 'firebase';

declare const myTest: any;

@Component({
  selector: 'app-signup-homepage',
  templateUrl: './signup-homepage.component.html',
  styleUrls: ['./signup-homepage.component.scss']
})
export class SignupHomepageComponent implements OnInit {
  myItems: File[] = [];
  customer: ICustomer = {
    userName: '',
    password: '',
    ho: '',
    ten: '',
    cmnd: 0,
    diaChi: '',
    sdt: 0,
    avt: ''
  };
  formGroup = new FormGroup({
    userName: new FormControl(),
    password: new FormControl(),
    ho: new FormControl(),
    ten: new FormControl(),
    cmnd: new FormControl(),
    diaChi: new FormControl(),
    sdt: new FormControl(),
    avt: new FormControl()
  });
  arrayPicture: any;
  message = '';
  isShow = false;
  isSuccess = true;
  isLoading = false;
  isDone = false;

  constructor(private componentsService: ComponentsService, private db: AngularFireDatabase, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  save() {
    this.isLoading = true;
    this.customer.userName = this.formGroup.get('userName').value;
    this.customer.password = this.formGroup.get('password').value;
    this.customer.ho = this.formGroup.get('ho').value;
    this.customer.ten = this.formGroup.get('ten').value;
    this.customer.cmnd = this.formGroup.get('cmnd').value;
    this.customer.diaChi = this.formGroup.get('diaChi').value;
    this.customer.sdt = this.formGroup.get('sdt').value;
    this.customer.avt = this.arrayPicture.avt;
    console.log(this.customer);
    if (this.isDone === true) {
      this.componentsService.addCustomer(this.customer).subscribe(result => {
        this.isShow = true;
        this.isSuccess = true;
        this.message = 'Đăng kí thành công!';
        this.formGroup.reset();
      }, error => {
        this.isShow = true;
        this.isSuccess = false;
        this.message = 'Đăng kí thất bại!';
        this.isLoading = false;
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
        for (let i = 0; i < url.length; i++) {
          this.arrayPicture = url[0];
        }
        this.isDone = true;
        this.isLoading = false;
      })
      .catch((error) => {
        console.log(`Some failed: `, error.message);
        this.isLoading = false;
        this.isDone = false;
      });
  }

  putStorageItem(file): Promise<ICustomer> {
    // the return value will be a Promise
    const metadata = {
      contentType: 'image/jpeg',
    };
    console.log(file);
    return new Promise<ICustomer>((resolve, reject) => {
      firebase.storage().ref('img/' + Date.now()).put(file, metadata)
        .then(snapshot => {
          snapshot.ref.getDownloadURL().then(downloadURL => {
            const avt1 = {avt: downloadURL};
            resolve(avt1);
          });
        })
        .catch(error => reject(error));
    });
  }

  onClick() {
    myTest();
  }
}
