import sql from "mssql";

const config = {
  user: "sa",
  password: "12345678",
  database: "Marketplace",
  server: "localhost/SQLEXPRESS",
  options: {
    trustServerCertificate: true,
  },
};

async function startup() {
  const createCustomerTable = `
    IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Customers]') AND type in (N'U'))
    BEGIN 
      CREATE TABLE Customers (
        id UNIQUEIDENTIFIER PRIMARY KEY,
        cpf VARCHAR(11),
        name NVARCHAR(100),
        email NVARCHAR(100),
        street NVARCHAR(255),
        city NVARCHAR(100),
        state CHAR(2)
      );
    END
  `;
  const createShoppingTable = `
    IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Shopping]') AND type in (N'U'))
    BEGIN  
      CREATE TABLE Shopping (
        id UNIQUEIDENTIFIER PRIMARY KEY,
        product NVARCHAR(100) NOT NULL,
        value MONEY NOT NULL,
        date DATETIME DEFAULT GETDATE(),
        id_customer UNIQUEIDENTIFIER NOT NULL,
        CONSTRAINT FK_Shopping_Customers FOREIGN KEY (id_customer) REFERENCES Customers(id)
      );
    END
  `;

  await sql.query(createCustomerTable);
  await sql.query(createShoppingTable);
}

export const SqlServer = {
  async connect() {
    console.log("Connecting to SQL Server");
    await sql.connect(config);
    console.log("Connected to SQL Server");

    await startup();
    console.log("Database initialized");
  },

  async query(query: string) {
    return await sql.query(query);
  },
};
