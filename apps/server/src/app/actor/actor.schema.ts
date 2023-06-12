import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DocumentStatus, IActor } from '@node-monorepo/types';

export type ActorDocument = IActor & Document;

@Schema({ timestamps: true })
export class Actor {
  @Prop({ default: DocumentStatus.ACTIVE, enum: DocumentStatus, type: Number })
  status: DocumentStatus;
}

export const ActorSchema = SchemaFactory.createForClass(Actor);

ActorSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;

  return obj;
};
