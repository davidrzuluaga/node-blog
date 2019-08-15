const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('./auth');
import Users from '../models/Users';

router.get('/test', auth.required, (req, res) => {
  res.status(200).json({
    message: 'Welcome user test',
  });
});

router.post('/', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }
  
  async function registerUser() {
    let userexist = await Users.findOne({email: user.email})
    
    if (!userexist) {
      const finalUser = new Users(user);
  
      finalUser.setPassword(user.password);
  
      return finalUser
      .save()
      .then(() => res.json({ user: finalUser.toAuthJSON() }))
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: 'Server error. Please try again.',
          error: error.message,
        });
      });
    } else {
      res.status(402).json({
        errors: {
          email: 'Email is in use',
        },
      });
    }
  }
  registerUser()

});

router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return res.status(401).json({status: "wrong credentials"});
  })(req, res, next);
});

router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;