import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { api } from '../../services/api'
import { getStripeJs } from '../../services/stripe-js'
import styles from './styles.module.scss'

interface SubscribeButtonProps {
  priceId: string
}

export const SubscribeButton = ({ priceId }: SubscribeButtonProps) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  async function redirectPost() {
    router.push('/posts')
  }

  async function handleSubscribe() {
    if(status !== 'authenticated') {
      signIn('github')
      return
    }

    try {
      const res = await api.post('/subscribe')

      const { stripeSessionId } = res.data

      const stripe = await getStripeJs()

      await stripe?.redirectToCheckout({ sessionId: stripeSessionId })

    } catch (err) {
      alert(err)
    }

  }

  return session?.activeSubscription === undefined ? (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Inscrever-se
    </button>
  ) : (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={redirectPost}
    >
      Ver postagens
    </button>
  )
}