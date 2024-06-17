import { People } from "../entities/people";
import { People as PeopleModel } from "../models/people";

export const CreatePeopleUseCase = {
  async execute(people: People): Promise<People> {
    const entity = await PeopleModel.create(people);

    return entity.toJSON();
  },
};
