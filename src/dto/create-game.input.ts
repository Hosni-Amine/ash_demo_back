import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateGameInput {
  @Field()
  @IsDateString()
  startDate: Date;

  @Field()
  @IsDateString()
  endDate: Date;

  @Field()
  @IsNumber()
  price: number;

  @Field()
  @IsNumber()
  usernumber: number;

  @Field()
  @IsString()
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  posteId?: string; // Optional field to associate the game with a Poste
}
