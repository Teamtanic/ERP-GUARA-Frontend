export function codeMask(code: string) {
  if (code.length === 11) {
    return code
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  }

  if (code.length === 14) {
    return code
      .replace(/\D+/g, '') // não deixa ser digitado nenhuma letra
      .replace(/(\d{2})(\d)/, '$1.$2') // captura 2 grupos de número o primeiro com 2 digitos e o segundo de com 3 digitos, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de número
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2') // captura 2 grupos de número o primeiro e o segundo com 3 digitos, separados por /
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') // captura os dois últimos 2 números, com um - antes dos dois números
  }

  return ''
}

export function formatUUID(inputString: string) {
  if (inputString.length === 36) {
    const startChars = inputString.slice(0, 5)
    const endChars = inputString.slice(-5)
    return `${startChars}...${endChars}`
  } else {
    return inputString
  }
}

export function formatPhoneNumber(phoneNumber: string) {
  if (phoneNumber.length === 10) {
    return phoneNumber
      .replace(/\D/g, '') // Remove caracteres não numéricos
      .replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3') // Formato para telefone (10 dígitos)
  } else if (phoneNumber.length === 11) {
    return phoneNumber
      .replace(/\D/g, '') // Remove caracteres não numéricos
      .replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') // Formato para celular (11 dígitos)
  } else {
    return phoneNumber
  }
}

export function amountMask(amount: number) {
  return `R$ ${amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
}

export function createUpdateObject<T extends Record<string, any>>(
  currentData: T,
  newData: Partial<T>
): Partial<T> {
  const updateObject: Partial<T> = {}

  Object.keys(newData).forEach(key => {
    if (currentData.hasOwnProperty(key) && currentData[key] !== newData[key]) {
      updateObject[key as keyof T] = newData[key]
    }
  })

  return updateObject
}
