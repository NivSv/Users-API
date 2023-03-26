import { DynamicModule, Module } from '@nestjs/common';
import { POSTGRES_MODULE_OPTIONS } from './postgres.constants';
import { PostgresModuleOptions } from './postgres.interface';
import { PostgresService } from './postgres.service';

@Module({})
export class PostgresModule {
  static forRoot(options: PostgresModuleOptions): DynamicModule {
    return {
      module: PostgresModule,
      providers: [
        {
          provide: POSTGRES_MODULE_OPTIONS,
          useValue: options,
        },
        PostgresService,
      ],
      exports: [PostgresService],
    };
  }
}
