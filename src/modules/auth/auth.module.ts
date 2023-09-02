import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthResolver } from './resolvers/auth.resolver';

@Module({
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
