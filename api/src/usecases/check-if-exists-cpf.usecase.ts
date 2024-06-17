import { SqlServer } from "../databases/sqlserver";

export const CheckIfExistsCpfUseCase = {
  async execute(cpf: string): Promise<boolean> {
    const result = await SqlServer.query(`
      SELECT * FROM Customers WHERE cpf = '${cpf}'
    `);

    return result.recordset.length > 0;
  },
};
