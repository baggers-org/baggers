import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  findOne(_id: string) {
    return this.userModel.findById(_id);
  }

  findOrCreate(createUserInput: CreateUserInput) {
    return this.userModel.findOneAndUpdate(
      { _id: createUserInput._id },
      {
        $set: createUserInput,
      },
      { upsert: true, new: true },
    );
  }

  update(_id: string, updateUserInput: UpdateUserInput) {
    return this.userModel.findOneAndUpdate(
      { _id },
      {
        $set: updateUserInput,
      },
      {
        new: true,
      },
    );
  }

  remove(_id: string) {
    return this.userModel.remove({ _id });
  }
}
