import { SqlServer } from "../databases/sqlserver";
import { Shopping } from "../entities/shopping";

export const CreateShoppingUseCase = {
  async execute(shopping: Shopping): Promise<Shopping> {
    const result = await SqlServer.query(`
      INSERT INTO Shopping (id, product, value, id_customer) OUTPUT INSERTED.*
      VALUES ('${shopping.id}', '${shopping.product}', ${shopping.value}, '${shopping.idCustomer}')
    `);

    return result.recordset[0];
  },
};
