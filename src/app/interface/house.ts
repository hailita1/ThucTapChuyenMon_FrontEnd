import {ICategoryHouse} from './categoryHouse';
import {ICategoryRoom} from './categoryRoom';
import {IHost} from './host';
import {Picture} from './picture';

export interface IHouse {
  idNha?: number;
  tenNha?: string;
  diaChi?: string;
  soLuongPhongNgu?: string;
  soLuongPhongTam?: string;
  moTaChung?: string;
  giaTienTheoDem?: number;
  trangThai?: string;
  categoryHouse?: ICategoryHouse;
  categoryRoom?: ICategoryRoom;
  host?: IHost;
  picture?: Picture[];
}
