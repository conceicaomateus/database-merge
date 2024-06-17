export type CreateDto = {
  name: string;
  cpf: string;
  email: string;
  street: string;
  city: string;
  state: string;
  friends: {
    name: string;
    cpf: string;
    email: string;
  }[];
  shoppings: {
    product: string;
    value: number;
  }[];
};
