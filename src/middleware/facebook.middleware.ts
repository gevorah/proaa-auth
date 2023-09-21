import passport from 'passport'
import FacebookTokenStrategy from 'passport-facebook-token'

import config from '../configs/general.config'
import User from '../models/user.model'

const { FB_APP_ID, FB_APP_SECRET } = config

const facebookTokenStrategy = new FacebookTokenStrategy(
  {
    clientID: FB_APP_ID,
    clientSecret: FB_APP_SECRET
  },
  async (accessToken, refreshToken, profile, done) => {
    const user = await User.findOne({ _id: profile.id })
    if (!user) {
      await User.create({
        _id: profile.id,
        name: profile.name,
        email: profile.emails?.at(0),
        provider: profile.provider
      })
      return done(null, { token: accessToken })
    } else {
      return done(null, { token: accessToken })
    }
  }
)

passport.use(facebookTokenStrategy)

const facebookAuth = passport.authenticate('facebook-token')

export { facebookAuth }
