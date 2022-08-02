import { GetStaticProps } from 'next'
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

          <p>
            Tenha acesso a todas as publicações <br />
            <span> por {product.amount} mensal</span>
          </p>

          <SubscribeButton priceId={product.priceId} />

        </section>

        <img src="/images/avatar.svg" alt="Garota programando" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
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
    revalidate: timeRevalidate,
  }
}