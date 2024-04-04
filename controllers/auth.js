import User from "../models/auth.js";
import jwt from "jsonwebtoken";
import loginAttempt from "../models/loginAttempt.js";
import { mailAttempts3 } from "../Helpers/mailAttempts3.js";
import { mailBlockuser } from "../Helpers/mailBlockuser.js";

export const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      try {
        let newUser;
        if (password) {
          return res
            .status(404)
            .json({ message: "User not found. Please register." });
        } else {
          newUser = await User.create({ email });
        }
        const token = jwt.sign(
          {
            email: newUser.email,
            id: newUser._id,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({ result: newUser, token });
      } catch (error) {
        res.status(500).json({ mess: "something wents wrong..." });
      }
    }
    // existing user is there
    else {
      const token = jwt.sign(
        {
          email: existingUser.email,
          id: existingUser._id,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h",
        }
      );
      if (password) {
        const isblocked = await loginAttempt.findOne({ email });
        console.log(isblocked?.blocked);
        const onehour = 60 * 60 * 10000;
        const currentTime = Date.now();
        const timesinceblock = currentTime - isblocked?.blockTime;
        if (isblocked && isblocked?.blocked && timesinceblock < onehour) {
          return res
            .status(404)
            .json({ message: "User is blocked for 1 hours" });
        } else {
          if (isblocked?.blocked && timesinceblock >= onehour) {
            await loginAttempt.findByIdAndDelete({ email });
            console.log(
              "we hae deeleted the user after 1 hour form login attempt"
            );
          }
          console.log("we have the password ", password);
          if (existingUser.password === password) {
            res.status(200).json({ result: existingUser, token });
          }

          // if incorrect password..
          else {
            const attemptuser = await loginAttempt.findOne({ email });
            console.log("we found user in attempt db ", attemptuser?.email);
            if (attemptuser) {
              const attempts = attemptuser.failed + 1;
              console.log("attepts", attempts);

              const updatedattempt = await loginAttempt.findOneAndUpdate(
                {
                  email,
                },
                { failed: attempts },
                { new: true }
              );
              if (attempts === 3) {
                await mailAttempts3(email);
              }
              if (attempts === 5) {
                const blockuser = await loginAttempt.findOneAndUpdate(
                  { email },
                  { failed: attempts, blocked: true, blockTime: Date.now() },
                  { new: true }
                );
                await mailBlockuser(email);
              }
            } else {
              console.log("new user failed in login attempt ");
              const faileduser = await loginAttempt.create({
                email: email,
                failed: 1,
                blocked: false,
              });
              console.log("failed user is created in db as ", faileduser);
            }

            res.status(404).json({ message: "Invlid password..." });
          }
        }
      } else {
        res.status(200).json({ result: existingUser, token });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "something wents wrong..." });
  }
};
