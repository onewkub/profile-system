import passport from 'passport'
import {
    Strategy as JwtStrategy,
    ExtractJwt,
    StrategyOptions as JwtStrategyOption,
} from 'passport-jwt'

const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET' as string


const opts: JwtStrategyOption = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
}
passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        done(null, jwt_payload)
    })
)

export default passport
