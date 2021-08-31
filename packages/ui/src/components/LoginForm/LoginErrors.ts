export class LoginError extends Error {
  constructor(name: string, message?: string) {
    super(message);
    this.name = name;
    if (message) {
      this.message = message;
    }
  }
}

export const LoginErrorTypes = {
  PASSWORDS_DONT_MATCH: `PASSWORDS_DONT_MATCH`,
  INCORRECT_CREDENTIALS: `INCORRECT_CREDENTIALS`,
  EMAIL_NOT_CONFIRMED: `EMAIL_NOT_CONFIRMED`,
};
