import { User } from "../models/User";
import bcrypt from "bcrypt";

export class UserFactory {
  static async createUser(email: string, password: string) {
    if (!validateEmail(email)) {
      console.log("invalid_email");
      alert("Email is invalid");
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    return new User(email,hashedPassword);

    function validateEmail(email: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  }
}
