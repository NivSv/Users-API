import { Test, TestingModule } from '@nestjs/testing';
import { PostgresService } from '@niv/postgres';
import { DepartmentsService } from './departments.service';

describe('DepartmentsService', () => {
  let service: DepartmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepartmentsService, PostgresService],
    })
      .overrideProvider(PostgresService)
      .useValue({})
      .compile();

    service = module.get<DepartmentsService>(DepartmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
