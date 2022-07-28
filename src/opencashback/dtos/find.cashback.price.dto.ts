import {
	IsString,
	IsNumberString,
} from 'class-validator';

export class FindCashbackPriceDto {
	@IsString()
	readonly productId: string

	@IsNumberString()
	readonly price: number
}