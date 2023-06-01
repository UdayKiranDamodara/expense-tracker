import { View, StyleSheet } from 'react-native'
import DisplayBox from '../components/ui/molecules/DisplayBox'
import { data } from '../dummyData'
import { useState } from 'react'

const CategoriesScreen = () => {
  const [categories, setCategories] = useState(data.categories)
  const handleEditCategory = (category) => {
    setCategories((prevState) => {
      const index = prevState.findIndex((item) => item.id === category.id)
      const newState = [...prevState]
      newState[index] = { ...category }
      return newState
    })
  }
  const handleDeleteCategory = (id) => {
    setCategories((prevState) => prevState.filter((item) => item.id != id))
  }
  return (
    <View style={styles.screen}>
      <DisplayBox
        list={categories}
        addItemText='Add Cateory'
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
