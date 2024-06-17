import { Redis } from "../databases/redis";
import { CustomerShopping } from "../entities/customer-shopping";
import { Customer } from "../entities/customer";
import { People } from "../entities/people";
import { Shopping } from "../entities/shopping";

export const ReplicateDataOnRedisUseCase = {
  async execute(
    customers: Customer[],
    peoples: People[],
    shoppings: Shopping[]
  ) {
    Redis.deleteAll();

    customers.forEach((customer) => {
      const people = peoples.find((people) => people.cpf === customer.cpf);
      people?.friends.map((friend) => {
        shoppings
          .filter((shopping) => shopping.idCustomer === customer.id)
          .map(async (shopping) => {
            const customerShopping = new CustomerShopping(
              customer.id,
              customer.name,
              friend.name,
              shopping.product,
              shopping.value
            );

            const dataString = JSON.stringify(customerShopping);
            await Redis.set(`customer_${customer.id}`, dataString);
          });
      });
    });
  },
};
