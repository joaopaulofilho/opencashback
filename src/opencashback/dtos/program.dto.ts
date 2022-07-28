import {
	IsBoolean,
	IsInt,
	IsString,
} from 'class-validator';

export class ProgramDto {
	@IsString()
	readonly productId: string

	@IsInt()
	readonly value: number

	@IsInt()
	readonly percentage: number

	@IsString()
	readonly startDate: string

	@IsString()
	readonly endDate: string

	@IsBoolean()
	readonly status: boolean
}