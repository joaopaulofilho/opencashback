import { Injectable } from '@nestjs/common';
import { ProgramDto } from 'src/opencashback/dtos/program.dto';
import { ProgramEntity } from 'src/opencashback/program.entity';
import { ProgramsFactory } from 'src/opencashback/programs.factory';
import { ProgramsRepository } from 'src/opencashback/programs.repository';

@Injectable()
export class UpdateProgramCommand {
	constructor(
		private factory: ProgramsFactory,
		private repo: ProgramsRepository,
	) {}

	async execute(id: string, entry: Partial<ProgramDto>): Promise<ProgramEntity> {
		const entity = this.factory.build(entry)
		return await this.repo.update(id, entity)
	}
}