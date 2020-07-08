import {IHouse} from './house';
import {ICustomer} from './customer';

export interface IDeal {
  idGiaoDich?: number;
  ngayDen?: string;
  ngayDi?: string;
  danhGia?: number;
  trangThai?: string;
  thanhTien?: number;
  phanHoi?: string;
  house?: IHouse;
  customer?: ICustomer;
}
