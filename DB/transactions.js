import { db } from './database'

// Insert a transaction entry
export const insertTransaction = (
  uuid,
  amount,
  sourceId,
  categoryId,
  modeId,
  date,
  description
) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO transactions (uuid, amount, sourceId, categoryId, modeId, description, date, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, datetime("now"), datetime("now"));',
        [uuid, amount, sourceId, categoryId, modeId, description, date],
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

// Update a transaction entry
export const updateTransaction = (
  id,
  amount,
  sourceId,
  categoryId,
  modeId,
  date,
  description
) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE transactions SET amount = ?, sourceId = ?, categoryId = ?, modeId = ?, description = ?, date = ?, updatedAt = datetime("now") WHERE id = ?;',
        [amount, sourceId, categoryId, modeId, description, date, id],
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

// Delete a transaction entry
export const deleteTransaction = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM transactions WHERE id = ?;',
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

// Fetch all transactions with joined data
export const fetchAllTransactions = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT transactions.id, transactions.uuid, transactions.amount, transactions.description, 
          sources.name AS source, categories.name AS category, modes.name AS mode, 
          transactions.date, transactions.createdAt, transactions.updatedAt 
        FROM transactions 
        INNER JOIN sources ON transactions.sourceId = sources.uuid 
        INNER JOIN categories ON transactions.categoryId = categories.uuid 
        INNER JOIN modes ON transactions.modeId = modes.uuid;`,
        [],
        (_, result) => {
          const rows = result.rows
          const transactions = []
          for (let i = 0; i < rows.length; i++) {
            transactions.push(rows.item(i))
          }
          resolve(transactions)
        },
        (_, error) => {
          console.log('ERROR FETCHING TRANSACTIONS')
          reject(error)
        }
      )
    })
  })
}
