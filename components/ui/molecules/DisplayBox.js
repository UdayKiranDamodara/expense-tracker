import {
  View,
  StyleSheet,
  Button,
  FlatList,
  Modal,
  TextInput,
} from 'react-native'
import Heading from '../atoms/Heading'
import RemovableListItem from '../atoms/RemovableListItem'
import { useState } from 'react'
import uuid from 'react-native-uuid'

const DisplayBox = ({
  title = null,
  list,
  onDelete,
  onEdit,
  onAdd,
  addItemText = 'add',
  boxStyle = null,
  headerStyle = null,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalText, setModalText] = useState('')
  const closeModal = () => {
    setModalText('')
    setIsModalVisible(false)
  }
  const addItem = () => {
    const id = uuid.v4()
    onAdd({
      id: id,
      name: modalText,
    })
    closeModal()
  }
  return (
    <View style={styles.displayBox}>
      {title && <Heading text={title} />}
      <View
        style={{
          height: 190.5,
          // flexBasis: 'auto',
          backgroundColor: 'whitesmoke',
        }}
      >
        <FlatList
          data={list}
          renderItem={(item) => {
            return (
              <RemovableListItem
                item={item.item}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            )
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View>
        <Button title={addItemText} onPress={() => setIsModalVisible(true)} />
      </View>
      <Modal visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalInputContainer}>
            <TextInput
              style={styles.modalTextInput}
              placeholder='Name'
              value={modalText}
              onChangeText={setModalText}
              autoFocus
            />
          </View>
          <View style={styles.modalButtonContainer}>
            <View style={{ width: 120 }}>
              <Button title='Add' onPress={addItem} />
            </View>
            <View style={{ width: 120 }}>
              <Button title='Cancel' onPress={closeModal} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  displayBox: {
    // flexGrow: 1,
    // height: '100%',
    padding: 4,
    margin: 4,
    backgroundColor: 'brown',
    borderWidth: 2,
  },
  displayBoxHeader: {
    fontSize: 20,
  },
  modalContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  modalInputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  modalTextInput: {
    borderWidth: 1,
    borderColor: 'black',
    width: '85%',
    padding: 6,
  },
})

export default DisplayBox
