import { View, StyleSheet } from 'react-native'
import DisplayBox from '../components/ui/molecules/DisplayBox'
import { data } from '../dummyData'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const CategoriesScreen = () => {
  const temp = useSelector((state) => state.categories)
  console.log(temp)
  const [categories, setCategories] = useState(data.categories)
  const handleAddCategory = (category) => {
    setCategories((prevState) => [...prevState, category])
  }
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
        list={temp}
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
