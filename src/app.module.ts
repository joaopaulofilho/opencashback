import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from 'src/config';
import { MongooseConfigService } from 'src/opencashback/adapters/mongo/config.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from 'src/common/common.module';
import { OpencashbackModule } from 'src/opencashback/opencashback.module';

@Module({
	imports: [
		ConfigModule.forRoot({
    		isGlobal: true,
    		load: [config],
    	}),
    	MongooseModule.forRootAsync({
			useClass: MongooseConfigService,
		}),
    	CommonModule,
		OpencashbackModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
