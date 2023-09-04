export interface events {
  id?: number;
  price?: number;
  name?: string;
  src?: string;
  love?: any;
  _id?: any;
  category: any;
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



// export interface USER1 {
//   id: number,
//   name: string,
//   power: string,
//   alterEgo?: string
// }

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
