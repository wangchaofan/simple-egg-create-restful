export function upperHead (str) {
  return str[0].toUpperCase() + str.slice(1)
}

export function toCamel (str) {
  return str.split('-').map((item, index) => {
    if (index === 0) {
      return item
    }
    return upperHead(item)
  }).join('')
}