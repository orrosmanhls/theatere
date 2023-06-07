import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';
import { UsersEntity } from './entities/users.entity';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { SearchUsersDto } from './dto/search-users.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    type: UsersEntity,
    isArray: true,
    status: 200,
    description: 'Get all Users response'
  })
  @ApiNotFoundResponse({ description: 'No users found' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  @Get()
  async getAll() {
    return this.usersService.findAll();
  }

  @ApiOkResponse({
    type: UsersEntity,
    isArray: true,
    status: 201,
    description: 'Create User response'
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  @Post()
  async create(@Body() body: CreateUsersDto) {
    return this.usersService.create(body);
  }

  @ApiOkResponse({
    type: UsersEntity,
    isArray: true,
    status: 200,
    description: 'Search all Users response'
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  @HttpCode(200)
  @Post('search')
  async search(@Body() data: SearchUsersDto) {
    const query = {
      skip: data?.skip || 0, //default
      limit: data?.limit || 50, //default
      filter: {},
      search: data?.search || null
    };
    return this.usersService.search(query);
  }

  @ApiOkResponse({
    type: UsersEntity,
    status: 201,
    description: 'Update Users by id response'
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateUsersDto) {
    return this.usersService.update(id, data);
  }

  @ApiOkResponse({
    type: UsersEntity,
    status: 200,
    description: 'Get Users by id response'
  })
  @ApiNotFoundResponse({ description: 'No user found by ID' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOkResponse({
    type: UsersEntity,
    status: 204,
    description: 'Delete Users by id response'
  })
  @ApiNotFoundResponse({ description: 'No user found by ID' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
