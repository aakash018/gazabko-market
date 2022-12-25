declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SERVER_END_POINT: string;
    }
  }
}

export {}
