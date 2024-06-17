import { Friend } from "./friend";

export class People {
  name;
  cpf;
  email;
  friends;

  constructor(
    name: string,
    cpf: string,
    email: string,
    friends: Friend[] = []
  ) {
    this.name = name;
    this.cpf = cpf;
    this.email = email;
    this.friends = friends;
  }
}
