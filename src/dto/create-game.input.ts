import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGameInput {
  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field()
  price: number;

  @Field()
  usernumber: number;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  posteId?: string; // Optional field to associate the game with a Poste
}
