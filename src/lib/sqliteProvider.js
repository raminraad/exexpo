import { openDatabase } from "expo-sqlite";
import * as enums from "./enums";

const db = openDatabase("db");
const tableNames = ["Announcement", "Product", "ProductGroup", "ProductSub", "UserVisitPlan", "VisitPlanCustomers", "VisitPlanResults"];

export const dropAndCreateTables = async () => {
  let createTables = () => {
    console.log(`🏁 [sqliteProvider.dropAndCreateTables.createTables]`);
    let createQueries = [
      {
        sql: `create table if not exists Announcement (rxId integer primary key not null, Id integer,Title,Summary,Description,DateX,SyncStatus integer,LastModifiedDate)`,
        args: [],
      },
      {
        sql: `create table if not exists ProductGroup (rxId integer primary key not null, Id integer,ParentId integer,ProductGroupCode,Title,LastModifiedDate,SyncStatus integer)`,
        args: [],
      },
      {
        sql: `create table if not exists Product (rxId integer primary key not null,Id integer,ProductGroupId integer,ProductCode,Taste,LastModifiedDate,SyncStatus integer)`,
        args: [],
      },
      {
        sql: `create table if not exists ProductSub (rxId integer primary key not null,Id integer,ProductId integer,BarCode,IranCode,Color,Language integer,PriceType integer,PriceValue integer,MeasurmentType integer,MeasurmentScale integer,LastModifiedDate,SyncStatus integer)`,
        args: [],
      },
      {
        sql: `create table if not exists UserVisitPlan (rxId integer primary key not null,Id integer,Summary,OperationDate,DateX,LastModifiedDate,SyncStatus integer)`,
        args: [],
      },
      {
        sql: `create table if not exists VisitPlanCustomers (rxId integer primary key not null,Id integer,VisitPlanId integer,CustomerId integer,Code,Title,Owner,Long integer,Lat integer,Type integer,Address,Phone,Cell,Vol integer,ResultAttachedFileTitle,ResultSummary,ResultStatus integer,ResultVisitedDate,LastModifiedDate,SyncStatus integer)`,
        args: [],
      },
      {
        sql: `create table if not exists VisitPlanResults (rxId integer primary key not null,Id integer,VisitPlanCustomerId integer,ProductSubId integer,SellPrice integer,Weight integer,HasInventory,ShelfInventoryCount integer,ShelfVisibleCount integer,WarehouseInventoryCount,VerbalPurchaseCount,FactorPurchaseCount,LastModifiedDate,SyncStatus integer)`,
        args: [],
      },
    ];

    db.exec(createQueries, false, () => {
      console.log(`👍 [sqliteProvider.dropAndCreateTables.createTables]`);
      resolve(true);
    });
  };
  console.log(`🏁 [sqliteProvider.dropAndCreateTables.dropTables]`);
  let dropQueries = [];
  for (const table of tableNames) {
    dropQueries.push({ sql: `drop table if exists ${table};`, args: [] });
  }
  console.log(`💬 [sqliteProvider.dropAndCreateTables.dropTables] dropping table(s) ${tableNames}..`);
  return new Promise((resolve, reject) => {
    try {
      db.exec(dropQueries, false, () => {
        console.log(`👍 [sqliteProvider.dropAndCreateTables.dropTables]`);
        createTables();
        resolve(true);
      });
    } catch (err) {
      console.log(`❌ [sqliteProvider.dropAndCreateTables.dropTables] ${err}`);
      reject(err);
    }
  });
};

export const selectTable = async (tableName) => {
  const db = openDatabase("db");

  let pr = new Promise((resolve, reject) => {
    let query = `select * from ${tableName} `;
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        (_, { rows: { _array } }) => {
          console.log(`👍 ${query} => length: ${_array.length} => ${JSON.stringify([..._array])}`);
          resolve(_array);
        },
        (transaction, error) => {
          console.log(`❌ ${query} => ${error}`);
          reject(error);
        }
      );
    });
  });

  return pr;
};

export const selectTables = async (tables = tableNames) => {
  let dbData = {};
  for (const tbl of tables) {
    try {
      let selectedContent = await selectLocalData(tbl);
      dbData[`${tbl}`] = selectedContent;
    } catch (error) {
      console.log(`❌ [sqliteProvider.selectTables] ${error}`);
      return null;
    }
  }
  return dbData;
};

