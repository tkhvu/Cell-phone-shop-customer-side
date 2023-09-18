export interface events {
  isEdit?: boolean;
  id?: number;
  price?: number;
  name?: string;
  src?: string;
  love?: any;
  _id?: any;
  category?: any;
}

export interface USER {
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



export interface CartItem {
  _id: string;
  count: number;
  id?: number;
  price?: number;
  name?: string;
  src?: string;
  // Add other properties if there are any
}

export interface DeliveryDetails {
  count: number;
  id?: number;
  price?: number;
  name?: string;
  src?: string;
  // Add other properties if there are any
}

export interface combinedData {
  user: USER[] ;
  orders: CartItem[],
  DeliveryDetails: any
}

export interface Category {
  _id?: string;
  category: string,
  isEdit?: boolean
}
