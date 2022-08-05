import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {

  const products = [
    { id: 1, code: 1010, description: 'Chocodelate' },
    { id: 2, code: 2020, description: 'Leite' },
    { id: 3, code: 3030, description: 'Banana' }
  ]

  return req.query.params
    ? res.json(products.filter(product => product.code === +req.query.params![0]))
    : res.json(products)
}