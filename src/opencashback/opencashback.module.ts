import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OpencashbackController } from 'src/opencashback/opencashback.controller';
import { ProgramModel, ProgramSchema } from 'src/opencashback/adapters/mongo/program.model';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: ProgramModel.name, schema: ProgramSchema, collection: 'programs' }]),
	],
	controllers: [OpencashbackController],
	providers: [],
})
export class OpencashbackModule {}
