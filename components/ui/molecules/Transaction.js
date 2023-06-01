import { Text, View, StyleSheet, Pressable } from 'react-native'
import { GlobalStyles } from '../../../constants/styles'

const Transaction = ({ type, data, backgroundColor = 'cyan' }) => {
  return (
    <View style={[styles.outerContainer, { backgroundColor: backgroundColor }]}>
      <Pressable>
        <View style={styles.row}>
          <View>
            <Text style={styles.text}>Source</Text>
          </View>
          <Text style={styles.text}>Amount</Text>
        </View>
        <View style={styles.row}>
          <View>
            <Text style={styles.text}>Category</Text>
          </View>
          <Text style={styles.text}>Date</Text>
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
