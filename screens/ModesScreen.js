import { View, StyleSheet } from 'react-native'
import DisplayBox from '../components/ui/molecules/DisplayBox'
import { useDispatch, useSelector } from 'react-redux'
import uuid from 'react-native-uuid'
import { deleteMode, insertMode, updateMode } from '../DB/modes'
import ACTIONS from '../store/actions'

const ModesScreen = () => {
  const modes = useSelector((state) => state.modes)
  console.log(modes)
  const dispatch = useDispatch()
  const handleAddMode = async (mode) => {
    const addedItem = await insertMode(uuid.v4(), mode.name)
    dispatch({ type: ACTIONS.MODE.ADD, payload: addedItem })
  }
  const handleEditMode = async (mode) => {
    console.log(mode)
    const editedItem = await updateMode(mode.id, mode.name)
    dispatch({ type: ACTIONS.MODE.UPDATE, payload: editedItem })
  }
  const handleDeleteMode = async (id) => {
    const deletedRowId = await deleteMode(id)
    dispatch({ type: ACTIONS.MODE.DELETE, payload: id })
  }
  return (
    <View style={styles.screen}>
      <DisplayBox
        list={modes}
        addItemText='Add Mode'
        onAdd={handleAddMode}
        onDelete={handleDeleteMode}
        onEdit={handleEditMode}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'aqua',
  },
})

export default ModesScreen
