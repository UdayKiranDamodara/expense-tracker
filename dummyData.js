export const data = {
  entities: {
    users: [
      { id: 1, name: 'Uday' },
      { id: 2, name: 'Nitin' },
    ],
    orgs: [
      { id: 1, name: 'HDFC' },
      { id: 2, name: 'Rapido' },
      { id: 3, name: 'HDFC' },
      { id: 4, name: 'Rapido' },
      { id: 5, name: 'HDFC' },
      { id: 6, name: 'Rapido' },
      { id: 7, name: 'HDFC' },
      { id: 8, name: 'Rapido' },
      { id: 9, name: 'HDFC' },
      { id: 10, name: 'Rapido' },
    ],
  },
  categories: [
    { id: 1, name: 'Food' },
    { id: 2, name: 'Travel' },
  ],
  transactions: {
    expense: [
      {
        id: '1',
        source: 'Swiggy',
        category: 'Food',
        amount: 1000,
        date: Date(),
        description: 'Biriyani',
      },
    ],
    income: [
      {
        id: '2',
        source: 'ClearTax',
        category: 'Salary',
        amount: 100000,
        date: Date(),
        description: 'Salary',
      },
    ],
  },
}
