import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findAll() {
    return 'Returns all users';
  }
}
