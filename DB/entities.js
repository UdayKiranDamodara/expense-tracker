import { db } from './database'

// Insert a source entry
export const insertSource = (uuid, name, type) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO sources (uuid, name, type, createdAt, updatedAt) VALUES (?, ?, ?, datetime("now"), datetime("now"));',
        [uuid, name, type],
        (_, result) => {
          resolve(result.insertId)
        },
        (_, error) => {
          reject(error)
        }
      )
    })
  })
}

// Update a source entry
export const updateSource = (id, name, type) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE sources SET name = ?, type = ?, updatedAt = datetime("now") WHERE id = ?;',
        [name, type, id],
        (_, result) => {
          resolve(result.rowsAffected)
        },
        (_, error) => {
          reject(error)
        }
      )
    })
  })
}

// Delete a source entry
export const deleteSource = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM sources WHERE id = ?;',
        [id],
        (_, result) => {
          resolve(result.rowsAffected)
        },
        (_, error) => {
          reject(error)
        }
      )
    })
  })
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
