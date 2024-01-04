export interface Ievents {
  isEdit?: boolean;
  id?: number;
  price?: number;
  name?: string;
  src?: string;
  love?: any;
  _id?: any;
  category?: any;
}

export interface Iuser {
  lastname?: string;
  firstname?: string;
  email?: string;
  Username?: string;
  password?: any;
  _id:string;
  love?:any;
  cart:string[];
  favorites:[];
}



export interface IcartItem {
  _id: string;
  count: number;
  id?: number;
  price?: number;
  name?: string;
  src?: string;
}

export interface IdeliveryDetails {
  count: number;
  id?: number;
  price?: number;
  name?: string;
  src?: string;
  // Add other properties if there are any
}

export interface IcombinedData {
  user: Iuser ;
  orders: IcartItem[],
  DeliveryDetails: any,
}

export interface Icategory {
  _id?: string;
  category: string,
  isEdit?: boolean
}
