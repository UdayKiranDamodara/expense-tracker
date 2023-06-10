import { db, executeSql } from './database'

// Insert a mode entry
export const insertMode = async (uuid, name) => {
  try {
    const insertedRowId = await executeSql(
      'INSERT INTO modes (uuid, name, createdAt, updatedAt) VALUES (?, ?, datetime("now"), datetime("now"));',
      [uuid, name]
    )
    console.log('-----> insertedRowID: ', insertedRowId)
    const result = await executeSql('SELECT * FROM modes WHERE id = ?', [
      insertedRowId.insertId,
    ])
    console.log('-----> insertedRow', result.rows.item(0))
    return result.rows.item(0)
  } catch (err) {
    console.log('ERROR', err)
  }
}

// Update a mode entry
export const updateMode = async (id, name) => {
  try {
    const result = await executeSql(
      'UPDATE modes SET name = ?, updatedAt = datetime("now") WHERE id = ?;',
      [name, id]
    )
    if (result.rowsAffected === 1) {
      const result = await executeSql('SELECT * FROM modes WHERE id = ?', [id])
      return result.rows.item(0)
    } else throw new Error('UPDATING FAILED')
  } catch (err) {
    console.log(err)
  }
}

// Delete a mode entry
export const deleteMode = async (id) => {
  try {
    console.log(id)
    const result = await executeSql('DELETE FROM modes WHERE id = ?;', [id])
    return result.rowsAffected
  } catch (err) {
    console.log(err)
  }
}

// Fetch all modes
export const fetchAllModes = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM modes;',
        [],
        (_, result) => {
          const rows = result.rows
          const modes = []
          for (let i = 0; i < rows.length; i++) {
            modes.push(rows.item(i))
          }
          resolve(modes)
        },
        (_, error) => {
          reject(error)
        }
      )
    })
  })
}
