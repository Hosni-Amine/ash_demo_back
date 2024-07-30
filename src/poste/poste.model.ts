import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Game } from '../game/game.model'; // Import the Game model

@ObjectType()
@Schema()
export class Poste extends Document {
  @Field()
  @Prop({ required: true })
  title: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  description?: string;

  @Field(() => [Game], { nullable: true })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Game' }], default: [] })
  games?: Game[];

  @Field(() => ID)
  _id: string;
}

export type PosteDocument = Poste & Document;
export const PosteSchema = SchemaFactory.createForClass(Poste);
