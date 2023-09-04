import { Resolver, Query } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { User } from '../entities/user.entity';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => [User], { name: 'auth' })
  findAll() {
    return this.authService.findAll();
  }
}
