declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_END_POINT: string;
      GMAILSMPTPASSWORD: string;
    }
  }
}

export {}
