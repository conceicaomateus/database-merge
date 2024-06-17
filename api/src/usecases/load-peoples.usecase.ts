import { People } from "../entities/people";
import { People as PeopleModel } from "../models/people";

export const LoadPeoplesUseCase = {
  async execute(): Promise<People[]> {
    const peoples = await PeopleModel.find();

    return peoples.map((people) => people.toJSON());
  },
};
