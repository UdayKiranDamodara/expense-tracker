import { Modal, View } from 'react-native'
import { GlobalStyles } from '../constants/styles'
import TransactionList from '../components/ui/molecules/TransactionList'
import { useLayoutEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import TransactionModal from '../components/ui/molecules/TransactionModal'

const { data } = require('../dummyData.js')

const ExpenseScreen = ({ navigation, route }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const isFocused = useIsFocused()
  useLayoutEffect(() => {
    if (isFocused) {
      navigation.getParent().setOptions({
        headerStyle: {
          backgroundColor: GlobalStyles.colors.expense.primary,
        },
        headerTintColor: 'white',
      })
    }
  }, [isFocused])
  const setModalVisible = () => {
    setIsModalVisible(true)
  }
  return (
    <View>
      <TransactionList
        data={data.transactions.expense}
        type='EXPENSE'
        onClickItem={setModalVisible}
      />
      <Modal visible={isModalVisible}>
        <TransactionModal />
      </Modal>
    </View>
  )
}

export default ExpenseScreen
