import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdatePosteInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;
}
