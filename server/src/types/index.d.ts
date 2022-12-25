declare global {
  module "express-session" {
    interface SessionData {
      user: number;
      sellerID: number;
    }
  }
}
