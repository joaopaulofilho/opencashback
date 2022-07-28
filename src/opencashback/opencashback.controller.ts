import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ProgramsRepository } from 'src/opencashback/programs.repository';
import { ProgramDto } from 'src/opencashback/dtos/program.dto';
import { FindCashbackPriceResponseDto } from 'src/opencashback/dtos/find.cashback.price.response.dto';
import { FindCashbackPriceDto } from 'src/opencashback/dtos/find.cashback.price.dto';
import { ProgramEntity } from 'src/opencashback/program.entity';

import { CreateProgramCommand } from 'src/opencashback/operations/create.program';
import { FindAllProgramsQuery } from 'src/opencashback/operations/find.all.programs';
import { FindOneProgramQuery } from 'src/opencashback/operations/find.one.program';
import { FindCashbackPriceQuery } from 'src/opencashback/operations/find.cashback.price';
import { UpdateProgramCommand } from 'src/opencashback/operations/update.program';
import { RemoveProgramCommand } from 'src/opencashback/operations/remove.program';

@Controller('opencashback')
export class OpencashbackController {
	constructor(
		private createCommand: CreateProgramCommand,
		private findAllQuery: FindAllProgramsQuery,
		private findOneQuery: FindOneProgramQuery,
		private findCashbackPriceQuery: FindCashbackPriceQuery,
		private updateCommand: UpdateProgramCommand,
		private removeCommand: RemoveProgramCommand,
	) {}

	@Post()
	async create(@Body() data: ProgramDto): Promise<ProgramEntity> {
		return await this.createCommand.execute(data)
	}

	@Get()
	async findAll(): Promise<ProgramEntity[]> {
		return await this.findAllQuery.execute()
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<ProgramEntity> {
		return await this.findOneQuery.execute(id)
	}

	@Get(':productId/:price')
	async findCashbackPrice(
		@Param() { productId, price }: FindCashbackPriceDto,
	): Promise<FindCashbackPriceResponseDto> {
		return await this.findCashbackPriceQuery.execute(productId, price)
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() data: Partial<ProgramDto>,
	): Promise<ProgramEntity> {
		return await this.updateCommand.execute(id, data)
	}

	@Delete(':id')
	async remove(@Param('id') id: string): Promise<ProgramEntity> {
		return await this.removeCommand.execute(id)
	}
}
