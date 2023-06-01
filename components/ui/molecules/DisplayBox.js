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

const DisplayBox = ({
  title = null,
  list,
  onDelete,
  onEdit,
  addItemText = 'add',
  boxStyle = null,
  headerStyle = null,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  return (
    <View style={styles.displayBox}>
      {title && <Heading text={title} />}
      <View
        style={{
          height: 190.5,
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
        <Button
          title={addItemText}
          onPress={() => console.log('Button Pressed')}
        />
      </View>
      <Modal visible={isModalVisible}>
        <View>
          <View>
            <TextInput placeholder='Name' autoFocus />
          </View>
          <View></View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  displayBox: {
    // flexGrow: 1,
    height: '100%',
    padding: 4,
    margin: 4,
    backgroundColor: 'brown',
    borderWidth: 2,
  },
  displayBoxHeader: {
    fontSize: 20,
  },
})

export default DisplayBox
