import { User } from "../models/User";
import bcrypt from "react-native-bcrypt";

export class UserFactory {
  static async createUser(email: string, password: string): Promise<User> {
    try {
      if (!validateEmail(email)) {
        console.log("invalid_email");
        alert("Email is invalid");
        throw new Error("Email is invalid");
      }
      const hashedPassword = await bcrypt.hashSync(password, 10);
      return new User(email, hashedPassword);
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
    function validateEmail(email: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  }
}