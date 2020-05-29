import { openDatabase } from "expo-sqlite";

const db = openDatabase("db");

export const renewTables = (resolve,reject,result) => {
  let createTables = () => {
    console.log("creating all tables..");
    let createQueries = [
      {
        sql: `create table if not exists ProductGroup (key integer primary key not null, Id integer,ParentId integer,ProductGroupCode,Title,LastModifiedDate,SyncStatus)`,
        args: [],
      },
      {
        sql: `create table if not exists Product (key integer primary key not null,Id integer,ProductGroupId integer,ProductCode,Taste,LastModifiedDate,SyncStatus)`,
        args: [],
      },
      {
        sql: `create table if not exists ProductSub (key integer primary key not null,Id integer,ProductId integer,BarCode,IranCode,Color,Language,PriceType,PriceValue,MeasurmentType,MeasurmentScale,LastModifiedDate,SyncStatus)`,
        args: [],
      },
      {
        sql: `create table if not exists UserVisitPlan (key integer primary key not null,Id integer,Summary,OperationDate,DateX,LastModifiedDate,SyncStatus)`,
        args: [],
      },
      {
        sql: `create table if not exists VisitPlanCustomers (key integer primary key not null,Id integer,VisitPlanId integer,CustomerId integer,Code,Title,Owner,Long,Lat,Type,Address,Phone,Cell,Vol,ResultAttachedFileTitle,ResultSummary,ResultStatus,ResultVisitedDate,LastModifiedDate,SyncStatus)`,
        args: [],
      },
      {
        sql: `create table if not exists VisitPlanResults (key integer primary key not null,Id integer,VisitPlanCustomerId integer,ProductSubId integer,SellPrice,Weight,HasInventory,ShelfInventoryCount,ShelfVisibleCount,WarehouseInventoryCount,VerbalPurchaseCount,FactorPurchaseCount,LastModifiedDate,SyncStatus)`,
        args: [],
      },
    ];

    db.exec(createQueries, false, () => {console.log(`☺☺ creating tables done successfully..`);resolve(result);});
  };

  let tableNames = ["Product", "ProductGroup", "ProductSub", "UserVisitPlan", "VisitPlanCustomers", "VisitPlanResults"];
  let dropQueries = [];
  for (const table of tableNames) {
    dropQueries.push({ sql: `drop table if exists ${table};`, args: [] });
  }
  console.log(`dropping table(s) ${tableNames}..`);
  try {
    db.exec(dropQueries, false, () => {console.log(`dropping tables done successfully..`);createTables();});
  } catch (error) {
    reject (error);
  }
};

export const insertProductGroup = (...parameters) => {
  // let params = [Id, ParentId, ProductGroupCode, Title, LastModifiedDate, SyncStatus];
  let query = `insert into ProductGroup (Id,ParentId,ProductGroupCode,Title,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?)`;

  db.exec([{ sql: `${query};`, args: parameters }], false, () => console.log(`☺☺ success: ${query}`));
};

export const insertProduct = (...parameters) => {
  // let params = [Id, ProductGroupId, ProductCode, Taste, LastModifiedDate, SyncStatus];
  let query = `insert into Product (Id,ProductGroupId,ProductCode,Taste,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?)`;
  db.exec([{ sql: `${query};`, args: parameters }], false, () => console.log(`☺☺ insertion done successfully into Product..`));
};

export const insertProductSub = (...parameters) => {
  // let params = [Id, ProductId, BarCode, IranCode, Color, Language, PriceType, PriceValue, MeasurmentType, MeasurmentScale, LastModifiedDate, SyncStatus];
  let query = `insert into ProductSub (Id,ProductId,BarCode,IranCode,Color,Language,PriceType,PriceValue,MeasurmentType,MeasurmentScale,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?,?,?,?,?,?,?)`;
  db.exec([{ sql: `${query};`, args: parameters }], false, () => console.log(`☺☺ insertion done successfully into ProductSub..`));
};
export const insertUserVisitPlan = (...parameters) => {
  let query = `insert into UserVisitPlan (Id,Summary,OperationDate,DateX,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?)`;
  // let params = [Id, Summary, OperationDate, DateX, LastModifiedDate, SyncStatus];
  db.exec([{ sql: `${query};`, args: parameters }], false, () => console.log(`☺☺ insertion done successfully into UserVisitPlan..`));
};

