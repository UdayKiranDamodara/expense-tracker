import { db, executeSql } from './database'

// Insert a source entry
export const insertSource = async (uuid, name, type) => {
  try {
    const insertedRowId = await executeSql(
      'INSERT INTO sources (uuid, name, type, createdAt, updatedAt) VALUES (?, ?, ?, datetime("now"), datetime("now"));',
      [uuid, name, type]
    )
    console.log('-----> insertedRowID: ', insertedRowId)
    const result = await executeSql('SELECT * FROM sources WHERE id = ?', [
      insertedRowId.insertId,
    ])
    console.log('-----> insertedRow', result.rows.item(0))
    return result.rows.item(0)
  } catch (err) {
    console.log('ERROR', err)
  }
}

// Update a source entry
export const updateSource = async (id, name) => {
  try {
    const result = await executeSql(
      'UPDATE sources SET name = ?, updatedAt = datetime("now") WHERE id = ?;',
      [name, id]
    )
    if (result.rowsAffected === 1) {
      const result = await executeSql('SELECT * FROM sources WHERE id = ?', [
        id,
      ])
      return result.rows.item(0)
    } else throw new Error('UPDATING FAILED')
  } catch (err) {
    console.log(err)
  }
}

// Delete a source entry
export const deleteSource = async (id) => {
  try {
    console.log(id)
    const result = await executeSql('DELETE FROM sources WHERE id = ?;', [id])
    return result.rowsAffected
  } catch (err) {
    console.log(err)
  }
}

// Fetch all sources
export const fetchAllSources = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM sources;',
        [],
        (_, result) => {
          const rows = result.rows
          const sources = []
          for (let i = 0; i < rows.length; i++) {
            sources.push(rows.item(i))
          }
          resolve(sources)
        },
        (_, error) => {
          reject(error)
        }
      )
    })
  })
}
