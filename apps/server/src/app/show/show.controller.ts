import { Body, Controller, Delete, Get, Param, HttpCode, Post, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';
import { ShowEntity } from './entities/show.entity';
import { ShowService } from './show.service';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import { SearchShowDto } from './dto/search-show.dto';
import { PurchaseDto } from './dto/purchase.dto';
import { CancelDto } from './dto/cancel.dto';

@ApiTags('show')
@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  @ApiOkResponse({
    type: ShowEntity,
    isArray: true,
    status: 200,
    description: 'Get all Show response'
  })
  @ApiNotFoundResponse({ description: 'No show found' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  @Get()
  async findAll() {
    return this.showService.findAll();
  }

  @ApiOkResponse({
    type: ShowEntity,
    isArray: true,
    status: 201,
    description: 'Create User response'
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  @Post()
  async create(@Body() body: CreateShowDto) {
    return this.showService.create(body);
  }

  @ApiOkResponse({
    type: ShowEntity,
    isArray: true,
    status: 200,
    description: 'Search all Show response'
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  @HttpCode(200)
  @Post('search')
  async search(@Body() data: SearchShowDto) {
    const query = {
      skip: data?.skip || 0, //default
      limit: data?.limit || 50, //default
      filter: {},
      search: data?.search || null
    };
    return this.showService.search(query);
  }

  @ApiOkResponse({
    type: ShowEntity,
    status: 200,
    description: 'Update Show by id response'
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateShowDto) {
    return this.showService.update(id, data);
  }

  @ApiOkResponse({
    type: ShowEntity,
    status: 200,
    description: 'Get Show by id response'
  })
  @ApiNotFoundResponse({ description: 'No show found by ID' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.showService.findOne(id);
  }

  @ApiOkResponse({
    type: ShowEntity,
    status: 200,
    description: 'Delete Show by id response'
  })
  @ApiNotFoundResponse({ description: 'No show found by ID' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.showService.delete(id);
  }

  @ApiOkResponse({
    type: ShowEntity,
    status: 200,
    description: 'Purchase tickets to show'
  })
  @ApiNotFoundResponse({ description: 'No show found by ID' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  @ApiBadRequestResponse({
    description: 'Requested amount exceeds limit'
  })
  @Put(':id/purchase')
  async purchase(@Param('id') id: string, @Body() amount: PurchaseDto) {
    return this.showService.purchase(id, amount);
  }

  @ApiOkResponse({
    type: ShowEntity,
    status: 200,
    description: 'Cancel tickets to show'
  })
  @ApiNotFoundResponse({ description: 'No show found by ID' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  @ApiBadRequestResponse({
    description: 'Requested amount exceeds limit'
  })
  @Put(':id/cancel')
  async cancel(@Param('id') id: string, @Body() amount: CancelDto) {
    return this.showService.cancel(id, amount);
  }
}
