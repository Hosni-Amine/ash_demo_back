import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePosteInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;
}
