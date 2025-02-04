// src/user/dto/update-user.input.ts
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(type => Int)
  id: number;

  @Field()
  name?: string;

  @Field()
  email?: string;
}
