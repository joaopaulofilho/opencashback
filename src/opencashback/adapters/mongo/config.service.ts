import { Injectable } from '@nestjs/common';
import { MongooseOptionsFactory, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
	constructor(
		private config: ConfigService,
	) {}

	createMongooseOptions(): MongooseModuleOptions {
		return {
			uri: this.config.get<string>('database.mongo'),
		}
	}
}