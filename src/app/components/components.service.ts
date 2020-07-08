import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IHouse} from '../interface/house';
import {IHost} from '../interface/host';
import {ICustomer} from '../interface/customer';
import {IDeal} from '../interface/deal';

@Injectable()
export class ComponentsService {

  urlApi = 'http://localhost:5000/api/houses/';

  constructor(private httpClient: HttpClient) {
  }

  public listHouse(): Observable<any> {
    return this.httpClient.get(this.urlApi);
  }

  public listCategoryHouse(): Observable<any> {
    return this.httpClient.get('http://localhost:5000/api/categoryHouses/');
  }

  public listAllHouse(): Observable<any> {
    return this.httpClient.get('http://localhost:5000/api/housesss/');
  }

  public listCategoryRoom(): Observable<any> {
    return this.httpClient.get('http://localhost:5000/api/categoryRooms/');
  }

  public findById(id): Observable<any> {
    return this.httpClient.get(this.urlApi + id);
  }


  public addHouse(house: IHouse): Observable<any> {
    return this.httpClient.post<any>(this.urlApi, house);
  }

  public editHouse(house: IHouse): Observable<any> {
    return this.httpClient.put<any>(this.urlApi + house.idNha, house);
  }

  public deleteHouse(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.urlApi + id);
  }

  public listUser(): Observable<any> {
    return this.httpClient.get('http://localhost:5000/api/hosts/');
  }

  public addUser(host: IHost): Observable<any> {
    return this.httpClient.post('http://localhost:5000/api/hosts/', host);
  }

  public findByIdChuNha(id: string): Observable<any> {
    return this.httpClient.get('http://localhost:5000/api/findAllByHost?host=' + id);
  }

  public findByIdCustomer(id: string): Observable<any> {
    return this.httpClient.get('http://localhost:5000/api/customers/' + id);
  }

  public findByDealOfIdCustomerTrong(id: string): Observable<any> {
    return this.httpClient.get('http://localhost:5000/api/findByIdCustomer?customer=' + id);
  }

  public findByDealOfIdCustomerTraPhong(id: string): Observable<any> {
    return this.httpClient.get('http://localhost:5000/api/findByIdCustomerDeal?customer=' + id);
  }

  public findByIdDeals(id: string): Observable<any> {
    return this.httpClient.get('http://localhost:5000/api/deals/' + id);
  }

  public findByIdHost(id: string): Observable<any> {
    return this.httpClient.get('http://localhost:5000/api/hosts/' + id);
  }

  public editUser(host: IHost): Observable<any> {
    return this.httpClient.put<any>('http://localhost:5000/api/hosts/' + host.idChuNha, host);
  }

  public addCustomer(customer: ICustomer): Observable<any> {
    return this.httpClient.post('http://localhost:5000/api/customers/', customer);
  }

  public editCustomer(customer: ICustomer): Observable<any> {
    return this.httpClient.put('http://localhost:5000/api/customers/' + customer.idCustomer, customer);
  }

  public getListCustomer(): Observable<any> {
    return this.httpClient.get('http://localhost:5000/api/customers/');
  }

  public getCheck(): Observable<any> {
    return this.httpClient.get('http://localhost:5000/api/checks/');
  }

  public findByIdCheck(id: number): Observable<any> {
    return this.httpClient.get('http://localhost:5000/api/checks/' + id);
  }

  public updateCheck(id: number, checkLogin: boolean): Observable<any> {
    const check = {
      id,
      checkLogin
    };
    return this.httpClient.put('http://localhost:5000/api/checks/' + id, check);
  }

  public addDeals(deals: IDeal): Observable<any> {
    return this.httpClient.post('http://localhost:5000/api/deals/', deals);
  }

  public updateDeals(deals: IDeal): Observable<any> {
    return this.httpClient.put('http://localhost:5000/api/deals/' + deals.idGiaoDich, deals);
  }

  public findByDealOfHouse(id: string): Observable<any> {
    return this.httpClient.get('http://localhost:5000/api/findByIdHouse?house=' + id);
  }

  public findByHouseOfDaThue(id: string): Observable<any> {
    return this.httpClient.get('http://localhost:5000/api/housess?house=' + id);
  }

  public editHouseByTrangThai(id: number, trangThai: string): Observable<any> {
    const house = {
      id,
      trangThai
    };
    return this.httpClient.put('http://localhost:5000/api/housesss/' + id, house);
  }

  public deleteDeal(id: number): Observable<any> {
    return this.httpClient.delete<any>('http://localhost:5000/api/deals/' + id);
  }

  public search1(diaChi: string, slpn: string, slpt: string, dauDuoi: string, dauTren: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get('http://localhost:5000/api/searchs1?diaChi=' + diaChi + '&slpn=' + slpn + '&slpt=' + slpt + '&dauDuoi=' + dauDuoi + '&dauTren=' + dauTren);
  }

  public search2(slpn: string, diaChi: string, slpt: string, dauDuoi: string, dauTren: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get('http://localhost:5000/api/searchs2?slpn=' + slpn + '&diaChi=' + diaChi + '&slpt=' + slpt + '&dauDuoi=' + dauDuoi + '&dauTren=' + dauTren);
  }

  public search3(slpt: string, diaChi: string, slpn: string, dauDuoi: string, dauTren: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get('http://localhost:5000/api/searchs3?slpt=' + slpt + '&diaChi=' + diaChi + '&slpn=' + slpn + '&dauDuoi=' + dauDuoi + '&dauTren=' + dauTren);
  }

  public search4(dauTren: string, dauDuoi: string, diaChi: string, slpn: string, slpt: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get('http://localhost:5000/api/searchs4?dauDuoi=' + dauDuoi + '&dauTren=' + dauTren + '&diaChi=' + diaChi + '&slpn=' + slpn + '&slpt=' + slpt);
  }

  public search5(diaChi: string, slpn: string, slpt: string, dauDuoi: string, dauTren: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get('http://localhost:5000/api/searchs5?diaChi=' + diaChi + '&slpt=' + slpt + '&slpn=' + slpn + '&dauDuoi=' + dauDuoi + '&dauTren=' + dauTren);
  }

  public search6(diaChi: string, slpn: string, slpt: string, dauDuoi: string, dauTren: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get('http://localhost:5000/api/searchs6?diaChi=' + diaChi + '&slpn=' + slpn + '&slpt=' + slpt + '&dauDuoi=' + dauDuoi + '&dauTren=' + dauTren);
  }

  public search7(diaChi: string, slpn: string, slpt: string, dauDuoi: string, dauTren: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get('http://localhost:5000/api/searchs7?diaChi=' + diaChi + '&dauDuoi=' + dauDuoi + '&dauTren=' + dauTren + '&slpn=' + slpn + '&slpt=' + slpt);
  }

  public search8(diaChi: string, slpn: string, slpt: string, dauDuoi: string, dauTren: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get('http://localhost:5000/api/searchs8?slpt=' + slpt + '&slpn=' + slpn + '&diaChi=' + diaChi + '&dauDuoi=' + dauDuoi + '&dauTren=' + dauTren);
  }

  public search9(diaChi: string, slpn: string, slpt: string, dauDuoi: string, dauTren: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get('http://localhost:5000/api/searchs9?slpt=' + slpt + '&dauDuoi=' + dauDuoi + '&dauTren=' + dauTren + '&diaChi=' + diaChi + '&slpn=' + slpn);
  }

  public search10(diaChi: string, slpn: string, slpt: string, dauDuoi: string, dauTren: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get('http://localhost:5000/api/searchs10?slpn=' + slpn + '&dauDuoi=' + dauDuoi + '&dauTren=' + dauTren + '&diaChi=' + diaChi + '&slpt=' + slpt);
  }

  public search11(diaChi: string, slpn: string, slpt: string, dauDuoi: string, dauTren: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get('http://localhost:5000/api/searchs11?diaChi=' + diaChi + '&slpn=' + slpn + '&slpt=' + slpt + '&dauDuoi=' + dauDuoi + '&dauTren=' + dauTren);
  }

  public search12(diaChi: string, slpn: string, slpt: string, dauDuoi: string, dauTren: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get('http://localhost:5000/api/searchs12?diaChi=' + diaChi + '&slpt=' + slpt + '&dauDuoi=' + dauDuoi + '&dauTren=' + dauTren + '&slpn=' + slpn);
  }

  public search13(diaChi: string, slpn: string, slpt: string, dauDuoi: string, dauTren: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get('http://localhost:5000/api/searchs13?diaChi=' + diaChi + '&slpn=' + slpn + '&dauDuoi=' + dauDuoi + '&dauTren=' + dauTren + '&slpt=' + slpt);
  }

  public search14(diaChi: string, slpn: string, slpt: string, dauDuoi: string, dauTren: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get('http://localhost:5000/api/searchs14?slpn=' + slpn + '&slpt=' + slpt + '&dauDuoi=' + dauDuoi + '&dauTren=' + dauTren + '&diaChi=' + diaChi);
  }

  public search15(diaChi: string, slpn: string, slpt: string, dauDuoi: string, dauTren: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get('http://localhost:5000/api/searchs15?diaChi=' + diaChi + '&slpn=' + slpn + '&slpt=' + slpt + '&dauDuoi=' + dauDuoi + '&dauTren=' + dauTren);
  }

  public Image(id: number): Observable<any> {
    return this.httpClient.get('http://localhost:5000/api/findAllByHouse?house=' + id);
  }
}

