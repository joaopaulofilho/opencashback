import { Injectable } from '@nestjs/common';
import { FormatMoney } from 'src/common/format.money';
import { ProgramDto } from 'src/opencashback/dtos/program.dto';
import { FindCashbackPriceResponseDto } from 'src/opencashback/dtos/find.cashback.price.response.dto';
import { ProgramEntity } from 'src/opencashback/program.entity';
import { ProgramsFactory } from 'src/opencashback/programs.factory';
import { ProgramsRepository } from 'src/opencashback/programs.repository';

@Injectable()
export class FindCashbackPriceQuery {
	constructor(
		private factory: ProgramsFactory,
		private repo: ProgramsRepository,
		private formatMoney: FormatMoney,
	) {}

	async execute(productId: string, price: number): Promise<FindCashbackPriceResponseDto> {
		const program = await this.repo.findProduct(productId)

		const decimalPercentage = program.percentage / 10000
		const priceNormalized = Math.floor(price) / 100

		const cashback = this.formatMoney.formatBr(priceNormalized * decimalPercentage)
		const cashbackUS = this.formatMoney.formatUs(priceNormalized * decimalPercentage)

		return {
			cashback: {
				value: parseFloat(cashbackUS),
				'pt-br': `R\$ ${cashback}`,
			}
		}
	}
}