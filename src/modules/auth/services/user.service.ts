import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor() {}
  findAll() {
    return 'Returns all users';
  }
}
