import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll();
  }

  async findOneId(id: string): Promise<User> {
    return await this.userModel.findOne({
      where: {
        id
      }
    });
  }

  async findOneUsername(username: string): Promise<User> {
    return await this.userModel.findOne({
      where: {
        username
      }
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOneId(id);
    await user.destroy();
  }
}
