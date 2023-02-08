export const moveItemToFirstPosition = (array: any[], fromIndex: number) => {
  const element = array[fromIndex]

  array.splice(fromIndex, 1)
  array.splice(0, 0, element)

  return array
}
