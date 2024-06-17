export class CustomerShopping {
  id: string;
  name: string;
  friendName: string;
  product: string;
  value: number;

  constructor(
    id: string,
    name: string,
    friendName: string,
    product: string,
    value: number
  ) {
    this.id = id;
    this.name = name;
    this.friendName = friendName;
    this.product = product;
    this.value = value;
  }
}
