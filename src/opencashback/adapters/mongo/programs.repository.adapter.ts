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

	async findOne(_id: string): Promise<ProgramEntity> {
		const doc = await this.model.findOne({ _id })
		return this.mapper.docToEntity(doc)
	}

	async findProduct(productId: string): Promise<ProgramEntity> {
		const doc = await this.model.findOne({ productId })
		return this.mapper.docToEntity(doc)
	}

	async create(entry: ProgramEntity): Promise<ProgramEntity> {
        const entity = this.mapper.entityToDoc(entry)
        entity.id = new Types.ObjectId().toString()
		const doc = await this.model.create(entity)
        return this.mapper.docToEntity(doc)
	}

	async update(_id: string, entry: Partial<ProgramEntity>): Promise<ProgramEntity> {
		await this.model.updateOne({ _id }, entry)
    	return this.findOne(_id)
	}

	async remove(_id: string): Promise<ProgramEntity> {
    	const entity = await this.findOne(_id)
		await this.model.deleteOne({ _id })
		return entity
	}
}