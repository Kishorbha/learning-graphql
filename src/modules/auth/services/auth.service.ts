import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepo: UsersRepository) {}
  async findAll() {
    return this.userRepo.find({});
  }
}
