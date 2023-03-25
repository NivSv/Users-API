import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentsService } from '../departments/departments.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, DepartmentsService],
    })
      .overrideProvider(UsersService)
      .useValue({})
      .overrideProvider(DepartmentsService)
      .useValue({})
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