export const insertProductGroup = (...parameters) => {
  let query = `insert into ProductGroup (Id,ParentId,ProductGroupCode,Title,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?)`;
  db.exec([{ sql: `${query};`, args: parameters }], false, () => console.log(`👍 success: ${query}`));
};

export const insertProduct = (...parameters) => {
  let query = `insert into Product (Id,ProductGroupId,ProductCode,Taste,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?)`;
  db.exec([{ sql: `${query};`, args: parameters }], false, () => console.log(`👍 insertion done successfully into Product..`));
};

export const insertProductSub = (...parameters) => {
  let query = `insert into ProductSub (Id,ProductId,BarCode,IranCode,Color,Language,PriceType,PriceValue,MeasurmentType,MeasurmentScale,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?,?,?,?,?,?,?)`;
  db.exec([{ sql: `${query};`, args: parameters }], false, () => console.log(`👍 insertion done successfully into ProductSub..`));
};
export const insertUserVisitPlan = (...parameters) => {
  let query = `insert into UserVisitPlan (Id,Summary,OperationDate,DateX,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?)`;
  db.exec([{ sql: `${query};`, args: parameters }], false, () => console.log(`👍 insertion done successfully into UserVisitPlan..`));
};

export const insertVisitPlanCustomers = (...parameters) => {
  let query = `insert into VisitPlanCustomers (Id,VisitPlanId,CustomerId,Code,Title,Owner,Long,Lat,Type,Address,Phone,Cell,Vol,ResultAttachedFileTitle,ResultSummary,ResultStatus,ResultVisitedDate,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  db.exec([{ sql: `${query};`, args: parameters }], false, () => console.log(`👍 insertion done successfully into VisitPlanCustomers..`));
};

export const insertVisitPlanResults = (...parameters) => {
  let query = `insert into VisitPlanResults (Id,VisitPlanCustomerId,ProductSubId,SellPrice,Weight,HasInventory,ShelfInventoryCount,ShelfVisibleCount,WarehouseInventoryCount,VerbalPurchaseCount,FactorPurchaseCount,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  db.exec([{ sql: `${query};`, args: parameters }], false, () => console.log(`👍 insertion done successfully into VisitPlanResults..`));
};

export const syncData = async (dataTables) => {
  console.log(`🏁 [sqliteProvider.syncData]`);
  const db = openDatabase("db");

  let queries = [];

  for (const item of dataTables.Announcement) {
    let parameters = "";
    let query = "";
    switch (item.SyncStatus) {
      case enums.SyncStatus.modified:
        parameters = [item.Title, item.Summary, item.Description, item.DateX, item.SyncStatus, item.LastModifiedDate, item.Id];
        query = `update Announcement set Title=?,Summary=?,Description=?,DateX=?,SyncStatus=?,LastModifiedDate=? where Id=?`;
        break;
      case enums.SyncStatus.created:
        parameters = [item.Id, item.Title, item.Summary, item.Description, item.DateX, item.SyncStatus, item.LastModifiedDate];
        query = `insert into Announcement (Id,Title,Summary,Description,DateX,SyncStatus,LastModifiedDate) values (?,?,?,?,?,?)`;
        break;
      case enums.SyncStatus.deleted:
        parameters = [item.Id];
        query = `delete from Announcement where Id=?`;
        break;
    }
    queries.push({ sql: `${query};`, args: parameters });
  }

  for (const item of dataTables.ProductGroup) {
    let parameters = "";
    let query = "";
    switch (item.SyncStatus) {
      case enums.SyncStatus.modified:
        parameters = [item.ParentId, item.ProductGroupCode, item.Title, item.LastModifiedDate, item.SyncStatus, item.Id];
        query = `update ProductGroup set ParentId=?,ProductGroupCode=?,Title=?,LastModifiedDate=?,SyncStatus=? where Id=?`;
        break;
      case enums.SyncStatus.created:
        parameters = [item.Id, item.ParentId, item.ProductGroupCode, item.Title, item.LastModifiedDate, item.SyncStatus];
        query = `insert into ProductGroup (Id,ParentId,ProductGroupCode,Title,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?)`;
        break;
      case enums.SyncStatus.deleted:
        parameters = [item.Id];
        query = `delete from ProductGroup where Id=?`;
        break;
    }
    queries.push({ sql: `${query};`, args: parameters });
  }

  for (const item of dataTables.Product) {
    let parameters = "";
    let query = "";
    switch (item.SyncStatus) {
      case enums.SyncStatus.modified:
        parameters = [item.ProductGroupId, item.ProductCode, item.Taste, item.LastModifiedDate, item.SyncStatus, item.Id];
        query = `update Product set ProductGroupId=?,ProductCode=?,Taste=?,LastModifiedDate=?,SyncStatus=? where Id=?`;
        break;
      case enums.SyncStatus.created:
        parameters = [item.Id, item.ProductGroupId, item.ProductCode, item.Taste, item.LastModifiedDate, item.SyncStatus];
        query = `insert into Product (Id,ProductGroupId,ProductCode,Taste,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?)`;
        break;
      case enums.SyncStatus.deleted:
        parameters = [item.Id];
        query = `delete from Product where Id=?`;
        break;
    }
    queries.push({ sql: `${query};`, args: parameters });
  }

  for (const item of dataTables.ProductSub) {
    let parameters = "";
    let query = "";
    switch (item.SyncStatus) {
      case enums.SyncStatus.modified:
        parameters = [
          item.ProductId,
          item.BarCode,
          item.IranCode,
          item.Color,
          item.Language,
          item.PriceType,
          item.PriceValue,
          item.MeasurmentType,
          item.MeasurmentScale,
          item.LastModifiedDate,
          item.SyncStatus,
          item.Id,
        ];
        query = `update ProductSub set ProductId=?,BarCode=?,IranCode=?,Color=?,Language=?,PriceType=?,PriceValue=?,MeasurmentType=?,MeasurmentScale=?,LastModifiedDate=?,SyncStatus=? where Id=?`;
        break;
      case enums.SyncStatus.created:
        parameters = [
          item.Id,
          item.ProductId,
          item.BarCode,
          item.IranCode,
          item.Color,
          item.Language,
          item.PriceType,
          item.PriceValue,
          item.MeasurmentType,
          item.MeasurmentScale,
          item.LastModifiedDate,
          item.SyncStatus,
        ];
        query = `insert into ProductSub (Id,ProductId,BarCode,IranCode,Color,Language,PriceType,PriceValue,MeasurmentType,MeasurmentScale,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?,?,?,?,?,?,?)`;
        break;
      case enums.SyncStatus.deleted:
        parameters = [item.Id];
        query = `delete from ProductSub where Id=?`;
        break;
    }
    queries.push({ sql: `${query};`, args: parameters });
  }

  for (const item of dataTables.UserVisitPlan) {
    let parameters = "";
    let query = "";
    switch (item.SyncStatus) {
      case enums.SyncStatus.modified:
        parameters = [item.Summary, item.OperationDate, item.DateX, item.LastModifiedDate, item.SyncStatus, item.Id];
        query = `update UserVisitPlan set Summary=?, OperationDate=?, DateX=?, LastModifiedDate=?, SyncStatus=? where Id=?`;
        break;
      case enums.SyncStatus.created:
        parameters = [item.Id, item.Summary, item.OperationDate, item.DateX, item.LastModifiedDate, item.SyncStatus];
        query = `insert into UserVisitPlan (Id,Summary,OperationDate,DateX,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?)`;
        break;
      case enums.SyncStatus.deleted:
        parameters = [item.Id];
        query = `delete from UserVisitPlan where Id=?`;
        break;
    }
    queries.push({ sql: `${query};`, args: parameters });
  }

  for (const item of dataTables.VisitPlanCustomers) {
    let parameters = "";
    let query = "";
    switch (item.SyncStatus) {
      case enums.SyncStatus.modified:
        parameters = [
          item.VisitPlanId,
          item.CustomerId,
          item.Code,
          item.Title,
          item.Owner,
          item.Long,
          item.Lat,
          item.Type,
          item.Address,
          item.Phone,
          item.Cell,
          item.Vol,
          item.ResultAttachedFileTitle,
          item.ResultSummary,
          item.ResultStatus,
          item.ResultVisitedDate,
          item.LastModifiedDate,
          item.SyncStatus,
          item.Id,
        ];
        query = `update VisitPlanCustomers set VisitPlanId=?,CustomerId=?,Code=?,Title=?,Owner=?,Long=?,Lat=?,Type=?,Address=?,Phone=?,Cell=?,Vol=?,ResultAttachedFileTitle=?,ResultSummary=?,ResultStatus=?,ResultVisitedDate=?,LastModifiedDate=?,SyncStatus=?, where Id=?`;
        break;
      case enums.SyncStatus.created:
        parameters = [
          item.Id,
          item.VisitPlanId,
          item.CustomerId,
          item.Code,
          item.Title,
          item.Owner,
          item.Long,
          item.Lat,
          item.Type,
          item.Address,
          item.Phone,
          item.Cell,
          item.Vol,
          item.ResultAttachedFileTitle,
          item.ResultSummary,
          item.ResultStatus,
          item.ResultVisitedDate,
          item.LastModifiedDate,
          item.SyncStatus,
        ];
        query = `insert into VisitPlanCustomers (Id,item.VisitPlanId,CustomerId,Code,Title,Owner,Long,Lat,Type,Address,Phone,Cell,Vol,ResultAttachedFileTitle,ResultSummary,ResultStatus,ResultVisitedDate,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        break;
      case enums.SyncStatus.deleted:
        parameters = [item.Id];
        query = `delete from VisitPlanCustomers where Id=?`;
        break;
    }
    queries.push({ sql: `${query};`, args: parameters });
  }

  for (const item of dataTables.VisitPlanResults) {
    let parameters = "";
    let query = "";
    switch (item.SyncStatus) {
      case enums.SyncStatus.modified:
        parameters = [
          item.VisitPlanCustomerId,
          item.ProductSubId,
          item.SellPrice,
          item.Weight,
          item.HasInventory,
          item.ShelfInventoryCount,
          item.ShelfVisibleCount,
          item.WarehouseInventoryCount,
          item.VerbalPurchaseCount,
          item.FactorPurchaseCount,
          item.LastModifiedDate,
          item.SyncStatus,
          item.Id,
        ];
        query = `update VisitPlanResults set VisitPlanCustomerId=?,ProductSubId=?,SellPrice=?,Weight=?,HasInventory=?,ShelfInventoryCount=?,ShelfVisibleCount=?,WarehouseInventoryCount=?,VerbalPurchaseCount=?,FactorPurchaseCount=?,LastModifiedDate=?,SyncStatus=? where Id=?`;
        break;
      case enums.SyncStatus.created:
        parameters = [
          item.Id,
          item.VisitPlanCustomerId,
          item.ProductSubId,
          item.SellPrice,
          item.Weight,
          item.HasInventory,
          item.ShelfInventoryCount,
          item.ShelfVisibleCount,
          item.WarehouseInventoryCount,
          item.VerbalPurchaseCount,
          item.FactorPurchaseCount,
          item.LastModifiedDate,
          item.SyncStatus,
        ];
        query = `insert into VisitPlanResults (Id,VisitPlanCustomerId,ProductSubId,SellPrice,Weight,HasInventory,ShelfInventoryCount,ShelfVisibleCount,WarehouseInventoryCount,VerbalPurchaseCount,FactorPurchaseCount,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        break;
      case enums.SyncStatus.deleted:
        parameters = [item.Id];
        query = `delete from VisitPlanResults where Id=?`;
        break;
    }
    queries.push({ sql: `${query};`, args: parameters });
  }
  return new Promise((resolve, reject) => {
    try {
      console.log(`💬 [sqliteProvider.syncData] executing queries with parameters: ${JSON.stringify(queries)}`);
      db.exec(queries, false, () => {
        console.log(`👍 [sqliteProvider.syncData] synced: ${dataTables}`);
        resolve(true);
      });
    } catch (err) {
      reject(err);
      console.log(`❌ [sqliteProvider.syncData] ${err}`);
    }
  });
};

export const insertData = async (dataTables) => {
  console.log(`🏁 [sqliteProvider.insertData]`);
  const db = openDatabase("db");

  let queries = [];

  for (const item of dataTables.Announcement) {
    let parameters = [item.Id, item.Title, item.Summary, item.Description, item.DateX, item.SyncStatus, item.LastModifiedDate];
    let query = `insert into Announcement (Id,Title,Summary,Description,DateX,SyncStatus,LastModifiedDate) values (?,?,?,?,?,?)`;
    queries.push({ sql: `${query};`, args: parameters });
  }

  for (const item of dataTables.ProductGroup) {
    let parameters = [item.Id, item.ParentId, item.ProductGroupCode, item.Title, item.LastModifiedDate, item.SyncStatus];
    let query = `insert into ProductGroup (Id,ParentId,ProductGroupCode,Title,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?)`;
    queries.push({ sql: `${query};`, args: parameters });
  }

  for (const item of dataTables.Product) {
    let parameters = [item.Id, item.ProductGroupId, item.ProductCode, item.Taste, item.LastModifiedDate, item.SyncStatus];
    let query = `insert into Product (Id,ProductGroupId,ProductCode,Taste,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?)`;
    queries.push({ sql: `${query};`, args: parameters });
  }

  for (const item of dataTables.ProductSub) {
    let parameters = [
      item.Id,
      item.ProductId,
      item.BarCode,
      item.IranCode,
      item.Color,
      item.Language,
      item.PriceType,
      item.PriceValue,
      item.MeasurmentType,
      item.MeasurmentScale,
      item.LastModifiedDate,
      item.SyncStatus,
    ];
    let query = `insert into ProductSub (Id,ProductId,BarCode,IranCode,Color,Language,PriceType,PriceValue,MeasurmentType,MeasurmentScale,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?,?,?,?,?,?,?)`;

    queries.push({ sql: `${query};`, args: parameters });
  }

  for (const item of dataTables.UserVisitPlan) {
    let parameters = [item.Id, item.Summary, item.OperationDate, item.DateX, item.LastModifiedDate, item.SyncStatus];
    let query = `insert into UserVisitPlan (Id,Summary,OperationDate,DateX,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?)`;
    queries.push({ sql: `${query};`, args: parameters });
  }

  for (const item of dataTables.VisitPlanCustomers) {
    let parameters = [
      item.Id,
      item.VisitPlanId,
      item.CustomerId,
      item.Code,
      item.Title,
      item.Owner,
      item.Long,
      item.Lat,
      item.Type,
      item.Address,
      item.Phone,
      item.Cell,
      item.Vol,
      item.ResultAttachedFileTitle,
      item.ResultSummary,
      item.ResultStatus,
      item.ResultVisitedDate,
      item.LastModifiedDate,
      item.SyncStatus,
    ];

    let query = `insert into VisitPlanCustomers (Id,VisitPlanId,CustomerId,Code,Title,Owner,Long,Lat,Type,Address,Phone,Cell,Vol,ResultAttachedFileTitle,ResultSummary,ResultStatus,ResultVisitedDate,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    queries.push({ sql: `${query};`, args: parameters });
  }

  for (const item of dataTables.VisitPlanResults) {
    let parameters = [
      item.Id,
      item.VisitPlanCustomerId,
      item.ProductSubId,
      item.SellPrice,
      item.Weight,
      item.HasInventory,
      item.ShelfInventoryCount,
      item.ShelfVisibleCount,
      item.WarehouseInventoryCount,
      item.VerbalPurchaseCount,
      item.FactorPurchaseCount,
      item.LastModifiedDate,
      item.SyncStatus,
    ];
    let query = `insert into VisitPlanResults (Id,VisitPlanCustomerId,ProductSubId,SellPrice,Weight,HasInventory,ShelfInventoryCount,ShelfVisibleCount,WarehouseInventoryCount,VerbalPurchaseCount,FactorPurchaseCount,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    queries.push({ sql: `${query};`, args: parameters });
  }
  db.exec(queries, false, () => console.log(`👍 insert queries executed successfully..`));

  console.log(`👍 [sqliteProvider.insertData]`);
};

export const tableExists = async (table_name) => {
  console.log(`🏁 [storageProvider.tableExists]`);
  const db = openDatabase("db");
  let pr = new Promise((resolve, reject) => {
    let query = `SELECT * FROM sqlite_master WHERE type='table' AND name='${table_name}';`;
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        (_, { rows: { _array } }) => {
          console.log(`👍 ${query} => length: ${_array.length} => ${_array.length > 0}`);
          resolve(_array.length > 0);
        },
        (transaction, error) => {
          console.log(`❌ [storageProvider.tableExists] ${query} => ${error}`);
          reject(error);
        }
      );
    });
  });

  return pr;
};
export const updateVisitPlanCustomerAndDetails = async (VisitPlanCustomer) => {
  try {
    console.log(`🏁 [sqliteProvider.updateVisitPlanCustomerAndDetails]`);

    const db = openDatabase("db");

    let queries = [];

    let parameters = [
      VisitPlanCustomer.ResultSummary,
      VisitPlanCustomer.ResultStatus,
      VisitPlanCustomer.ResultVisitedDate,
      VisitPlanCustomer.LastModifiedDate,
      VisitPlanCustomer.SyncStatus,
      VisitPlanCustomer.Id,
    ];

    let query = `UPDATE VisitPlanCustomers SET ResultSummary = ? , ResultStatus = ? , ResultVisitedDate = ? , LastModifiedDate = ? , SyncStatus = ? WHERE ID = ?`;
    queries.push({ sql: `${query};`, args: parameters });

    for (const item of VisitPlanCustomer.details) {
      if (item.rxSync === enums.syncStatus.modified) {
        let query = `UPDATE VisitPlanResults SET ProductSubId = ? , SellPrice = ? , Weight = ? , ShelfVisibleCount = ?, LastModifiedDate = ? , SyncStatus = ? WHERE ID = ?`;
        let parameters = [item.ProductSubId, item.SellPrice, item.Weight, item.ShelfVisibleCount, item.LastModifiedDate, item.SyncStatus, item.Id];
        queries.push({ sql: `${query};`, args: parameters });
      } else if (item.rxSync === enums.syncStatus.created) {
        let parameters = [
          item.Id,
          item.VisitPlanCustomerId,
          item.ProductSubId,
          item.SellPrice,
          item.Weight,
          item.HasInventory,
          item.ShelfInventoryCount,
          item.ShelfVisibleCount,
          item.WarehouseInventoryCount,
          item.VerbalPurchaseCount,
          item.FactorPurchaseCount,
          item.LastModifiedDate,
          item.SyncStatus,
        ];
        let query = `insert into VisitPlanResults (Id,VisitPlanCustomerId,ProductSubId,SellPrice,Weight,HasInventory,ShelfInventoryCount,ShelfVisibleCount,WarehouseInventoryCount,VerbalPurchaseCount,FactorPurchaseCount,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        queries.push({ sql: `${query};`, args: parameters });
      } else if (item.rxSync === enums.syncStatus.deleted) {
        let query = `DELETE FROM VisitPlanResults WHERE ID = ?`;
        let parameters = [item.Id];
        queries.push({ sql: `${query};`, args: parameters });
      }
    }

    // db.transaction((tx) => {
    for (const query of queries) {
      console.log(`💬 [sqliteProvider.updateVisitPlanCustomerAndDetails] query: ${JSON.stringify(query)}`);
      let result = await executeSql(query.sql, query.args);
      console.log(`💬 [sqliteProvider.updateVisitPlanCustomerAndDetails] result: ${JSON.stringify(result)}`);
    }

    return `👍 [sqliteProvider.updateVisitPlanCustomerAndDetails]`;
  } catch (err) {
    console.log(`❌ [sqliteProvider.updateVisitPlanCustomerAndDetails]`);
    throw err;
  }
};

const executeSql = async (sql, params = []) => {
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(sql, params, (_, result) => resolve(result), reject);
    })
  );
};

// todo: following are unused methods

// obsolete
export const loadLocalVisitPlans = async () => {
  const db = openDatabase("db");
  let pr = new Promise((resolve, reject) => {
    let query = `select * from UserVisitPlan`;
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        (_, { rows: { _array } }) => {
          console.log(`👍 ${query} => length: ${_array.length} => ${JSON.stringify([..._array])}`);
          for (let i = 0; i < _array.length; i++) _array[i].rxKey = i + 1;
          resolve(_array);
        },
        (transaction, error) => {
          console.log(`❌ ${query} => ${error}`);
          reject(error);
        }
      );
    });
  });

  return pr;
};

export const getJoinedProducts = () => {
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
          console.log(`👍 ${query} => length: ${_array.length} => ${JSON.stringify([..._array])}`);
        },
        (transaction, error) => console.log(`❌ ${query} =>=> ${error}`)
      );
    }
  });
};

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
