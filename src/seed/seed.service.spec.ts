import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentsService } from '../departments/departments.service';
import { UtilsService } from '../utils/utils.service';
import { SeedService } from './seed.service';

describe('SeedService', () => {
  let service: SeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeedService, DepartmentsService, SeedService, UtilsService],
    })
      .overrideProvider(DepartmentsService)
      .useValue({})
      .overrideProvider(SeedService)
      .useValue({})
      .compile();

    service = module.get<SeedService>(SeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
