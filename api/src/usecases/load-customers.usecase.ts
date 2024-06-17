import { SqlServer } from "../databases/sqlserver";
import { Customer } from "../entities/customer";

export const LoadCustomersUseCase = {
  async execute(): Promise<Customer[]> {
    const customers = await SqlServer.query(`
      SELECT * FROM Customers
    `);

    return customers.recordset;
  },
};
