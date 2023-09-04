import { Expose } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model, ResolveTimestamps } from 'mongoose';

@Schema()
@ObjectType()
export class User {
  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }

  @Prop({ unique: true })
  @Expose()
  @Field()
  username: string;

  @Prop()
  password: string;

  @Prop({ unique: true })
  @Expose()
  @Field()
  email: string;

  @Prop()
  @Expose()
  @Field()
  firstName: string;

  @Prop()
  @Expose()
  @Field()
  lastName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User &
  ResolveTimestamps<Document, { timestamps: true }>;
export type UserModel = Model<UserDocument>;
