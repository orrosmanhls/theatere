import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DocumentStatus, IItems } from '@node-monorepo/types';

export type ItemsDocument = IItems & Document;

@Schema({ timestamps: true })
export class Items {
  @Prop({ default: DocumentStatus.ACTIVE, enum: DocumentStatus, type: Number })
  status: DocumentStatus;
}

export const ItemsSchema = SchemaFactory.createForClass(Items);

ItemsSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;

  return obj;
};
