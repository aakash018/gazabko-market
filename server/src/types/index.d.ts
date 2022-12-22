declare global {
  module "express-session" {
    interface SessionData {
      user: string;
    }
  }
}
