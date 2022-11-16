import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwks from 'jwks-rsa';
import { Auth0AccessTokenPayload } from './types';
import { env } from '~/env/env.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private issuer: string;

  private audience: string;

  constructor() {
    const domain = env.AUTH0_DOMAIN;

    const apiUrl = env.API_URL;
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
    if (!payload.aud.includes(this.audience)) {
      console.error('Throwing invald AUD');
      throw new UnauthorizedException(
        { message: 'Invalid aud' },
        'Invalid aud'
      );
    }
    if (payload.iss !== this.issuer) {
      console.error('Throwing invald issuer');
      throw new UnauthorizedException(
        {
          message: 'Invalid iss',
        },
        'Invalid issuer'
      );
    }

    return payload;
  }
}
