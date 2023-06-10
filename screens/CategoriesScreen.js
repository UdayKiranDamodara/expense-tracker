import { View, StyleSheet } from 'react-native'
import DisplayBox from '../components/ui/molecules/DisplayBox'
import { useDispatch, useSelector } from 'react-redux'
import uuid from 'react-native-uuid'
import {
  deleteCategory,
  insertCategory,
  updateCategory,
} from '../DB/categories'
import ACTIONS from '../store/actions'

const CategoriesScreen = () => {
  const categories = useSelector((state) => state.categories)
  const dispatch = useDispatch()
  const handleAddCategory = async (category) => {
    const addedItem = await insertCategory(uuid.v4(), category.name)
    dispatch({ type: ACTIONS.CATEGORY.ADD, payload: addedItem })
  }
  const handleEditCategory = async (category) => {
    console.log(category)
    const editedItem = await updateCategory(category.id, category.name)
    dispatch({ type: ACTIONS.CATEGORY.UPDATE, payload: editedItem })
  }
  const handleDeleteCategory = async (id) => {
    const deletedRowId = await deleteCategory(id)
    dispatch({ type: ACTIONS.CATEGORY.DELETE, payload: id })
  }
  return (
    <View style={styles.screen}>
      <DisplayBox
        list={categories}
        addItemText='Add Cateory'
        onAdd={handleAddCategory}
        onDelete={handleDeleteCategory}
        onEdit={handleEditCategory}
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

export default CategoriesScreen
