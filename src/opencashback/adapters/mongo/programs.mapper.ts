import { Injectable } from '@nestjs/common';
import { ProgramDocument } from 'src/opencashback/adapters/mongo/program.model';
import { ProgramEntity } from 'src/opencashback/program.entity';
import { ProgramsFactory } from 'src/opencashback/programs.factory';

@Injectable()
export class ProgramsMongoMapper {
	constructor(
		private factory: ProgramsFactory,
	) {}

	docToEntity(doc: ProgramDocument): ProgramEntity {
		console.log('DO TO ENTITY', doc);
		return this.factory.build({
			productId: doc.productId,
			value: doc.value,
			percentage: doc.percentage,
			startDate: new Date(doc.startDate).toISOString(),
			endDate: new Date(doc.endDate).toISOString(),
			status: doc.status,
			id: doc.id,
		})
	}

	entityToDoc(entity: ProgramEntity): ProgramDocument {
        return {
			id: entity.id,
            productId: entity.productId,
			value: entity.value,
			percentage: entity.percentage,
			startDate: entity.startDate,
			endDate: entity.endDate,
			status: entity.status,
        } as ProgramDocument
	}
}