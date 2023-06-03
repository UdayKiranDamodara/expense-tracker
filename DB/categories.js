import { db, executeSql } from './database'

// Insert a category entry
export const insertCategory = async (uuid, name) => {
  try {
    const insertedRowId = await executeSql(
      'INSERT INTO categories (uuid, name, createdAt, updatedAt) VALUES (?, ?, datetime("now"), datetime("now"));',
      [uuid, name]
    )
    console.log('-----> insertedRowID: ', insertedRowId)
    const result = await executeSql('SELECT * FROM categories WHERE id = ?', [
      insertedRowId.insertId,
    ])
    console.log('-----> insertedRow', result.rows.item(0))
    return result.rows.item(0)
  } catch (err) {
    console.log('ERROR', err)
  }
}

// Update a category entry
export const updateCategory = async (id, name) => {
  try {
    const result = await executeSql(
      'UPDATE categories SET name = ?, updatedAt = datetime("now") WHERE id = ?;',
      [name, id]
    )
    if (result.rowsAffected === 1) {
      const result = await executeSql('SELECT * FROM categories WHERE id = ?', [
        id,
      ])
      return result.rows.item(0)
    } else throw new Error('UPDATING FAILED')
  } catch (err) {
    console.log(err)
  }
}

// Delete a category entry
export const deleteCategory = async (id) => {
  try {
    console.log(id)
    const result = await executeSql('DELETE FROM categories WHERE id = ?;', [
      id,
    ])
    return result.rowsAffected
  } catch (err) {
    console.log(err)
  }
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
