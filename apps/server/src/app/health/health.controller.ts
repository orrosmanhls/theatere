import { Controller, Get, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Public } from '../../decorators/public.decorator';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Public()
  @Get()
  @ApiResponse({
    isArray: true,
    status: 200,
    description: 'Health check'
  })
  async health(@Res() res: Response) {
    return res.sendStatus(200);
  }
}
