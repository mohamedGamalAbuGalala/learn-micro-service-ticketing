import { scryptSync, randomBytes } from "crypto";

export class Password {
  static toHash(password: string) {
    const salt = randomBytes(16).toString("hex");
    const buf = scryptSync(password, salt, 64);

    return `${buf.toString("hex")}.${salt}`;
  }

  static compare(
    storedPassword: string,
    suppliedPassword: string
  ) {
    const [hashedPassword, salt] =
      storedPassword.split(".");
    const buf = scryptSync(
      suppliedPassword,
      salt,
      64
    );

    return buf.toString("hex") === hashedPassword;
  }
}
