import { Module, Global } from '@nestjs/common';
import { FormatMoney } from 'src/common/format.money';
import { FormatMoneyNodeAdapter } from 'src/common/format.money.node.adapter';

@Global()
@Module({
	providers: [
		{ provide: FormatMoney, useClass: FormatMoneyNodeAdapter },
	],
	exports: [FormatMoney],
})
export class CommonModule {}
