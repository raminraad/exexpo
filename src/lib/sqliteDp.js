import { openDatabase } from "expo-sqlite";

const db = openDatabase("db");

export const renewTables = () => {
  let tableNames = ["Product", "ProductGroup", "ProductSub", "UserVisitPlan", "VisitPlanCustomers", "VisitPlanResults"];
  console.log(`dropping table(s) ${tableNames}..`);
  
  for (const tableName of tableNames)
    db.exec([{ sql: `drop table if exists ${tableName};`, args: [] }], false, () => console.log(`dropping table ${tableName} done successfully..`));

  console.log("creating all tables..");
  let queryArray = [
    `create table if not exists productGroup (key integer primary key not null, Id,ParentId,ProductGroupCode,Title,LastModifiedDate,SyncStatus)`,
    `create table if not exists Product (key integer primary key not null,Id,ProductGroupId,ProductCode,Taste,LastModifiedDate,SyncStatus)`,
    `create table if not exists ProductSub (key integer primary key not null,Id,ProductId,BarCode,IranCode,Color,Language,PriceType,PriceValue,MeasurmentType,MeasurmentScale,LastModifiedDate,SyncStatus)`,
    `create table if not exists UserVisitPlan (key integer primary key not null,Id,Summary,OperationDate,DateX,LastModifiedDate,SyncStatus)`,
    `create table if not exists VisitPlanCustomers (key integer primary key not null,Id,VisitPlanId,CustomerId,Code,Title,Owner,Long,Lat,Type,Address,Phone,Cell,Vol,ResultAttachedFileTitle,ResultSummary,ResultStatus,ResultVisitedDate,LastModifiedDate,SyncStatus)`,
    `create table if not exists VisitPlanResults (key integer primary key not null,Id,VisitPlanCustomerId,ProductSubId,SellPrice,Weight,HasInventory,ShelfInventoryCount,ShelfVisibleCount,WarehouseInventoryCount,VerbalPurchaseCount,FactorPurchaseCount,LastModifiedDate,SyncStatus)`,
  ];

  for (const query of queryArray) db.exec([{ sql: `${query};`, args: [] }], false, () => console.log(`table creation done successfully..`));
};

export const insertProductGroup = (...parameters) => {
  // let params = [Id, ParentId, ProductGroupCode, Title, LastModifiedDate, SyncStatus];
  let query = `insert into productGroup (Id,ParentId,ProductGroupCode,Title,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?)`;

  db.exec([{ sql: `${query};`, args: parameters }], false, () => console.log(`success: ${query}`));
};

export const insertProduct = (...parameters) => {
  // let params = [Id, ProductGroupId, ProductCode, Taste, LastModifiedDate, SyncStatus];
  let query = `insert into product (Id,ProductGroupId,ProductCode,Taste,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?)`;
  db.exec([{ sql: `${query};`, args: parameters }], false, () => console.log(`insertion done successfully into product..`));
};

export const insertProductSub = (...parameters) => {
  // let params = [Id, ProductId, BarCode, IranCode, Color, Language, PriceType, PriceValue, MeasurmentType, MeasurmentScale, LastModifiedDate, SyncStatus];
  let query = `insert into ProductSub (Id,ProductId,BarCode,IranCode,Color,Language,PriceType,PriceValue,MeasurmentType,MeasurmentScale,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?,?,?,?,?,?,?)`;
  db.exec([{ sql: `${query};`, args: parameters }], false, () => console.log(`insertion done successfully into ProductSub..`));
};
export const insertUserVisitPlan = (...parameters) => {
  let query = `insert into UserVisitPlan (Id,Summary,OperationDate,DateX,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?)`;
  // let params = [Id, Summary, OperationDate, DateX, LastModifiedDate, SyncStatus];
  db.exec([{ sql: `${query};`, args: parameters }], false, () => console.log(`insertion done successfully into UserVisitPlan..`));
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
  db.exec([{ sql: `${query};`, args: parameters }], false, () => console.log(`insertion done successfully into VisitPlanCustomers..`));
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
  db.exec([{ sql: `${query};`, args: parameters }], false, () => console.log(`insertion done successfully into VisitPlanResults..`));
};

export const getJoinedProducts=()=>{
  let query = `select p.Taste as product_title , g.Title as group_title from Product p join productGroup g on p.ProductGroupId = g.Id `;
  let query0 = `select count(*) from Product`;
  let result = null;
  db.transaction((tx) => {
    tx.executeSql(
      query,
      [],
      (_, { rows: { _array } }) => {
        result = _array;
        console.log(_array);
      },
      (transaction, error) => console.log(`joining product and productGroup failed.. error: ${error}`)
    );
  });
  return result;
}
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
