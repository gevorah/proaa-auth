import 'dotenv/config'

type Env = {
  MONGO_URI?: string
  MONGO_USER?: string
  MONGO_PASS?: string
  HOST?: string
  PORT?: number
  CONTEXT_PATH?: string
  JWT_SECRET?: string
}

type Config = Required<Env>

const env: Env = {
  MONGO_URI: process.env.MONGO_URI,
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASS: process.env.MONGO_PASS,

  HOST: process.env.HOST,
  PORT: Number(process.env.PORT) || 3000,
  CONTEXT_PATH: process.env.CONTEXT_PATH,

  JWT_SECRET: process.env.JWT_SECRET
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
