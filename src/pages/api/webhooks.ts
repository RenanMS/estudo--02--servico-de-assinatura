import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from 'stream';
import Stripe from "stripe";
import { stripe } from "../../services/stripe";
import { saveSubscription } from "./_lib/manageSubscriptions";

async function buffer(readable: Readable) {
  const chunks = new Array
  
  for await (const chunk of readable) {
    chunks.push(
      typeof chunk === "string" ? Buffer.from(chunk) : chunk
    )
  }
  
  return Buffer.concat(chunks)
}

export const config = {
  api: {
    bodyParser: false
  }
}

// Eventos monitorados
const relevantEvents =  new Set([
  'checkout.session.completed'
])

export default async (req: NextApiRequest, res: NextApiResponse) => {

  if(req.method === 'POST') {
    const buf = await buffer(req)

    // Recebe o código de segurança
    const secret = req.headers['stripe-signature']

    // Envento de validação do stripe
    // Isso é uma tipagem genérica do stripe
    let event: Stripe.Event

    // Executa a validação
    try {
      event = stripe.webhooks.constructEvent(buf, secret!, process.env.STRIPE_WEBHOOK_SECRET!)
    } catch (err) {
      return res.status(400).send(`Webhook error: ${err}`)
    }

    const { type } = event

    if(relevantEvents.has(type)) {
      // Tipagem relacionada a seção
      const checkoutSession = event.data.object as Stripe.Checkout.Session

      try {
        switch(type) {
          case 'checkout.session.completed':

            await saveSubscription(
              `${checkoutSession.subscription}`,
              `${checkoutSession.customer}`
            )

            break

          default:
            throw new Error('Erro não tratado')
        }
      } catch (err) {
        return res.json( { error: 'Falha no Webhook'})
      }
    }

    res.json({received: true})
  }
  else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed') 
  }
}