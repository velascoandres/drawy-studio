import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { env } from '@/env.js'

import * as schema from './schema'

export const connection = postgres(env.DATABASE_URL)

export const db = drizzle(connection, { schema })
