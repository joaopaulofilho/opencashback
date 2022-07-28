import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from 'src/config';
import { MongooseConfigService } from 'src/opencashback/adapters/mongo/config.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [
		ConfigModule.forRoot({
    		isGlobal: true,
    		load: [config],
    	}),
    	MongooseModule.forRootAsync({
			useClass: MongooseConfigService,
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
