import * as crypto from "crypto";

export class Shopping {
  id: string;
  product: string;
  value: number;
  idCustomer: string;

  constructor(product: string, value: number, idCustomer: string) {
    this.id = crypto.randomUUID();
    this.product = product;
    this.value = value;
    this.idCustomer = idCustomer;
  }

  static fromObject(
    id: string,
    product: string,
    value: number,
    idCustomer: string
  ): Shopping {
    return {
      id,
      product,
      value,
      idCustomer,
    } as Shopping;
  }
}
