import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class FormatMoney {
	abstract formatUs(n: number): string;
	abstract formatBr(n: number): string;
}