import { SqlServer } from "../databases/sqlserver";
import { Customer } from "../entities/customer";

export const CreateCustomerUseCase = {
  async execute(customer: Customer): Promise<Customer> {
    const result = await SqlServer.query(`
      INSERT INTO Customers (id, cpf, name, email, street, city, state) OUTPUT INSERTED.*
      VALUES ('${customer.id}', '${customer.cpf}', '${customer.name}', '${customer.email}', '${customer.street}', '${customer.city}', '${customer.state}')
    `);

    return result.recordset[0];
  },
};
