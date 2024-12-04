export abstract class SeedError extends Error {
  static code = "SEED_ERROR";
  private readonly isSeedError = true;

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

Object.defineProperty(SeedError, Symbol.hasInstance, {
  value: function (instance: any) {
    return (
      instance &&
      typeof instance === "object" &&
      "isSeedError" in instance &&
      "code" in instance &&
      (instance as any).code === this.code
    );
  },
  writable: false,
  configurable: true,
  enumerable: false,
});

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
