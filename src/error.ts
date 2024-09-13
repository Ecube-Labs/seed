export type SeedErrorKind = 'SEED_ERROR' | 'PRE_AUTHORIZATION_FAILED_ERROR' | 'AUTH_TOKEN_NOT_SET_ERROR';

export class SeedError extends Error {
    constructor(
        message: string,
        public code: SeedErrorKind = "SEED_ERROR",
        public context?: any,
    ) {
        super(message);
        this.name = 'SeedError';
    }
}
