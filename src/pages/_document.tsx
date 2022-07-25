import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins&family=Roboto:wght@700;900&display=swap" rel="stylesheet" />
        
        <title>igNews - Serviço de assinatura</title>
      </Head>
      <body>
        <Main /> {/* Todo conteúdo da aplicação */}
        <NextScript /> {/* Todo JS da aplicação */}
      </body>
    </Html>
  )
}