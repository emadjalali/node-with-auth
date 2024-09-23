import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { randomInt } from 'crypto';

import { User } from '../models/userModel.js';
import { Email } from '../models/emailModel.js';
import {
  verifyEmailByLinkHtml,
  verifyEmailByCodeHtml,
} from '../config/verifyEmailContent.js';

class AuthService {
  // Static variable to hold the singleton instance
  static instance;

  constructor() {
    if (AuthService.instance) {
      return AuthService.instance; // Return the existing instance if already created
    }

    // Save the instance
    AuthService.instance = this;
  }
  async register(userDetails) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userDetails.password, salt);
    userDetails.hashedPassword = hashedPassword;
    const user = new User(userDetails);
    const result = user.addUserToDb();
    return result;
  }

  async sendLinkToVerifyEmail(username, recipient) {
    const token = jwt.sign({ username, recipient }, process.env.JWT_SECRET, {
      expiresIn: '5m',
    });
    const email = new Email({
      recipients: [recipient],
      html: verifyEmailByLinkHtml(token),
      subject: 'Verify Your Email',
    });
    return email.sendEmail();
  }

  async sendCodeToVerifyEmail(username, recipient) {
    const verificationCode = randomInt(10000, 99999).toString();
    const token = jwt.sign(
      { username, recipient, verificationCode },
      process.env.JWT_SECRET,
      {
        expiresIn: '5m',
      },
    );
    const email = new Email({
      recipients: [recipient],
      html: verifyEmailByCodeHtml(verificationCode),
      subject: 'Verify Your Email',
    });
    await email.sendEmail();
    return token;
  }

  async verifyEmailByToken(token) {
    try {
      const { username, recipient } = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.getUserFromDb(username);
      if (user) {
        if (user.email !== recipient)
          throw new Error(
            'Error verifying email: you registered a different email',
          );

        if (user.emailVerified === 1)
          throw new Error('Email already verified!');

        user.setEmailVerified(1);
        return user.updateEmailVerifiedOnDb();
      }
    } catch (err) {
      throw new Error('Error verifying email: ' + err.message);
    }
  }

  async verifyEmailByCodeAndToken(code, token) {
    try {
      const { verificationCode, username, recipient } = jwt.verify(
        token,
        process.env.JWT_SECRET,
      );

      if (code === verificationCode) {
        const user = await User.getUserFromDb(username);
        if (user) {
          user.setEmailVerified(1);
          return user.updateEmailVerifiedOnDb();
        }
      } else throw new Error('Code is incorrect');
    } catch (err) {
      throw new Error('Error verifying email: ' + err.message);
    }
  }
}
export { AuthService };
