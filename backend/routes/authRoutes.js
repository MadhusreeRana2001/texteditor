import express from 'express';
import passport from 'passport';


const router = express.Router();

router.get("/google/login",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: "login"
  })
);

router.get("/google/signup",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: "signup"
  })
);

router.get("/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.FRONTEND_URL,
    session: false
  }),
  async (req, res) => {
    if (!req.user) {
      return res.redirect(process.env.FRONTEND_URL);
    }
    else {
      if (req.query.state === "login") {
        req.login(req.user, (err) => {
          if (err) return res.redirect(process.env.FRONTEND_URL);
          return res.redirect(`${process.env.FRONTEND_URL}/text-editor`);
        });
      }
      else {
        return res.redirect(`${process.env.FRONTEND_URL}/text-editor`);
      }
    }
  }
);

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect(process.env.FRONTEND_URL);
  });
});

router.get("/user", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.json(null);
  }
});

export default router;