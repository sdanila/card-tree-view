export const splitString = (line: string) =>
  line.split('/')[1].split('-').filter(item => isNaN(+item[0])).join(' ')

export const firstLetterToUpperCase = (word: string) =>
  word.split('').map(((letter, index) => index === 0 ? letter.toUpperCase() : letter)).join('')