export const insertVisitPlanCustomers = (...parameters) => {
  // let params = [
  //   Id,
  //   VisitPlanId,
  //   CustomerId,
  //   Code,
  //   Title,
  //   Owner,
  //   Long,
  //   Lat,
  //   Type,
  //   Address,
  //   Phone,
  //   Cell,
  //   Vol,
  //   ResultAttachedFileTitle,
  //   ResultSummary,
  //   ResultStatus,
  //   ResultVisitedDate,
  //   LastModifiedDate,
  //   SyncStatus,
  // ];
  let query = `insert into VisitPlanCustomers (Id,VisitPlanId,CustomerId,Code,Title,Owner,Long,Lat,Type,Address,Phone,Cell,Vol,ResultAttachedFileTitle,ResultSummary,ResultStatus,ResultVisitedDate,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  db.exec([{ sql: `${query};`, args: parameters }], false, () => console.log(`☺☺ insertion done successfully into VisitPlanCustomers..`));
};

export const insertVisitPlanResults = (...parameters) => {
  // let params = [
  //   Id,
  //   VisitPlanCustomerId,
  //   ProductSubId,
  //   SellPrice,
  //   Weight,
  //   HasInventory,
  //   ShelfInventoryCount,
  //   ShelfVisibleCount,
  //   WarehouseInventoryCount,
  //   VerbalPurchaseCount,
  //   FactorPurchaseCount,
  //   LastModifiedDate,
  //   SyncStatus,
  // ];
  let query = `insert into VisitPlanResults (Id,VisitPlanCustomerId,ProductSubId,SellPrice,Weight,HasInventory,ShelfInventoryCount,ShelfVisibleCount,WarehouseInventoryCount,VerbalPurchaseCount,FactorPurchaseCount,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  db.exec([{ sql: `${query};`, args: parameters }], false, () => console.log(`☺☺ insertion done successfully into VisitPlanResults..`));
};

export const getJoinedProducts = () => {
  //fixme: return real data
  let queries = [];
  queries[0] = `select p.Taste as Product_title , g.Title as group_title from Product p join ProductGroup g on p.ProductGroupId = g.Id `;
  queries[1] = `select * from ProductGroup`;
  queries[2] = `select * from Product`;
  queries[3] = `select * from ProductSub`;
  queries[4] = `select * from UserVisitPlan`;
  queries[5] = `select * from VisitPlanCustomers`;
  queries[6] = `select * from VisitPlanResults`;

  db.transaction((tx) => {
    for (const query of queries) {
      tx.executeSql(
        query,
        [],
        (_, { rows: { _array } }) => {
          console.log(`☺☺ ${query} => length: ${_array.length} => ${JSON.stringify([..._array])}`);
        },
        (transaction, error) => console.log(`☻☻ ${query} =>=> ${error}`)
      );
    }
  });
};
// todo: following are unused methods

export const executeParameterless = (...queries) => {
  console.log(`starting to execute queries as on transactioin..`);

  db.transaction((tx) => {
    for (const query of queries) {
      console.log(`executing query: ${query}`);
      tx.executeSql(
        query,
        [],
        () => console.log(`query executed successfully..`),
        (transaction, error) => console.log(`query execution failed.. error: ${error}`)
      );
    }
  });
};

export const executeNonQuery = (query, params) => {
  console.log(`starting to execute query: ${query}`);

  db.transaction((tx) => {
    tx.executeSql(
      query,
      params,
      () => console.log(`query executed successfully..`),
      (transaction, error) => console.log(`query execution failed.. error: ${error}`)
    );
  });
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
  return result;
};
