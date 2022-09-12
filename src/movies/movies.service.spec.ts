import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('should be array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });
  describe('getOne()', () => {
    it('should be a film', () => {
      service.create({
        title: 'test movie',
        genres: ['123', '343'],
        year: 2000,
      });
      const result = service.getOne(1);
      expect(result).toBeDefined();
      expect(result.id).toEqual(1);
    });
    it('should be 404 error', () => {
      try {
        service.getOne(2);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toEqual('film with id 2 not found');
      }
      service.create({
        title: 'test movie',
        genres: ['123', '343'],
        year: 2000,
      });
      const result = service.getOne(1);
      expect(result).toBeDefined();
      expect(result.id).toEqual(1);
    });
  });

  describe('remove()', () => {
    it('should delete film', () => {
      service.create({
        title: 'test movie',
        genres: ['123', '343'],
        year: 2000,
      });
      const allMovies = service.getAll().length;
      service.remove(1);
      const afterRemove = service.getAll().length;
      expect(afterRemove).toBeLessThan(allMovies);
    });
    it('should be 404 error', () => {
      try {
        service.remove(2);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toEqual('film with id 2 not found');
      }
    });
  });

  describe('create()', () => {
    it('film should be created', () => {
      const beforeCreate = service.getAll().length;
      console.log(beforeCreate);
      service.create({
        title: 'test movie',
        genres: ['123', '343'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });
  describe('patch()', () => {
    it('film should be changed', () => {
      service.create({
        title: 'test movie',
        genres: ['123', '343'],
        year: 2000,
      });
      service.patch(1, { title: 'new title' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('new title');
    });
    it('should be 404 error', () => {
      try {
        service.patch(9999, { title: '123' });
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
