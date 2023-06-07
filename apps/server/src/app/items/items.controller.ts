import { Body, Controller, Delete, Get, Param, HttpCode, Post, Put } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';
import { ItemsEntity } from './entities/items.entity';
import { ItemsService } from './items.service';
import { CreateItemsDto } from './dto/create-items.dto';
import { UpdateItemsDto } from './dto/update-items.dto';
import { SearchItemsDto } from './dto/search-items.dto';
import { Public } from '../../decorators/public.decorator';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @ApiOkResponse({
    type: ItemsEntity,
    isArray: true,
    status: 200,
    description: 'Get all Items response'
  })
  @ApiNotFoundResponse({ description: 'No items found' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  @Get()
  async findAll() {
    return this.itemsService.findAll();
  }

  @ApiOkResponse({
    type: ItemsEntity,
    isArray: true,
    status: 201,
    description: 'Create User response'
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  @Post()
  async create(@Body() body: CreateItemsDto) {
    return this.itemsService.create(body);
  }

  @ApiOkResponse({
    type: ItemsEntity,
    isArray: true,
    status: 200,
    description: 'Search all Items response'
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  @HttpCode(200)
  @Post('search')
  async search(@Body() data: SearchItemsDto) {
    const query = {
      skip: data?.skip || 0, //default
      limit: data?.limit || 50, //default
      filter: {},
      search: data?.search || null
    };
    return this.itemsService.search(query);
  }

  @ApiOkResponse({
    type: ItemsEntity,
    status: 201,
    description: 'Update Items by id response'
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateItemsDto) {
    return this.itemsService.update(id, data);
  }

  @ApiOkResponse({
    type: ItemsEntity,
    status: 200,
    description: 'Get Items by id response'
  })
  @ApiNotFoundResponse({ description: 'No user found by ID' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }

  @ApiOkResponse({
    type: ItemsEntity,
    status: 200,
    description: 'Delete Items by id response'
  })
  @ApiNotFoundResponse({ description: 'No user found by ID' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.itemsService.delete(id);
  }
}
