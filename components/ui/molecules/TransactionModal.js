import { StyleSheet, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import DropDownPicker from 'react-native-dropdown-picker'
import DatePicker from 'react-native-date-picker'
import { useReducer, useState } from 'react'
const { data } = require('../../../dummyData')

const transform = (entities) => {
  output = [
    { id: -1, name: 'Organisations' },
    { id: -2, name: 'Users' },
  ]
  return [
    ...output,
    ...entities.orgs.map((item) => ({ ...item, parent: 'Organisations' })),
    ...entities.users.map((item) => ({ ...item, parent: 'Users' })),
  ]
}
const transformedEntities = transform(data.entities)
const TransactionModal = () => {
  //   const [data, dispatch] = useReducer()
  const [openEntity, setOpenEntity] = useState(false)
  const [valueEntity, setValueEntity] = useState(null)
  const [entities, setEntities] = useState(transformedEntities)
  const [openCategory, setOpenCategory] = useState(false)
  const [valueCategory, setValueCategory] = useState(null)
  const [categories, setCategories] = useState(data.categories)
  const [date, setDate] = useState(new Date())
  return (
    <View style={styles.container}>
      <TextInput
        mode='outlined'
        label='Amount'
        keyboardType='numeric'
        style={styles.textInput}
      />
      <View style={styles.dropDown}>
        <DropDownPicker
          schema={{ label: 'name', value: 'name' }}
          placeholder='Select an Entity'
          searchable={true}
          open={openEntity}
          value={valueEntity}
          items={entities}
          setOpen={setOpenEntity}
          setValue={setValueEntity}
          setItems={setEntities}
          zIndex={3000}
          zIndexInverse={1000}
          categorySelectable={false}
          listMode='MODAL'
        />
      </View>
      <View style={styles.dropDown}>
        <DropDownPicker
          schema={{ label: 'name', value: 'name' }}
          placeholder='Select a Category'
          searchable={true}
          open={openCategory}
          value={valueCategory}
          items={categories}
          setOpen={setOpenCategory}
          setValue={setValueCategory}
          setItems={setCategories}
          zIndex={1000}
          zIndexInverse={3000}
          listMode='MODAL'
        />
      </View>
      {/* <View style={styles.dropDown}>
        <DatePicker date={date} onDateChange={setDate} />
      </View> */}
      <TextInput
        mode='outlined'
        label='Description'
        multiline
        numberOfLines={3}
        style={styles.textInput}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'cyan',
    alignItems: 'center',
  },
  textInput: {
    width: '80%',
    marginTop: 20,
    zIndex: -1,
  },
  dropDown: {
    width: '80%',
    marginTop: 20,
  },
})
export default TransactionModal
