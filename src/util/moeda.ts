// REVIEW Criar o um regex que validar o formato do retorno

export const centsToReal = (value: number):string => {

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value / 100)
}