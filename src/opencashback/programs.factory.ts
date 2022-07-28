import { Injectable } from '@nestjs/common';
import { ProgramEntity } from 'src/opencashback/program.entity';
import { ProgramDto } from 'src/opencashback/dtos/program.dto';

@Injectable()
export class ProgramsFactory {
	build(data: Partial<ProgramDto> & { id?: string }): ProgramEntity {
		return new ProgramEntity(
			data.productId,
			data.value,
			data.percentage,
			data.startDate ? new Date(data.startDate) : undefined,
			data.endDate ? new Date(data.endDate) : undefined,
			data.status,
			data.id,
        )
	}
}