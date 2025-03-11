import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './interfaces/users.interface';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockReturnValue([
              { id: 1, name: 'John Doe' },
              { id: 2, name: 'Test' },
              { id: 3, name: 'Super' },
            ]),
            findOne: jest.fn((id: number) => {
              if (id === 1) {
                return { id: 1, name: 'John Doe' };
              }
              return undefined;
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', () => {
      const result: User[] = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Test' },
        { id: 3, name: 'Super' },
      ];
      const findAllSpy = jest.spyOn(service, 'findAll').mockReturnValue(result);
      expect(controller.findAll()).toEqual(result);
      expect(findAllSpy).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user with the given id', () => {
      const result: User = { id: 1, name: 'John Doe' };
      const findOneSpy = jest.spyOn(service, 'findOne').mockReturnValue(result);
      expect(controller.findOne(1)).toEqual(result);
      expect(findOneSpy).toHaveBeenCalledWith(1);
    });

    it('should return undefined if user is not found', () => {
      const findOneSpy = jest
        .spyOn(service, 'findOne')
        .mockReturnValue(undefined);
      expect(controller.findOne(999)).toBeUndefined();
      expect(findOneSpy).toHaveBeenCalledWith(999);
    });
  });
});
