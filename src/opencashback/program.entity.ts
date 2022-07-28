
export class ProgramEntity {
	constructor(
		public productId?: string,
		public value?: number,
		public percentage?: number,
		public startDate?: Date,
		public endDate?: Date,
		public status?: boolean,
		public id?: string,
	) {}
}