import * as crypto from "crypto";

export class Customer {
  id: string;
  name: string;
  cpf: string;
  email: string;
  street: string;
  city: string;
  state: string;

  constructor(
    name: string,
    cpf: string,
    email: string,
    street: string,
    city: string,
    state: string
  ) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.cpf = cpf;
    this.email = email;
    this.street = street;
    this.city = city;
    this.state = state;
  }
}
