import { Ionicons, Entypo } from '@expo/vector-icons'
import { useState } from 'react'
import { StyleSheet, Text, View, Alert, TextInput } from 'react-native'

const RemovableListItem = ({ item, onDelete, onEdit }) => {
  const text = item.name
  const [name, setName] = useState(item.name)
  const [isEdit, setIsEdit] = useState(false)
  const handleDelete = () => {
    Alert.alert(
      'DELETE',
      `Are you sure you want to delete: ${name}`,
      [{ text: 'Yes', style: 'destructive', onPress: () => onDelete(item.id) }],
      { cancelable: true }
    )
  }
  const save = (text) => {
    onEdit({ ...item, name: text })
    setIsEdit(false)
  }

  const handleEdit = () => {
    setIsEdit(true)
  }
  const handleSaveButtonClick = () => {
    console.log(name)
    Alert.alert(
      'SAVE',
      `Are you sure you want to save: ${name}`,
      [{ text: 'Yes', style: 'destructive', onPress: () => save(name) }],
      { cancelable: true }
    )
  }

  if (isEdit)
    return (
      <View style={[styles.container, { alignItems: 'flex-end' }]}>
        <View style={{ width: '90%' }}>
          <TextInput
            style={[
              styles.text,
              { backgroundColor: 'aqua', paddingHorizontal: 6 },
            ]}
            placeholder={text}
            value={name}
            autoFocus
            onChangeText={setName}
          />
        </View>
        <View style={{ height: '100%' }}>
          <Entypo
            name='arrow-right'
            size={20}
            style={[styles.icons, { marginTop: 3 }]}
            onPress={handleSaveButtonClick}
          />
        </View>
      </View>
    )
  return (
    <View style={[styles.container]}>
      <View>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={styles.iconsContainer}>
        <Ionicons
          name='create-outline'
          size={20}
          style={styles.icons}
          onPress={handleEdit}
        />
        <Ionicons
          name='trash-outline'
          size={20}
          style={styles.icons}
          onPress={handleDelete}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'whitesmoke',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  text: { fontSize: 20 },
  icons: {
    marginHorizontal: 8,
  },
})

export default RemovableListItem
