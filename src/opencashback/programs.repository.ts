import { Injectable } from '@nestjs/common';
import { ProgramEntity } from 'src/opencashback/program.entity';

@Injectable()
export abstract class ProgramsRepository {
	abstract findAll(): Promise<ProgramEntity[]>;
	abstract findOne(id: string): Promise<ProgramEntity>;
	abstract findProduct(productId: string): Promise<ProgramEntity>;
	abstract create(data: ProgramEntity): Promise<ProgramEntity>;
	abstract update(id: string, data: Partial<ProgramEntity>): Promise<ProgramEntity>;
	abstract remove(id: string): Promise<ProgramEntity>;
}