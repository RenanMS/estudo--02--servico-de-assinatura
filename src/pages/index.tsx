import { GetServerSideProps } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import { FaHandSpock } from 'react-icons/fa'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'
import { centsToReal } from '../util/moeda'
import styles from './index.module.scss'
interface HomeProps {
  product: {
    priceId: string,
    amount: string,
  }
}

export default function Home({ product }: HomeProps) {
  const { data: session, status } = useSession()

  return (
    <>
      <Head>
        <title>Início | igNews - Serviço de assinatura</title>
      </Head>
      
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>
            <FaHandSpock color="#eba417" className={styles.FaHandSpock}/> 
            Olá, seja bem vindo
          </span>

          <h1>Notícias sobre <span>React</span></h1>

          {
            !session?.activeSubscription ?
              <p> 
                Tenha acesso a todas as publicações <br />
                <span> por {product.amount} mensal</span>
              </p> :
              <p> 
                Aproveite as publicações
              </p>
          }

          <SubscribeButton priceId={product.priceId} />

        </section>

        <img src="/images/avatar.svg" alt="Garota programando" />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {

  const price = await stripe.prices.retrieve('price_1LDBgMDYhCa7uAT8c0UbbUyH', {
    expand: ['product']
  })

  // REVIEW Forçamos price.unit_amount existir

  const product = {
    priceId: price.id,
    amount: centsToReal(price.unit_amount!),
  }

  const timeRevalidate = 60 * 60 * 24
  // 60 segundos * 60 minutos * 24 horas

  return {
    props: {
      product
    },
  }
}