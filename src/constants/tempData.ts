export const mockTask =
  Array(10).fill(0).map((_, index) => ({
    name: 'a',
    description: `Task ${index + 1}`,
    valueType: (getRandomNumber() % 2),
    mainTaskId: getRandomNumber(1, 3),
    value: ''
  })).sort((a, b) => a.mainTaskId - b.mainTaskId)

function getRandomNumber(min: number = 0, max: number = 1): number {
  return Math.round((Math.random() * (max - min + 1) + min))
}