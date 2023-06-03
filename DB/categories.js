import { db } from './database'

// Insert a category entry
export const insertCategory = (uuid, name) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO categories (uuid, name, createdAt, updatedAt) VALUES (?, ?, datetime("now"), datetime("now"));',
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

// Update a category entry
export const updateCategory = (id, name) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE categories SET name = ?, updatedAt = datetime("now") WHERE id = ?;',
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

// Delete a category entry
export const deleteCategory = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM categories WHERE id = ?;',
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

// Fetch all categories
export const fetchAllCategories = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM categories;',
        [],
        (_, result) => {
          const rows = result.rows
          const categories = []
          for (let i = 0; i < rows.length; i++) {
            categories.push(rows.item(i))
          }
          resolve(categories)
        },
        (_, error) => {
          reject(error)
        }
      )
    })
  })
}
