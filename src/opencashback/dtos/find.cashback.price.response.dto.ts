
type cashbackType = {
	value: number,
	'pt-br': string,
}
export class FindCashbackPriceResponseDto {
	constructor(
		public cashback: cashbackType,
	) {}
}