import passport from 'passport';
import { BearerStrategy, IBearerStrategyOptionWithRequest } from 'passport-azure-ad';

import { CONFIG } from '../config';

const options = {
  identityMetadata: CONFIG.auth.identityMetadata,
  clientID: CONFIG.auth.clientId,
  issuer: CONFIG.auth.issuer,
  audience: CONFIG.auth.audience,
  validateIssuer: true,
  loggingLevel: 'error',
  passReqToCallback: false
} as IBearerStrategyOptionWithRequest;

const bearerStrategy = new BearerStrategy(
  options,
  (token: any, done: Function) => {
    done(
      null,
      {
        isAdmin: !!token?.roles?.find((r: string) => r === CONFIG.auth.adminGroupId)
      },
      token
    );
  });

passport.use(bearerStrategy);

/**
 * Authentication Middleware.
 */
export const authenticate = () => passport.authenticate('oauth-bearer', { session: false });
