import Head from 'next/head'

import styles from '../styles/home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | igNews - Serviço de assinatura</title>
      </Head>
      
      <h1 className={styles.h1}>Limpando <span>estrutura</span></h1>
    </>
  )
}