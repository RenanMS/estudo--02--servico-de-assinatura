import { query as q } from "faunadb";

import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { fauna } from "../../../services/fauna";

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: `${process.env.GITHUB_ID}`,
      clientSecret: `${process.env.GITHUB_SECRET}`
    }),
    // adiciona aqui mais provedores
  ],
  callbacks: {
    async session({ session }) {
     try {
      const userActiveSubscription = await fauna.query(
        q.Get(
          // Intersection retorna apenas se acotecer os dois Metch
          // 1 - A assinatura deve ter a referência do usuário
          // 2 - A assinatura deve estar com status active
          q.Intersection([
            q.Match( 
              q.Index('subscription_by_user_ref'), // Busque neste index
              q.Select( // A assinatura com esse ref.
                'ref', // Retorne apenas o ref
                q.Get(
                  q.Match(
                    // Busque pelo e-mail neste index os dados do usuário
                    q.Index('user_by_email'),
                    q.Casefold(`${session.user?.email}`)
                  )
                )
              )
            ),
            q.Match(
              q.Index('subscription_by_status'),
              'active'
            )
          ])
        )
      )

      return {
        ...session,
        activeSubscription: userActiveSubscription
      }
     } catch {
      return {
        ...session,
        activeSubscription: null
      }
     }
    },
    async signIn({user, account, profile }) {
      let { email } = user

      // trycatch: Login realizado prossiga para o fauna

      try {
        await fauna.query(
          q.If( // Se
            q.Not( // Não
              q.Exists( // Existe
                q.Match( // Combinação
                  q.Index('user_by_email'), // No index
                  q.Casefold(`${email}`) // Com este email faça o Create
                )
              )
            ),
            q.Create( // Criar registro
              q.Collection('users'), // Na coleção
              { data: { email }} // Com estes dados
            ),
            // Else
            // Neste caso o else chama o método Get, poderia ser outro
            // O objetivo é resgatar o e-mail se usuário já está cadastrado
            q.Get( 
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(`${email}`)
              )
            )
          )
        )

        return true
      } catch (error) {
        return false 
      }
    },
  }
})