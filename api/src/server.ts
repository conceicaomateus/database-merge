import { CreatePeopleUseCase } from "./usecases/create-people.usecase";
import { CreateCustomerUseCase } from "./usecases/create-customer.usecase";
import { CreateShoppingUseCase } from "./usecases/create-shopping.usecase";
import { ReplicateDataOnRedisUseCase } from "./usecases/replicate-data-on-redis.usecase";
import { CheckIfExistsCpfUseCase } from "./usecases/check-if-exists-cpf.usecase";

import { Mongo } from "./databases/mongo";
import { Redis } from "./databases/redis";
import { SqlServer } from "./databases/sqlserver";

import { Customer } from "./entities/customer";
import { Friend } from "./entities/friend";
import { People } from "./entities/people";
import { Shopping } from "./entities/shopping";
import { CreateDto } from "./dtos/create.dto";
import { Recommendation } from "./entities/recommendation";

import express, { Request, Response } from "express";
import cors from "cors";

const port = 3000;
const app = express();
app.use(express.json());
app.use(cors());

Mongo.connect();
SqlServer.connect();
Redis.connect();

app.post("/create", async (req: Request<{}, {}, CreateDto>, res: Response) => {
  const { name, cpf, email, street, city, state, friends, shoppings } =
    req.body;

  if (await CheckIfExistsCpfUseCase.execute(cpf)) {
    res.status(400).send({ message: "Cpf already exists" });
    return;
  }

  const newFriends = friends.map(
    (friend) => new Friend(friend.name, friend.cpf, friend.email)
  );
  const newPeople = new People(name, cpf, email, newFriends);
  const newCustomer = new Customer(name, cpf, email, street, city, state);
  const newShoppings = shoppings.map(
    (shopping) => new Shopping(shopping.product, shopping.value, newCustomer.id)
  );

  await CreatePeopleUseCase.execute(newPeople);
  await CreateCustomerUseCase.execute(newCustomer);
  newShoppings.map(
    async (shopping) => await CreateShoppingUseCase.execute(shopping)
  );

  res.send({ message: "Data created", data: { customer_id: newCustomer.id } });
});

app.get("/recommendations", async (_, res: Response) => {
  await ReplicateDataOnRedisUseCase.execute();

  const recommendations = await Redis.getAll<Recommendation>();

  res.send({ data: { total: recommendations.length, items: recommendations } });
});

app.listen(port, () =>
  console.log(`Api listening at http://localhost:${port}`)
);
