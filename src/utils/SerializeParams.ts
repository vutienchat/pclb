const SerializeParams = (params: Record<string, any>): string => {
  const keyValues = []

  for (const key in params) {
    if (params[key] !== null && params[key] !== undefined) {
      keyValues.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    }
  }

  return keyValues.join('&')
}

export default SerializeParams
