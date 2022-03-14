export interface AccessClaim {
  iss: string;
  ['https://baggers.app/role']: string[];
  permissions: string[];
  sub: string;
  aud: string[];
  iat: number;
  exp: number;
  azp: string;
  scope: string;
}
