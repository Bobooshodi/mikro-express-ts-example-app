import passport from 'passport';
import { ExtractJwt, Strategy as JWTstrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

import { DI } from '../server';
import { User } from '../entities';
import {Request, Response} from "express";

export const signUp = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body
    if (!firstName || !lastName || !email || !password) {
        res.status(400);
        return res.json({ message: 'One of `firstName, lastName, email, password` is missing' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const createdUser = DI.em.create(User, { ...req.body, password: hashedPassword });
        await DI.pageRepository.persist(createdUser).flush();

        res.json(createdUser);
    } catch (e: any) {
        return res.status(400).json({ message: e.message });
    }
};

passport.use(
    'login',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await DI.userRepository.findOne({ email });

                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }

                const validate = await bcrypt.compare(password, user.password);

                if (!validate) {
                    return done(null, false, { message: 'Wrong Password' });
                }

                return done(null, user, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use(
    new JWTstrategy(
        {
            secretOrKey: 'secret',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);