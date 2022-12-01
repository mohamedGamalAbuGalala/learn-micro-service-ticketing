import express from "express";
import {
  body,
  validationResult,
} from "express-validator";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/bad-request-error";
import { RequestValidationError } from "../errors/request-validation-error";
import { User } from "../models/User";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Email must be valid"),
    body("password")
      .isLength({ min: 4, max: 20 })
      .withMessage(
        "Password must be between 4 and 20 characters"
      ),
  ],
  async (
    req: express.Request,
    res: express.Response
  ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(
        errors.array()
      );
    }

    const { email, password } = req.body;

    const existingUser = await User.exists({
      email,
    });

    if (existingUser) {
      throw new BadRequestError(
        "Email already exists"
      );
    }

    console.log("creating a new user");

    const user = User.build({ email, password });
    await user.save();

    // Generate JWT token
    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      "asdf"
    );

    // Store JWT in session
    req.session = { jwt: userJwt };

    return res.status(201).send(user);
  }
);

export { router as signupRouter };
