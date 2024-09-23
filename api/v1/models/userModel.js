import { UserRepository } from '../repositories/userRepository.js';
const USERROLE = Object.freeze({
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
});
const USERNAMEFORMAT = Object.freeze({
  EMAIL: 'email',
  PHONE: 'phone',
  NONE: 'none',
});
const STATUS = Object.freeze({
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
});
class User {
  #userId;
  #username;
  #hashedPassword;
  #email;
  #phone;
  #usernameFormat;
  #firstName;
  #lastName;
  #avatarURL;
  #createdAt;
  #updatedAt;
  #lastLogin;
  #status;
  #emailVerified;
  #phoneVerified;
  #role;

  static #userRepository = new UserRepository();

  //username and hashedPassword are required fields
  constructor({
    userId,
    username,
    hashedPassword,
    email,
    phone,
    usernameFormat,
    firstName,
    lastName,
    avatarURL,
    createdAt,
    updatedAt,
    lastLogin,
    status,
    emailVerified,
    phoneVerified,
    role,
  }) {
    this.#userId = userId || null;
    this.#username = username;
    this.#hashedPassword = hashedPassword;
    this.#email = email || null;
    this.#phone = phone || null;
    this.#usernameFormat = usernameFormat
      ? this.setUsernameFormat(usernameFormat)
      : USERNAMEFORMAT.NONE;
    this.#firstName = firstName || null;
    this.#lastName = lastName || null;
    this.#avatarURL = avatarURL || null;
    this.#createdAt = createdAt || new Date();
    this.#updatedAt = updatedAt || null;
    this.#lastLogin = lastLogin || null;
    this.#status = status ? this.setStatus(status) : STATUS.ACTIVE;
    this.#emailVerified = emailVerified || 0;
    this.#phoneVerified = phoneVerified || 0;
    this.#role = role ? this.setRole(role) : USERROLE.USER;
  }

  get userDetails() {
    return {
      userId: this.#userId,
      username: this.#username,
      hashedPassword: this.#hashedPassword,
      email: this.#email,
      phone: this.#phone,
      usernameFormat: this.#usernameFormat,
      firstName: this.#firstName,
      lastName: this.#lastName,
      avatarURL: this.#avatarURL,
      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt,
      lastLogin: this.#lastLogin,
      status: this.#status,
      emailVerified: this.#emailVerified,
      phoneVerified: this.#phoneVerified,
      role: this.#role,
    };
  }

  get userId() {
    return this.#userId;
  }
  get username() {
    return this.#username;
  }
  get hashedPassword() {
    return this.#hashedPassword;
  }
  get email() {
    return this.#email;
  }
  get phone() {
    return this.#phone;
  }
  get usernameFormat() {
    return this.#usernameFormat;
  }

  get avatarURL() {
    return this.#avatarURL;
  }
  get firstName() {
    return this.#firstName;
  }
  get lastName() {
    return this.#lastName;
  }
  get createdAt() {
    return this.#createdAt;
  }
  get updatedAt() {
    return this.#updatedAt;
  }
  get lastLogin() {
    return this.#lastLogin;
  }
  get status() {
    return this.#status;
  }
  get emailVerified() {
    return this.#emailVerified;
  }
  get role() {
    return this.#role;
  }

  setUsernameFormat(usernameFormat) {
    if (!Object.values(USERNAMEFORMAT).includes(usernameFormat)) {
      throw new Error(`Invalid usernameFormat: ${usernameFormat}`);
    }
    return (this.#usernameFormat = usernameFormat);
  }
  setStatus(status) {
    if (!Object.values(STATUS).includes(status)) {
      throw new Error(`Invalid role: ${status}`);
    }
    return (this.#status = status);
  }

  setRole(role) {
    if (!Object.values(USERROLE).includes(role)) {
      throw new Error(`Invalid role: ${role}`);
    }
    return (this.#role = role);
  }

  setEmailVerified(value) {
    if (value === 1 || value === true) value = 1;
    else value = 0;
    return (this.#emailVerified = value);
  }

  static async getUserFromDb(username) {
    const userDetails = await User.#userRepository.findByUsername(username);
    return new User(userDetails);
  }

  addUserToDb() {
    return User.#userRepository.addUser(this.userDetails);
  }

  updateEmailVerifiedOnDb() {
    return User.#userRepository.updateEmailVerified(
      this.#username,
      this.#email,
      this.#emailVerified,
    );
  }
}

export { User };
