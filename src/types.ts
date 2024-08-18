import { User } from '@auth0/auth0-react'

export type CustomUser = User & { hasThis: boolean }
