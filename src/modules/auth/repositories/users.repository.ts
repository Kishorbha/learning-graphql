import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { MongooseBaseRepo } from 'src/utils/mongoose-base.repo';
import { User, UserDocument, UserModel } from '../entities/user.entity';

@Injectable()
export class UsersRepository extends MongooseBaseRepo<UserDocument> {
  constructor(
    @InjectModel(User.name)
    private userModel: UserModel,
  ) {
    super(userModel);
  }
}
