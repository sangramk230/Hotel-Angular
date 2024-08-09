export class Admin {
    id: number;
    image: string;
    name: string;
    contact: number;
    email: string;
    password: string;
  
    constructor(
      id: number,
      image: string,
      name: string,
      contact: number,
      email: string,
      password: string
    ) {
      this.id = id;
      this.image = image;
      this.name = name;
      this.contact = contact;
      this.email = email;
      this.password = password;
    }
  }
  