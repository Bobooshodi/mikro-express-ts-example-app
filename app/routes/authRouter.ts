import Router from "express-promise-router";
import passport from 'passport';
import { sign } from 'jsonwebtoken';
import { omit } from 'lodash';
import { signUp } from "../controllers";

const router = Router();

router.post('/signup', signUp);

router.post(
    '/login',
    async (req, res, next) => {
        passport.authenticate(
            'login',
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        const error = new Error(info.message);
                        return next(error);
                    }

                    req.login(
                        user,
                        { session: false },
                        async (error) => {
                            if (error) return next(error);

                            const body = { _id: user._id, email: user.email };
                            const token = sign({ user: body }, 'secret');
                            const userObj = { ...user, fullName: user.fullName, token }

                            return res.json(omit(userObj, 'password'));
                        }
                    );
                } catch (error) {
                    return next(error);
                }
            }
        )(req, res, next);
    }
);

export const AuthRouter = router;