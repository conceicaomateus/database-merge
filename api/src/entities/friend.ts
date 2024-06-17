export class Friend {
  _id!: string;
  name: string;
  cpf: string;
  email: string;

  constructor(name: string, cpf: string, email: string) {
    this.name = name;
    this.cpf = cpf;
    this.email = email;
  }
}
