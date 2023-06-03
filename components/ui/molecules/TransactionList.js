import { Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Transaction from './Transaction'

const TransactionList = ({ data, type, onClickItem }) => {
  return (
    <FlatList
      data={data}
      renderItem={(item) => (
        <Transaction type={type} data={item.item} onClick={onClickItem} />
      )}
      keyExtractor={(item) => item.id}
    />
  )
}

export default TransactionList
