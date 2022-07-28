import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { OpencashbackModule } from 'src/opencashback/opencashback.module';
import { ProgramsRepository } from 'src/opencashback/programs.repository';
import { ProgramsFactory } from 'src/opencashback/programs.factory';

import { programStub } from 'test/stubs/program.stub';

describe('OpenCashBack Find Cashback Price (e2e)', () => {
	let app: INestApplication;
	let repo: ProgramsRepository;
	let factory: ProgramsFactory;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule, OpencashbackModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		repo = app.get<ProgramsRepository>(ProgramsRepository);
		factory = app.get<ProgramsFactory>(ProgramsFactory);
	});

	it('find cashback price value', async () => {
		const stub = programStub()
		const saved = await repo.create(factory.build(stub))

		return request(app.getHttpServer())
			.get(`/opencashback/${saved.productId}/15300`)
			.expect(200)
			.then(response => {
				expect(response.body.cashback.value).toEqual(20.66)
				expect(response.body.cashback['pt-br']).toEqual('R$ 20,66')
			});
	});

	it('retun error from endpoint validation', async () => {
		const stub = programStub()
		const saved = await repo.create(factory.build(stub))

		return request(app.getHttpServer())
			.get(`/opencashback/${saved.productId}/abc`)
			.expect(400)
			.then(response => {
				expect(response.body.message[0]).toStrictEqual('price must be a number string');
			});
	});
});
