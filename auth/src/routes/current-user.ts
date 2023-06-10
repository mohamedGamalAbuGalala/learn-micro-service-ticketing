import { currentUser } from "@galala-study/gitix-common";
import express from "express";

const router = express.Router();

router.get("/api/users/currentUser", currentUser, (req, res) => {
  return res.send({
    currentUser: req.currentUser || null,
  });
});

export { router as currentUserRouter };
