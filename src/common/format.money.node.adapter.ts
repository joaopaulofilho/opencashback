import { Injectable } from '@nestjs/common';
import { FormatMoney } from 'src/common/format.money';

@Injectable()
export class FormatMoneyNodeAdapter extends FormatMoney {
	constructor() {
		super()
	}

	formatUs(n: number): string {
		return Intl.NumberFormat('en-us', {
			style: 'decimal',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(n)
	}

	formatBr(n: number): string {
		return Intl.NumberFormat('pt-br', {
			style: 'decimal',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(n)
	}
}