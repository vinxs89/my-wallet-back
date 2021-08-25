import { Router, Response } from "express";
import { check, validationResult } from "express-validator";
import HttpStatusCodes from "http-status-codes";
import { AccountRepository, UserRepository } from "../../../config/Repositories";

import auth from "../../middleware/auth";
import Request from "../../types/Request";
import { Profile } from "../../models/Profile";
import { User } from "../../models/User";

const router: Router = Router();

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get("/me", auth, async (req: Request, res: Response) => {
  try {
    const profile: Profile = await UserRepository.getUserProfile(req.userId);

    if (!profile) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        errors: [
          {
            msg: "There is no profile for this user",
          },
        ],
      });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

// @route   POST api/profile
// @desc    Create or update user's profile
// @access  Private
router.post(
  "/",
  [
    auth,
    check("firstName", "First Name is required").not().isEmpty(),
    check("lastName", "Last Name is required").not().isEmpty(),
    check("username", "Username is required").not().isEmpty(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    const { firstName, lastName, username } = req.body;

    // Build profile object based on IProfile
    const profileFields = {
      user: req.userId,
      firstName,
      lastName,
      username,
    };

    try {
      let user: User = await UserRepository.getUserById(req.userId);

      if (!user) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            {
              msg: "User not registered",
            },
          ],
        });
      }

      let profile: Profile = await UserRepository.getUserProfile(req.userId);
      if (profile) {
        // Update
        profile = await UserRepository.updateProfile(req.userId, profileFields);
        return res.json(profile);
      } else {
        // Create
        profile = await UserRepository.createProfile(profileFields);
        res.json(profile);
      }
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
);

// @route   DELETE api/profile
// @desc    Delete profile and user
// @access  Private
router.delete("/", auth, async (req: Request, res: Response) => {
  try {
    await AccountRepository.deleteAllAccountsForUser(req.userId);
    await UserRepository.deleteUser(req.userId);
    res.json({ msg: "User removed" });
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

export default router;
