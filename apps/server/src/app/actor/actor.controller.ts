import { Body, Controller, Delete, Get, Param, HttpCode, Post, Put } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';
import { ActorEntity } from './entities/actor.entity';
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { SearchActorDto } from './dto/search-actor.dto';

@ApiTags('actor')
@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @ApiOkResponse({
    type: ActorEntity,
    isArray: true,
    status: 200,
    description: 'Get all Actor response'
  })
  @ApiNotFoundResponse({ description: 'No actor found' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  @Get()
  async findAll() {
    return this.actorService.findAll();
  }

  @ApiOkResponse({
    type: ActorEntity,
    isArray: true,
    status: 201,
    description: 'Create User response'
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  @Post()
  async create(@Body() body: CreateActorDto) {
    return this.actorService.create(body);
  }

  @ApiOkResponse({
    type: ActorEntity,
    isArray: true,
    status: 200,
    description: 'Search all Actor response'
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  @HttpCode(200)
  @Post('search')
  async search(@Body() data: SearchActorDto) {
    const query = {
      skip: data?.skip || 0, //default
      limit: data?.limit || 50, //default
      filter: {},
      search: data?.search || null
    };
    return this.actorService.search(query);
  }

  @ApiOkResponse({
    type: ActorEntity,
    status: 201,
    description: 'Update Actor by id response'
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateActorDto) {
    return this.actorService.update(id, data);
  }

  @ApiOkResponse({
    type: ActorEntity,
    status: 200,
    description: 'Get Actor by id response'
  })
  @ApiNotFoundResponse({ description: 'No user found by ID' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.actorService.findOne(id);
  }

  @ApiOkResponse({
    type: ActorEntity,
    status: 200,
    description: 'Delete Actor by id response'
  })
  @ApiNotFoundResponse({ description: 'No user found by ID' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.actorService.delete(id);
  }
}
