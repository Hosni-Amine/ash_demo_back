import {Field, ID, ObjectType} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Poste } from '../poste/poste.model'; // Import the Poste model

@ObjectType()
@Schema()
export class Game extends Document {
  @Field()
  @Prop({ required: true })
  startDate: Date;

  @Field()
  @Prop({ required: true })
  endDate: Date;

  @Field()
  @Prop({ required: true })
  price: number;

  @Field()
  @Prop({ required: true })
  usernumber: number;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field(() => ID)
  _id: string;

  @Field(() => Poste, { nullable: true })
  @Prop({ type: Types.ObjectId, ref: 'Poste' })  // Reference by exact model name as a string
  poste?: Poste;
}

export type GameDocument = Game & Document;
export const GameSchema = SchemaFactory.createForClass(Game);
