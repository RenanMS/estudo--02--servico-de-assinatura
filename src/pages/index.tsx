import Head from 'next/head'
import { FaHandSpock } from 'react-icons/fa'
import { SubscribeButton } from '../components/SubscribeButton'
import styles from './index.module.scss'

export default function Home() {
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
            <span> por R$ 9,90 mensal</span>
          </p>

          <SubscribeButton />

        </section>

        <img src="/images/avatar.svg" alt="Garota programando" />
      </main>
    </>
  )
}