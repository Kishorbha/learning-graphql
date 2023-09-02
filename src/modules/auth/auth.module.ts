import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthResolver } from './resolvers/auth.resolver';
import { UserService } from './services/user.service';

@Module({
  providers: [AuthResolver, AuthService, UserService],
})
export class AuthModule {}
