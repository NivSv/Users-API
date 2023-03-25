import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @ApiOkResponse({ description: 'OK' })
  @Get()
  getHealth(): string {
    return 'OK';
  }
}
