import { Text, View } from 'react-native'
import PrimaryButton from '../components/ui/atoms/PrimaryButton'
import { useLayoutEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'

const HomeScreen = ({ navigation }) => {
  const isFocused = useIsFocused()
  useLayoutEffect(() => {
    if (isFocused) {
      navigation.getParent().setOptions({
        headerStyle: {
          backgroundColor: 'blue',
        },
        headerTintColor: 'white',
      })
    }
  }, [isFocused])
  return (
    <View>
      <Text>HomeScreen</Text>
      <PrimaryButton
        onPress={() => {
          navigation.navigate('AddExpenseScreen')
        }}
      >
        Add Expense
      </PrimaryButton>
    </View>
  )
}

export default HomeScreen
