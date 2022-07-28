import { Injectable } from '@nestjs/common';
import { ProgramDto } from 'src/opencashback/dtos/program.dto';
import { ProgramEntity } from 'src/opencashback/program.entity';
import { ProgramsFactory } from 'src/opencashback/programs.factory';
import { ProgramsRepository } from 'src/opencashback/programs.repository';

@Injectable()
export class FindAllProgramsQuery {
	constructor(
		private factory: ProgramsFactory,
		private repo: ProgramsRepository,
	) {}

	async execute(): Promise<ProgramEntity[]> {
		return await this.repo.findAll()
	}
}