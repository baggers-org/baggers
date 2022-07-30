import { EnvModule } from '@baggers/api-env';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), EnvModule],
  providers: [JwtStrategy],
})
export class AuthModule {}
