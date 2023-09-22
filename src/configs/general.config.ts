import 'dotenv/config'

type Env = {
  NODE_ENV?: string
  MONGO_URI?: string
  MONGO_USER?: string
  MONGO_PASS?: string
  HOST?: string
  PORT?: number
  CONTEXT_PATH?: string
  JWT_SECRET?: string
  FB_APP_ID?: string
  FB_APP_SECRET?: string
}

type Config = Readonly<Required<Env>>

const env: Env = {
  NODE_ENV: process.env.NODE_ENV,

  MONGO_URI: process.env.MONGO_URI,
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASS: process.env.MONGO_PASS,

  HOST: process.env.HOST || 'localhost',
  PORT: Number(process.env.PORT) || 3000,
  CONTEXT_PATH: process.env.CONTEXT_PATH || '',

  JWT_SECRET: process.env.JWT_SECRET,

  FB_APP_ID: process.env.FB_APP_ID,
  FB_APP_SECRET: process.env.FB_APP_ID
}

const getConfig = (env: Env): Config => {
  Object.entries(env).forEach(([key, value]) => {
    if (value === undefined) {
      throw new Error(`Missing config: ${key}`)
    }
  })
  return env as Config
}

const config = getConfig(env)
export default config
