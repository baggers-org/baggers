import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { EnvModule } from '~/env';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), EnvModule],
  providers: [JwtStrategy],
})
export class AuthModule {}
