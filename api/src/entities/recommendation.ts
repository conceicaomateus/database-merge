export class Recommendation {
  id: string;
  name: string;
  friendName: string;
  products: string[];
  values: number[];

  constructor(
    id: string,
    name: string,
    friendName: string,
    shoppings: { product: string; value: number }[]
  ) {
    this.id = id;
    this.name = name;
    this.friendName = friendName;

    this.products = shoppings.map((s) => s.product);
    this.values = shoppings.map((s) => s.value);
  }
}
