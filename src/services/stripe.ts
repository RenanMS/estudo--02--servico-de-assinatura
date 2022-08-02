import Stripe from 'stripe'
import pk from '../../package.json'

// REVIEW Forçamos process.env.STRIPE_SECRET_KEY! existir

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2020-08-27',
    appInfo: {
      name: 'Ignews',
      version: pk.version
    },
  }
)