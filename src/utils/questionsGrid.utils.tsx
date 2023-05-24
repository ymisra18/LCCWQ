export const fetchDifficultyColourCoding = (cell: any) => ({
  'text-white': cell.column.id !== 'difficulty',
  'text-difficulty-easy':
    cell.column.id === 'difficulty' && cell.value.trim() === 'Easy',
  'text-difficulty-medium':
    cell.column.id === 'difficulty' && cell.value.trim() === 'Medium',
  'text-difficulty-hard':
    cell.column.id === 'difficulty' && cell.value.trim() === 'Hard',
});

interface CompanyFrequency {
  company_name: string;
  totalFrequency: number;
}

interface Data {
  name: string;
  link: string;
  difficulty: string;
  companies: { company_name: string; freq: number | null }[];
}

export const calculateCompanyFrequency = (arr: Data[]): CompanyFrequency[] => {
  const companyFrequencyMap: { [key: string]: number } = {};

  arr.forEach((obj) => {
    const { companies } = obj;

    companies.forEach((company) => {
      const { company_name } = company;

      if (companyFrequencyMap.hasOwnProperty(company_name)) {
        companyFrequencyMap[company_name]++;
      } else {
        companyFrequencyMap[company_name] = 1;
      }
    });
  });

  const companyFrequency: CompanyFrequency[] = Object.entries(
    companyFrequencyMap
  ).map(([company_name, totalFrequency]) => ({
    company_name,
    totalFrequency,
  }));

  return companyFrequency;
};
