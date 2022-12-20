declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_END_POINT: string;
      SMTP_USERNAME: string;
      SMTP_PASSWORD: string;
      SESSION_SECRET: string;
      DB_HOST: string;
      DB_NAME: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
    }
  }
}

export {}
