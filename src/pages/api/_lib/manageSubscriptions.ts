import { fauna } from "../../../services/fauna"
import { query as q } from "faunadb"
import { stripe } from "../../../services/stripe"

interface subscriptionData {
  id: string
  userId: object,
  status: string,
  price_id: string
}

const seachUserByCutomerIdAndReturnRefFild = async (customerId: string) => {
  // Retorna apenas o campo "ref"
  return await fauna.query(
    q.Select(
      'ref',
      q.Get(
        q.Match(
          q.Index('user_by_stripe_cutomer_id'),
          customerId
        )
      )
    )
   )
}

const createSubscription = async (subscriptionData:subscriptionData) => {
  await fauna.query(
    q.Create(
      q.Collection('subscriptions'),
      { data: subscriptionData }
    )
   )
}

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
) {
   // Buscar o usuário no banco do FaunaDB com o ID {customerId}
   // Salvar os dados da subscription no FaunaDB

   const userRef = await seachUserByCutomerIdAndReturnRefFild(customerId)

   // Todos os dados da inscrição
   const subscription = await stripe.subscriptions.retrieve(subscriptionId)

   const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id
   }

   createSubscription(subscriptionData)
}