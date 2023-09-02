import { registerAs } from '@nestjs/config';

export const AppConfig = registerAs('app', () => {
  console.log(process.env.PORT);
  return {
    port: process.env.PORT || 9000,
  };
});
