import { User } from "../models/User";
import bcrypt from "react-native-bcrypt";

export class UserFactory {
  static async createUser(
    email: string,
    password: string,
    name: string
  ): Promise<User> {
    try {
      if (!validateEmail(email)) {
        console.log("invalid_email");
        alert("Email is invalid");
        throw new Error("Email is invalid");
      }

      if (!name) {
        console.log("empty_name");
        alert("Name is empty");
        throw new Error("Name is empty");
      }

      const hashedPassword = await bcrypt.hashSync(password, 10);
      return new User(email, hashedPassword,name);
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
