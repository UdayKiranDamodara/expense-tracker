import { StyleSheet, View, Dimensions } from 'react-native'
import DisplayBox from '../components/ui/molecules/DisplayBox'
import { insertSource, updateSource, deleteSource } from '../DB/entities'
import { useDispatch, useSelector } from 'react-redux'
import ACTIONS from '../store/actions'
import uuid from 'react-native-uuid'

import { useState } from 'react'
const { data } = require('../dummyData')

const height = Dimensions.get('window').height
const ENTITY_TYPE = {
  USER: 'USER',
  ORGANISATION: 'ORGANISATION',
}

const UsersScreen = () => {
  const entities = useSelector((state) => state.entities)
  const dispatch = useDispatch()

  const users = entities.filter((item) => item.type === ENTITY_TYPE.USER)
  const orgs = entities.filter((item) => item.type === ENTITY_TYPE.ORGANISATION)
  console.log({ users, orgs })

  const handleAddUser = async (user) => {
    const addedItem = await insertSource(uuid.v4(), user.name, ENTITY_TYPE.USER)
    dispatch({ type: ACTIONS.ENTITY.ADD, payload: addedItem })
  }

  const handleAddOrg = async (org) => {
    const addedItem = await insertSource(
      uuid.v4(),
      org.name,
      ENTITY_TYPE.ORGANISATION
    )
    dispatch({ type: ACTIONS.ENTITY.ADD, payload: addedItem })
  }

  const handleEditEntity = async (entity) => {
    console.log(entity)
    const editedItem = await updateSource(entity.id, entity.name)
    dispatch({ type: ACTIONS.ENTITY.UPDATE, payload: editedItem })
  }

  const handleDeleteEntity = async (id) => {
    const deletedRowId = await deleteSource(id)
    dispatch({ type: ACTIONS.ENTITY.DELETE, payload: id })
  }

  return (
    <View style={styles.screen}>
      <View style={styles.item}>
        <DisplayBox
          title='Users'
          list={users}
          addItemText='Add User'
          onEdit={handleEditEntity}
          onDelete={handleDeleteEntity}
          onAdd={handleAddUser}
        />
      </View>
      <View style={styles.item}>
        <DisplayBox
          title='Organisations'
          list={orgs}
          addItemText='Add Organisation'
          onEdit={handleEditEntity}
          onDelete={handleDeleteEntity}
          onAdd={handleAddOrg}
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
