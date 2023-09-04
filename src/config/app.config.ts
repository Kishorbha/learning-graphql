import { registerAs } from '@nestjs/config';

export const AppConfig = registerAs('app', () => {
  console.log(process.env.PORT);
  return {
    port: process.env.PORT || 9000,
    databaseUri: process.env.DATABASE_URI,
    accessSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshSecret: process.env.REFRESH_TOKEN_SECRET,
    accessExpiry: process.env.ACCESS_TOKEN_EXPIRY,
    refreshExpiry: process.env.REFRESH_TOKEN_EXPIRY,
    otpExpiry: process.env.OTP_TOKEN_EXPIRY,
    passwordSalt: process.env.PASSWORD_SALT,
    refreshSalt: process.env.REFRESH_SALT,
  };
});
