import { SqlServer } from "../databases/sqlserver";
import { Shopping } from "../entities/shopping";

export const LoadShoppingsUseCase = {
  async execute(): Promise<Shopping[]> {
    const shoppings = await SqlServer.query(`
      SELECT * FROM Shopping
    `);

    return shoppings.recordset.map((shopping) =>
      Shopping.fromObject(
        shopping.id,
        shopping.product,
        shopping.value,
        shopping.id_customer
      )
    );
  },
};
