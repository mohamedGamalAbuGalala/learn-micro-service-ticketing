import { BadRequestError, validateRequest } from "@galala-study/gitix-common";
import express from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { Password } from "../services/password";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password!"),
  ],
  validateRequest,
  async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (!existingUser) {
      throw new BadRequestError("Invalid credentials!");
    }

    const passwordMatch = Password.compare(existingUser.password, password);

    if (!passwordMatch) {
      throw new BadRequestError("Invalid credentials!");
    }

    // Generate JWT token
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    // Store JWT in session
    req.session = { jwt: userJwt };

    return res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
