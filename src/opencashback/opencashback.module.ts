import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { OpencashbackController } from 'src/opencashback/opencashback.controller';
import { ProgramModel, ProgramSchema } from 'src/opencashback/adapters/mongo/program.model';
import { ProgramsMongoMapper } from 'src/opencashback/adapters/mongo/programs.mapper';
import { ProgramsRepositoryMongoAdapter } from 'src/opencashback/adapters/mongo/programs.repository.adapter';
import { ProgramsRepository } from 'src/opencashback/programs.repository';
import { ProgramsFactory } from 'src/opencashback/programs.factory';

import { CreateProgramCommand } from 'src/opencashback/operations/create.program';
import { FindAllProgramsQuery } from 'src/opencashback/operations/find.all.programs';
import { FindOneProgramQuery } from 'src/opencashback/operations/find.one.program';
import { FindCashbackPriceQuery } from 'src/opencashback/operations/find.cashback.price';
import { UpdateProgramCommand } from 'src/opencashback/operations/update.program';
import { RemoveProgramCommand } from 'src/opencashback/operations/remove.program';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: ProgramModel.name, schema: ProgramSchema, collection: 'programs' }]),
	],
	controllers: [OpencashbackController],
	providers: [
		{
			provide: APP_PIPE,
			useFactory: () => {
				return new ValidationPipe({ transform: true, whitelist: true })
			}
		},
		{
			provide: ProgramsRepository,
			useClass: ProgramsRepositoryMongoAdapter,
		},
		ProgramsMongoMapper,
		ProgramsFactory,
		CreateProgramCommand,
		FindAllProgramsQuery,
		FindOneProgramQuery,
		FindCashbackPriceQuery,
		UpdateProgramCommand,
		RemoveProgramCommand,
	],
})
export class OpencashbackModule {}
