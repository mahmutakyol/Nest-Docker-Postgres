import { Test, TestingModule } from '@nestjs/testing';
import { DblogService } from './dblog.service';

describe('DblogService', () => {
  let service: DblogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DblogService],
    }).compile();

    service = module.get<DblogService>(DblogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
