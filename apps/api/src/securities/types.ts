import { Security } from './entities';

type PlaidSecurityId = string;
export type SecurityMap = Map<PlaidSecurityId, Security | undefined>;
