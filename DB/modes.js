import { db } from './database'

// Insert a mode entry
export const insertMode = (uuid, name) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO modes (uuid, name, createdAt, updatedAt) VALUES (?, ?, datetime("now"), datetime("now"));',
        [uuid, name],
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

// Update a mode entry
export const updateMode = (id, name) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE modes SET name = ?, updatedAt = datetime("now") WHERE id = ?;',
        [name, id],
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

// Delete a mode entry
export const deleteMode = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM modes WHERE id = ?;',
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
