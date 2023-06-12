import { Document, ObjectId } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DocumentStatus, IShow } from '@node-monorepo/types';

export type ShowDocument = IShow & Document;

@Schema({ timestamps: true })
export class Show {
  @Prop({ default: DocumentStatus.ACTIVE, enum: DocumentStatus, type: Number })
  status: DocumentStatus;

  @Prop({ type: String, required: true })
  playId: ObjectId;

  @Prop({ type: [String], required: true })
  actors: ObjectId[];

  @Prop({ type: String, required: true })
  hall: string;

  @Prop({ type: Date, required: true })
  date: Date;
}

export const ShowSchema = SchemaFactory.createForClass(Show);

ShowSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;

  return obj;
};
