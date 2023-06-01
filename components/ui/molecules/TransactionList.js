import { Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Transaction from './Transaction'

const TransactionList = ({ data, itemBGColor = 'aqua' }) => {
  return (
    <FlatList
      data={data}
      renderItem={(item) => (
        <Transaction type='expense' data={item} backgroundColor={itemBGColor} />
      )}
      keyExtractor={(item) => item.id}
    />
  )
}

export default TransactionList
