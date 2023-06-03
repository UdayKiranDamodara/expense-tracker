import { Text, View, StyleSheet, Pressable, Alert } from 'react-native'
import { GlobalStyles } from '../../../constants/styles'

const Transaction = ({ type, data, onClick }) => {
  const backgroundColor =
    type === 'EXPENSE'
      ? GlobalStyles.colors.expense.secondary
      : GlobalStyles.colors.income.secondary

  const day = String(data.date.getDate()).padStart(2, '0')
  const month = String(data.date.getMonth() + 1).padStart(2, '0')
  const year = String(data.date.getFullYear())

  const handleClick = () => {
    Alert.alert(
      `Edit the transaction?`,
      '',
      [
        {
          text: 'Yes',
          onPress: onClick,
        },
      ],
      { cancelable: true }
    )
  }
  return (
    <View style={[styles.outerContainer, { backgroundColor: backgroundColor }]}>
      <Pressable onPress={handleClick}>
        <View style={styles.row}>
          <View>
            <Text style={styles.text}>{data.source}</Text>
          </View>
          <Text style={styles.text}>{data.amount}</Text>
        </View>
        <View style={styles.row}>
          <View>
            <Text style={styles.text}>{data.category}</Text>
          </View>
          <Text style={styles.text}>{`${day}-${month}-${year}`}</Text>
          {/* <Text style={styles.text}>{data.date.toISOString()}</Text> */}
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    marginHorizontal: 8,
    marginVertical: 4,
    backgroundColor: GlobalStyles.colors.expense.secondary,
    borderWidth: 1.5,
    borderRadius: 8,
    borderColor: 'black',
    overflow: 'hidden',
  },
  innerContainer: {
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    // backgroundColor: GlobalStyles.colors.expense.secondary,
  },
  text: {
    color: 'white',
  },
})

export default Transaction
