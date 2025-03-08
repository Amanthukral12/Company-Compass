export interface CompanyDocument {
  id: number;
  googleId: string;
  email: string;
  avatar: string | null;
  GST: string | null;
  Address: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionDocument {
  id: string;
  sessionId: string;
  companyId: string;
  refreshToken: string;
  deviceInfo: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  lastUsedAt: Date;
  company: CompanyDocument;
}

export interface CustomSession {
  id: string;
  sessionId: string;
  companyId: number;
  deviceInfo: string | null;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  lastUsedAt: Date;
}

export interface GoogleStrategyOptions {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
}

export interface GoogleStrategyOptionsWithRequest
  extends GoogleStrategyOptions {
  passReqToCallback: true;
}

export interface VerifyCallbackDocument {
  company?: CompanyDocument;
  sessionId: string;
}

export type VerifyCallback = (
  error: any,
  company?: VerifyCallbackDocument,
  info?: any
) => void;

export interface RefreshTokenPayload {
  sessionId: string;
}

export interface AccessTokenPayload {
  companyId: number;
  sessionId: string;
}
