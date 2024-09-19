abstract class SeedError extends Error {
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

export class PreAuthorizationFailedError extends SeedError {
  constructor(message: string, context?: any) {
    super(message, "PRE_AUTHORIZATION_FAILED_ERROR", context);
  }
}

export class AuthTokenNotSetError extends SeedError {
  constructor(message: string, context?: any) {
    super(message, "AUTH_TOKEN_NOT_SET_ERROR", context);
  }
}
