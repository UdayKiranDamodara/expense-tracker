import { StyleSheet, View, Text } from 'react-native'
const Heading = ({ text, style = null, textStyle = null }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 4,
    backgroundColor: 'red',
  },
  text: { fontSize: 30, color: 'white' },
})

export default Heading
