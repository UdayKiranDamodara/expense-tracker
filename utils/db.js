import { fetchAllCategories } from '../DB/categories'
import { fetchAllSources } from '../DB/entities'
import { fetchAllModes } from '../DB/modes'
import { fetchAllTransactions } from '../DB/transactions'

export const fetchAllData = async () => {
  const transactions = await fetchAllTransactions()
  const entities = await fetchAllSources()
  const categories = await fetchAllCategories()
  const modes = await fetchAllModes()
  console.log({ transactions, entities, categories, modes })
  return { transactions, entities, categories, modes }
}
