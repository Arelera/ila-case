import { User } from '@auth0/auth0-react'

export type CustomUser = User & { hasThis: boolean }

export type Product = {
  id: number
  title: string
  price: number | string
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}
