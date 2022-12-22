declare global {
  module "express-session" {
    interface SessionData {
      user: number;
    }
  }
}
