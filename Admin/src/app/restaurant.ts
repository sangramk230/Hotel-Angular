export class Restaurant {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    quantity: number;
    custname: string;
    contact: number;
    time:number;
    status:string;
    tableid:number;
    category:string;
    placeorder:string;
    completestatus:string;
  
    constructor(
      id: number,
      name: string,
      description: string,
      image: string,
      price: number,
      quantity: number,
      custname: string,
      contact: number,
      time:number,
      status:string,
      tableid:number,
      category:string,
      placeorder:string,
      completestatus:string
    ) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.image = image;
      this.price = price;
      this.quantity = quantity;
      this.custname = custname;
      this.contact = contact;
      this.time = time;
      this.status= status;
      this.tableid = tableid;
      this.category = category;
      this.placeorder = placeorder;
      this.completestatus = completestatus;
     }
  }
  