import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DocumentStatus, IUser } from '@node-monorepo/types';

export type UsersDocument = IUser & Document;

@Schema({ timestamps: true })
export class Users {
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop()
  phone: string;
  @Prop()
  email: string;
  @Prop()
  address: string;
  @Prop({ default: DocumentStatus.ACTIVE, enum: DocumentStatus, type: Number })
  status: DocumentStatus;
}

export const UsersSchema = SchemaFactory.createForClass(Users);

UsersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;

  return obj;
};
