import { MongooseModule, Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class ProgramModel {
	@Prop({ alias: 'id' })
	_id: string
	id: string

	@Prop({ required: true })
	productId: string

	@Prop({ required: true })
	value: number

	@Prop({ required: true })
	percentage: number

	@Prop({ required: true })
	startDate: Date

	@Prop({ required: true })
	endDate: Date

	@Prop({ default: true })
	status: boolean
}

export type ProgramDocument = ProgramModel & Document

export const ProgramSchema = SchemaFactory.createForClass(ProgramModel)