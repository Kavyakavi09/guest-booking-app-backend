import Owner from '../models/Owner.js';
import bcrypt from 'bcrypt';
import { createError } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
  try {
    const user = await Owner.findOne({ email: req.body.email });
    if (user) return next(createError(401, 'User Already Exist'));

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new Owner({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send('User has been created.');
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await Owner.findOne({ email: req.body.email });
    if (!user) return next(createError(404, 'Invalid Credentials'));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, 'Invalid Credentials'));

    const token = jwt.sign(
      { id: user._id, isOwner: user.isOwner },
      process.env.JWT
    );

    const { password, isOwner, ...otherDetails } = user._doc;
    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isOwner, token: token });
  } catch (err) {
    next(err);
  }
};
