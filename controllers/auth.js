import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import { createError } from '../utils/error.js'

export const register = async (req, res, next) => {
    try {
        const { name, email, phone, password: input_password } = req.body

        if (!name || !email || !phone || !input_password) return next(createError(400, 'Make sure to provide all the fields'))
        if (!validator.isEmail(email)) return res.status(204).json({ message: `invalid email pattern.`, success: false })

        const findedUser = await User.findOne({ email })
        if (Boolean(findedUser)) return next(createError(400, 'User already exist'))

        const hashedPassword = await bcrypt.hash(input_password, 12)

        const role = email == process.env.ADMIN_EMAIL ? 'admin' : 'user'

        const result = await User.create({ name, email, phone, password: hashedPassword, role, })

        return res.status(200).json({ result, message: 'register successfully', success: true })

    }
    catch (error) {
        next(createError(400, error.message))
    }
}
export const login = async (req, res, next) => {
    try {

        const { email, password: plain_password } = req.body;
        if (!email || !plain_password) return next(createError(400, 'Make sure to provide all the fields.'))

        const emailValidationFailed = !validator.isEmail(email)
        if (emailValidationFailed) return next(createError(400, 'Invalid Email Pattern'))

        var findedUser = await User.findOne({ email })
        if (!Boolean(findedUser)) return next(createError(400, 'User not exist'))

        const hashedPassword = findedUser.password
        const isPasswordCorrect = await bcrypt.compare(plain_password, hashedPassword)
        if (!isPasswordCorrect) return next(createError(400, 'Password Incorrect'))


 const token = jwt.sign({ _id: findedUser._id, role: findedUser.role }, process.env.JWT_SECRET,{ expiresIn: '2m' })
 const refreshToken = jwt.sign({ _id: findedUser._id, role: findedUser.role }, process.env.JWT_REFRESH_SECRET, { expiresIn: '2d' })
    res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days in milliseconds
        })
      
 const { password, ...others } = findedUser._doc
        return res.status(200).json({ result: { ...others, token }, message: 'login successfully', success: true })
    }
    catch (error) {
        next(createError(400, error.message))
    }
}

export const refreshToken = (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: 'Refresh token missing' });

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid refresh token' });

        const newAccessToken = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2m' });

        return res.status(200).json({ token: newAccessToken });
    });
};
