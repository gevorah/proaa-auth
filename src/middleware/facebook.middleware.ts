import passport from 'passport'
import FacebookTokenStrategy, { type Profile } from 'passport-facebook-token'

import config from '../configs/general.config'
import User from '../models/user.model'

const { FB_APP_ID, FB_APP_SECRET } = config

const verify = async (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: (error: any, user?: any, info?: any) => void
) => {
  let user = await User.findOne({ _id: profile.id })
  if (!user) {
    user = await User.create({
      _id: profile.id,
      name: profile.displayName,
      email: profile.emails?.at(0)?.value,
      provider: profile.provider
    })
  }
  return done(null, user)
}

const facebookTokenStrategy = new FacebookTokenStrategy(
  {
    clientID: FB_APP_ID,
    clientSecret: FB_APP_SECRET,
    enableProof: false,
    fbGraphVersion: 'v18.0'
  },
  verify
)

passport.use(facebookTokenStrategy)

const facebookAuth = passport.authenticate('facebook-token', { session: false })

export { facebookAuth }
