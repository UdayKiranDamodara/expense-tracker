import * as SQLite from 'expo-sqlite'

// Open the database connection
export const db = SQLite.openDatabase('mydatabase4.db')

// Function to execute a single SQL statement
const executeSql = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        sql,
        params,
        (_, result) => resolve(result),
        (_, error) => reject(error)
      )
    })
  })
}

// Create tables if they don't exist
export const initializeDatabase = async () => {
  try {
    // Create sources table
    await executeSql(`
      CREATE TABLE IF NOT EXISTS sources (
        id INTEGER PRIMARY KEY NOT NULL,
        uuid VARCHAR(20) NOT NULL,
        name VARCHAR(20) NOT NULL,
        type VARCHAR(20) NOT NULL,
        createdAt DATETIME NOT NULL,
        updatedAt DATETIME NOT NULL,
        CONSTRAINT unique_uuid UNIQUE (uuid)
      );
      CREATE INDEX IF NOT EXISTS idx_sources_uuid ON sources (uuid);
    `)

    // Create categories table
    await executeSql(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY NOT NULL,
        uuid VARCHAR(20) NOT NULL,
        name VARCHAR(20) NOT NULL,
        createdAt DATETIME NOT NULL,
        updatedAt DATETIME NOT NULL,
        CONSTRAINT unique_uuid UNIQUE (uuid)
        );
        CREATE INDEX IF NOT EXISTS idx_categories_uuid ON categories (uuid);
    `)

    // Create modes table
    await executeSql(`
      CREATE TABLE IF NOT EXISTS modes (
        id INTEGER PRIMARY KEY NOT NULL,
        uuid VARCHAR(20) NOT NULL,
        name VARCHAR(20) NOT NULL,
        createdAt DATETIME NOT NULL,
        updatedAt DATETIME NOT NULL,
        CONSTRAINT unique_uuid UNIQUE (uuid)
      );
      CREATE INDEX IF NOT EXISTS idx_modes_uuid ON modes (uuid);
    `)

    // Create transactions table
    await executeSql(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY NOT NULL,
        uuid VARCHAR(20) NOT NULL,
        amount DOUBLE NOT NULL,
        sourceId VARCHAR(20) NOT NULL,
        categoryId VARCHAR(20) NOT NULL,
        modeId VARCHAR(20) NOT NULL,
        date DATE NOT NULL,
        description VARCHAR(100),
        createdAt DATETIME NOT NULL,
        updatedAt DATETIME NOT NULL,
        FOREIGN KEY (sourceId) REFERENCES sources(uuid),
        FOREIGN KEY (categoryId) REFERENCES categories(uuid),
        FOREIGN KEY (modeId) REFERENCES modes(uuid)
      );
    `)

    console.log('Database initialized successfully!')
  } catch (error) {
    console.log('FAILED TO CREATE TABLES', error)
  }

  try {
    // Insert dummy data
    await executeSql(`
      INSERT INTO sources (uuid, name, type, createdAt, updatedAt)
      VALUES ('1234', 'Source 1', 'Type 1', DATETIME('now'), DATETIME('now'));
    `)

    await executeSql(`
      INSERT INTO categories (uuid, name, createdAt, updatedAt)
      VALUES ('5678', 'Category 1', DATETIME('now'), DATETIME('now'));
    `)

    await executeSql(`
      INSERT INTO modes (uuid, name, createdAt, updatedAt)
      VALUES ('abcd', 'Mode 1', DATETIME('now'), DATETIME('now'));
    `)

    await executeSql(`
      INSERT INTO transactions (uuid, amount, sourceId, categoryId, modeId, date, createdAt, updatedAt)
      VALUES ('9876', 100.0, '1234', '5678', 'abcd', DATE('now'), DATETIME('now'), DATETIME('now'));
    `)
  } catch (error) {
    console.error('FAILED TO ADD DUMMY DATA:', error)
  }
}
