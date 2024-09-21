import { UserRepository } from '../repositories/userRepository.js';
import { User } from '../models/userModel.js';
import bcrypt from 'bcrypt';

class AuthService {
  // Static variable to hold the singleton instance
  static instance;

  constructor() {
    if (AuthService.instance) {
      return AuthService.instance; // Return the existing instance if already created
    }

    this.userRepository = new UserRepository();

    // Save the instance
    AuthService.instance = this;
  }
  async register(userDetails) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userDetails.password, salt);
    userDetails.hashedPassword = hashedPassword;
    const user = new User(userDetails);
    const result = await this.userRepository.addUser(user.userDetails);
    return result;
  }
}
export { AuthService };
