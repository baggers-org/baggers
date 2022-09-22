import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwks from 'jwks-rsa';
import { Auth0AccessTokenPayload } from './types';
import { EnvService } from '~/env';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private issuer: string;

  private audience: string;

  constructor(private envService: EnvService) {
    const domain = envService.get('AUTH0_DOMAIN');

    const apiUrl = envService.get('API_URI');
    const audience = `${apiUrl}/graphql`;
    const issuer = `https://${domain}/`;

    super({
      secretOrKeyProvider: jwks.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${domain}/.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience,
      issuer,
      algorithms: [`RS256`],
      credentialsRequired: false,
    });

    this.audience = audience;
    this.issuer = issuer;
  }
  async validate(payload: Auth0AccessTokenPayload) {
    if (!payload.aud.includes(this.audience))
      throw new UnauthorizedException(undefined, 'Invalid aud');
    if (payload.iss !== this.issuer)
      throw new UnauthorizedException(undefined, 'Invalid issuer');

    return payload;
  }
}
