import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProgramDocument } from 'src/opencashback/adapters/mongo/program.model';
import { ProgramsMongoMapper } from 'src/opencashback/adapters/mongo/programs.mapper';
import { ProgramsRepository } from 'src/opencashback/programs.repository';
import { ProgramEntity } from 'src/opencashback/program.entity';

@Injectable()
export class ProgramsRepositoryMongoAdapter extends ProgramsRepository {
	constructor(
		@InjectModel('ProgramModel') private model: Model<ProgramDocument>,
		private mapper: ProgramsMongoMapper,
	) {
		super()
	}

	async findAll(): Promise<ProgramEntity[]> {
		const found = await this.model.find()
		return found.map(doc => this.mapper.docToEntity(doc))
	}

	async findOne(id: string): Promise<ProgramEntity> {
		const doc = await this.model.findOne({ id })
		return this.mapper.docToEntity(doc)
	}

	async create(entry: ProgramEntity): Promise<ProgramEntity> {
        const entity = this.mapper.entityToDoc(entry)
        entity.id = new Types.ObjectId().toString()
		const doc = await this.model.create(entity)
        return this.mapper.docToEntity(doc)
	}

	async update(id: string, entry: Partial<ProgramEntity>): Promise<ProgramEntity> {
		await this.model.update({ id }, entry)
    	return this.findOne(id)
	}

	async remove(id: string): Promise<ProgramEntity> {
    	const entity = await this.findOne(id)
		await this.model.remove({ id })
		return entity
	}
}