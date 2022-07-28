import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { OpencashbackModule } from 'src/opencashback/opencashback.module';
import { ProgramsRepository } from 'src/opencashback/programs.repository';
import { ProgramsFactory } from 'src/opencashback/programs.factory';

import { programStub } from 'test/stubs/program.stub';

describe('Open CashBack Controller (e2e)', () => {
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

	it('create', () => {
		const stub = programStub()
		return request(app.getHttpServer())
			.post('/opencashback')
			.send(stub)
			.expect(201)
			.then(response => {
				expect(response.body.id).toBeTruthy()
				expect(response.body).toMatchObject(stub)
			});
	});

	it('update', async () => {
		const stub = programStub()
		const saved = await repo.create(factory.build(stub))

		return request(app.getHttpServer())
			.patch(`/opencashback/${saved.id}`)
			.send({
				percentage: 983,
			})
			.expect(200)
			.then(response => {
				expect(response.body.id).toStrictEqual(saved.id)
				expect(response.body.percentage).toStrictEqual(983)
			});
	});

	it('find one', async () => {
		const stub = programStub()
		const saved = await repo.create(factory.build(stub))

		return request(app.getHttpServer())
			.get(`/opencashback/${saved.id}`)
			.expect(200)
			.then(response => {
				expect(response.body).toMatchObject({
					...saved,
					startDate: saved.startDate.toISOString(),
					endDate: saved.endDate.toISOString(),
				})
			});
	});

	it('find all', async () => {
		const stub = programStub()
		const saved1 = await repo.create(factory.build(stub))
		const saved2 = await repo.create(factory.build(stub))

		return request(app.getHttpServer())
			.get(`/opencashback`)
			.expect(200)
			.then(response => {
				expect(Array.isArray(response.body)).toBe(true)
				expect(response.body.find(i => i.id == saved1.id)).toBeTruthy()
				expect(response.body.find(i => i.id == saved2.id)).toBeTruthy()
			});
	});

	it('remove', async () => {
		const stub = programStub()
		const saved = await repo.create(factory.build(stub))

		return request(app.getHttpServer())
			.delete(`/opencashback/${saved.id}`)
			.expect(200)
			.then(async response => {
				expect(response.body.id).toStrictEqual(saved.id)
				try {
					await repo.findOne(saved.id)
				} catch (err) {
					expect(err).toBeTruthy()
				}
			});
	});
});
