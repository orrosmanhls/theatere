import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { PlaysService } from './plays.service';
import { CreatePlayDto } from './dto/create-play.dto';
import { UpdatePlayDto } from './dto/update-play.dto';
import { SearchPlayDto } from './dto/search-play.dto';

@Controller('plays')
export class PlaysController {
  constructor(private readonly playsService: PlaysService) {}

  @Get()
  async findAll() {
    return this.playsService.findAll();
  }

  @Get(':id')
  async findOne(@Param() id: string) {
    return this.playsService.findOne(id);
  }

  @Post()
  async AddPlay(@Body() createPlayDto: CreatePlayDto) {
    return this.playsService.create(createPlayDto);
  }

  @Put(':id')
  async updatePlay(@Param() id: string, @Body() UpdatePlayDto: UpdatePlayDto) {
    return this.playsService.update(id, UpdatePlayDto);
  }

  @Delete(':id')
  async removePlay(@Param() id: string) {
    return this.playsService.delete(id);
  }

  @Post('search')
  async search(@Body() data: SearchPlayDto) {
    const query = {
      filter: data?.filter || {},
      search: data?.search || ''
    };
    return this.playsService.search(query);
  }
}
