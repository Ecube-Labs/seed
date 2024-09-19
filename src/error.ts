export abstract class SeedError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly context?: any
  ) {
    super(message);
    this.name = this.constructor.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class PreAuthorizationFailed extends SeedError {
  constructor(message: string, context?: any) {
    super(message, "PRE_AUTHORIZATION_FAILED", context);
  }
}

export class NoAuthTokenFound extends SeedError {
  constructor(message: string, context?: any) {
    super(message, "NO_AUTH_TOKEN_FOUND", context);
  }
}
