import { NextApiRequest, NextApiResponse } from 'next'

export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    { id: 1, name: 'Lucas' },
    { id: 2, name: 'Renan' },
    { id: 3, name: 'Maria' }
  ]

  return response.json(users)
}