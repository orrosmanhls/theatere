import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Genres, DocumentStatus, IPlay } from '@node-monorepo/types';

export type PlaysDocument = IPlay & Document;

@Schema({ timestamps: true })
export class Plays {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ enum: Genres, required: true })
  genre: Genres;

  @Prop({ default: DocumentStatus.ACTIVE, enum: DocumentStatus, type: Number })
  status: DocumentStatus;
}

export const PlaysSchema = SchemaFactory.createForClass(Plays);

PlaysSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;

  return obj;
};
