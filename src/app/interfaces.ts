export interface events {
  id?: number;
  price: number;
  name?: string;
  src?: string;
  love?: any;
  _id?: any;
}

export interface USER {
  firstname?: string;
  Family?: string;
  email?: string;
  Username?: string;
  password?: any;
  _id?:string;
  love:any;

}



export interface USER1 {
  id: number,
  name: string,
  power: string,
  alterEgo?: string
}

export interface CartItem {
  _id: string;
  count: number;
  // Add other properties if there are any
}
