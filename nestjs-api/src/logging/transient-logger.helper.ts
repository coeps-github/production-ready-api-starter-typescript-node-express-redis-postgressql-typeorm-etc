import { Logger } from 'winston';
import * as expressWinston from 'express-winston';
import { FilterRequest, FilterResponse } from 'express-winston';

export function createExpressWinstonHandler(logger: Logger) {
  return expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    metaField: 'express',
    baseMeta: { context: 'Express' },
    statusLevels: true,
    expressFormat: true,
    headerBlacklist: ['cookie'],
    requestWhitelist: ['headers', 'body'],
    responseWhitelist: ['headers', 'body'],
    requestFilter: sanitizeRequest,
    responseFilter: sanitizeResponse,
    ignoreRoute: () => false
  });
}

export function sanitizeRequest(req: FilterRequest, propName: string) {
  if (propName === 'headers') {
    // The 'if-none-match' header can break logstash JSON format
    if ('if-none-match' in req.headers) {
      req.headers['if-none-match'] = 'EXCLUDED';
    }
    // The 'authorization' header has the plaintext jwt token, we should never log it
    if (req.headers.authorization) {
      req.headers.authorization = 'Bearer [REDACTED]';
    }
    // The 'cookie' header could contain jwt tokens
    if (req.headers.cookie) {
      const cookies = req.headers.cookie.split('; ');
      req.headers.cookie = cookies
        .map((cookie) => {
          if (cookie.startsWith('AccessToken=')) {
            return 'AccessToken=REDACTED';
          }
          if (cookie.startsWith('RefreshToken=')) {
            return 'RefreshToken=REDACTED';
          }
          if (cookie.startsWith('XSRF-TOKEN')) {
            return 'XSRF-TOKEN=REDACTED';
          }
          return cookie;
        })
        .join('; ');
    }
  }
  if (propName === 'body') {
    if (req.body.password) {
      req.body.password = '[REDACTED]';
    }
  }
  return (req as any)[propName];
}

export function sanitizeResponse(res: FilterResponse, propName: string) {
  if (propName === 'body') {
    if (res.body.access_token) {
      res.body.access_token = '[REDACTED]';
    }
  }
  return (res as any)[propName];
}

