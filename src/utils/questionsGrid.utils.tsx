export const fetchDifficultyColourCoding = (cell: any) => ({
  'text-white': cell.column.id !== 'difficulty',
  'text-difficulty-easy':
    cell.column.id === 'difficulty' && cell.value.trim() === 'Easy',
  'text-difficulty-medium':
    cell.column.id === 'difficulty' && cell.value.trim() === 'Medium',
  'text-difficulty-hard':
    cell.column.id === 'difficulty' && cell.value.trim() === 'Hard',
});
