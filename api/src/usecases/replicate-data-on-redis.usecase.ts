import { Redis } from "../databases/redis";
import { Recommendation } from "../entities/recommendation";
import { LoadCustomersUseCase } from "./load-customers.usecase";
import { LoadShoppingsUseCase } from "./load-shoppings.usecase";
import { LoadPeoplesUseCase } from "./load-peoples.usecase";

export const ReplicateDataOnRedisUseCase = {
  async execute() {
    const customers = await LoadCustomersUseCase.execute();
    const shoppings = await LoadShoppingsUseCase.execute();
    const peoples = await LoadPeoplesUseCase.execute();

    Redis.deleteAll();

    customers.forEach((customer) => {
      const people = peoples.find((people) => people.cpf === customer.cpf);

      console.log(people?.friends);

      const customerShoppings = shoppings.filter(
        (shopping) => shopping.idCustomer === customer.id
      );

      people?.friends.map(async (friend) => {
        const recommendation = new Recommendation(
          customer.id,
          customer.name,
          friend.name,
          customerShoppings
        );

        const dataString = JSON.stringify(recommendation);
        await Redis.set(`${customer.id}_${friend._id}`, dataString);
      });
    });
  },
};
