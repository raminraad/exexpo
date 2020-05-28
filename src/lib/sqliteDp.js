import { openDatabase } from "expo-sqlite";

export const dropTables = (...tableNames) => {
  console.log(`dropping table ${tableName}..`);
  const db = openDatabase("db");
  for (const tableName in tableNames) {
    db.transaction((tx) => {
      tx.executeSql(
        `drop table if exists ${tableName};`,
        [],
        () => console.log(`dropping table ${tableName} done successfully..`),
        (transaction, error) => console.log(`dropping table ${tableName} failed.. error: ${error}`)
      );
    });
  }
  db.close();
};

export const executeNonQuery = (query,params) => {
  console.log(`starting to execute query: ${query}`);
  const db = openDatabase("db");
  
    db.transaction((tx) => {
      tx.executeSql(
        query,
        params,
        () => console.log(`query executed successfully..`),
        (transaction, error) => console.log(`query execution failed.. error: ${error}`)
      );
    });
  
  db.close();
};

//todo: fix this method to get query parameters
export const executeNonQueriesAsTransaction = (queries) => {
  console.log(`starting to execute queries as on transactioin..`);
  const db = openDatabase("db");
  for (const query in queries) {
    console.log(`executing query: ${query}`);
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        () => console.log(`query executed successfully..`),
        (transaction, error) => console.log(`query execution failed.. error: ${error}`)
      );
    });
  }
  db.close();
};

export const selectTable = (tableName) => {
  console.log(`starting to select from table ${tableName}..`);
  let result = null;
  db.transaction((tx) => {
    tx.executeSql(
      `select * from ${tableName}`,
      [],
      (_, { rows: { _array } }) => {
        result = _array;
        console.log(`selecting from table ${tableName} done successfully..`);
      },
      (transaction, error) => console.log(`selecting from table ${tableName} failed.. error: ${error}`)
    );
  });
  return null;
};
