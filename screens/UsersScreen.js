import { StyleSheet, View, Dimensions } from 'react-native'
import DisplayBox from '../components/ui/molecules/DisplayBox'
import { useState } from 'react'
const { data } = require('../dummyData')

const height = Dimensions.get('window').height

const UsersScreen = () => {
  const [users, setUsers] = useState(data.entities.users)
  const [orgs, setOrgs] = useState(data.entities.orgs)
  const handleEditUser = (user) => {
    setUsers((prevState) => {
      const index = prevState.findIndex((item) => item.id === user.id)
      const newState = [...prevState]
      newState[index] = { ...user }
      return newState
    })
  }
  const handleEditOrg = (org) => {
    setOrgs((prevState) => {
      const index = prevState.findIndex((item) => item.id === org.id)
      const newState = [...prevState]
      newState[index] = { ...org }
      return newState
    })
  }
  const handleDeleteUser = (id) => {
    setUsers((prevState) => prevState.filter((item) => item.id != id))
  }
  const handleDeleteOrg = (id) => {
    setOrgs((prevState) => prevState.filter((item) => item.id != id))
  }
  return (
    <View style={styles.screen}>
      <View style={styles.item}>
        <DisplayBox
          title='Users'
          list={users}
          addItemText='Add User'
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
      </View>
      <View style={styles.item}>
        <DisplayBox
          title='Organisations'
          list={orgs}
          addItemText='Add Organisation'
          onEdit={handleEditOrg}
          onDelete={handleDeleteOrg}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'aqua',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  item: {
    height: height * 0.4,
    backgroundColor: 'white',
  },
})

export default UsersScreen
