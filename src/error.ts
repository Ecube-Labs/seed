export abstract class SeedError extends Error {
  static code = "SEED_ERROR";

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

  static [Symbol.hasInstance](instance: any) {
    if (this === SeedError) {
      return instance instanceof Error && "code" in instance;
    } else {
      return (
        instance instanceof Error &&
        "code" in instance &&
        (instance as any).code === this.code
      );
    }
  }
}

export class PreAuthorizationFailed extends SeedError {
  static code = "PRE_AUTHORIZATION_FAILED";
  constructor(message: string, context?: any) {
    super(message, PreAuthorizationFailed.code, context);
  }
}

export class NoAuthTokenFound extends SeedError {
  static code = "NO_AUTH_TOKEN_FOUND";
  constructor(message: string, context?: any) {
    super(message, NoAuthTokenFound.code, context);
  }
}
