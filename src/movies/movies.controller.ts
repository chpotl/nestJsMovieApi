import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesServise: MoviesService) {}
  @Get()
  getAll(): Movie[] {
    return this.moviesServise.getAll();
  }

  @Get('/search')
  search(@Query('year') year: number) {
    return 'Film with year ' + year;
  }

  @Get('/:id')
  getOne(@Param('id') id: number): Movie {
    return this.moviesServise.getOne(id);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto): void {
    return this.moviesServise.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') movieId: number) {
    return this.moviesServise.remove(movieId);
  }

  @Patch('/:id')
  patch(@Param('id') id: number, @Body() updatedMovie: UpdateMovieDto) {
    return this.moviesServise.patch(id, updatedMovie);
  }
}
