type ISortByParameters = {
  a: string | number
  b: string | number
}

export const splitString = (line: string) =>
  line.split('/')[1].split('-').filter(item => isNaN(+item[0])).join(' ')

export const firstLetterToUpperCase = (word: string) =>
  word.split('').map(((letter, index) => index === 0 ? letter.toUpperCase() : letter)).join('')


export const sortStringOrNumber = ({ a, b }: ISortByParameters) => {
  let result = 0

  switch (`${typeof a} ${typeof b}`) {
    case 'string string': {

      if (a < b) {
        result = -1
      }

      if (a > b) {
        result = 1
      }

      return result
    }

    case 'number number': {

      if (typeof a === 'number' && typeof b === 'number') {
        result = a - b
      }

      return result
    }

    default:

      return result
  }
}