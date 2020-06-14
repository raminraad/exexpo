import { openDatabase } from "expo-sqlite";
import * as enums from "./enums";

const db = openDatabase("db");
const tableNames = ["Announcement", "Product", "ProductGroup", "ProductSub", "UserVisitPlan", "VisitPlanCustomers", "VisitPlanResults"];

export const renewTables = (resolve, reject, result) => {
  let createTables = () => {
    console.log("creating all tables..");
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
      console.log(`👍 creating tables done successfully..`);
      resolve(result);
    });
  };

  let dropQueries = [];
  for (const table of tableNames) {
    dropQueries.push({ sql: `drop table if exists ${table};`, args: [] });
  }
  console.log(`dropping table(s) ${tableNames}..`);
  try {
    db.exec(dropQueries, false, () => {
      console.log(`dropping tables done successfully..`);
      createTables();
    });
  } catch (error) {
    reject(error);
  }
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

export const getAndSaveVisitPlanData = async () => {
  console.log(`🏁 [sqliteDp.getAndSaveVisitPlanData]`);
  let userToken = global.userInfo.token;
  let myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");

  let raw = { token: `${userToken}` };
  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(raw),
    redirect: "follow",
  };
  console.log(`👍 [sqliteDp.getAndSaveVisitPlanData] request sent with token: ${userToken}`);
  return fetch("http://audit.mazmaz.net/Api/WebApi.asmx/SyncServerData", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.d.Response.Token) {
        global.userInfo.lastSyncDateTime = result.d.LastSyncAtDate;
        return result;
      } else throw new Error(result.d.Response.Message);
    })
    .then((result) => {
      let renewPromise = new Promise((resolve, reject) => {
        renewTables(resolve, reject, result);
      });
      return renewPromise.then(result);
    })
    .then((result) => {
      insertData(result.d.DataTables);
      console.log(`👍 [sqliteDp.getAndSaveVisitPlanData] ${result}`);
    })
    .catch((error) => console.log(`❌ [sqliteDp.getAndSaveVisitPlanData] : ${error}`));
};

export const postVisitPlans = async () => {
  console.log(`🏁 [sqliteDp.postVisitPlans]`);
  let userToken = global.userInfo.token;
  let myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  let dbData = {};
  for (const tbl of tableNames) {
    try {
      let selectedContent = await select(tbl);
      dbData[`${tbl}`] = selectedContent;
    } catch (error) {
      console.log(`❌ [sqliteDp.postVisitPlans] ${error}`);
    }
  }

  let raw = { token: `${userToken}`, syncDataTables: dbData };

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(raw),
    redirect: "follow",
  };
  console.log(`💬 [sqliteDp.postVisitPlans] request sent with token: ${userToken}`);
  return fetch("http://audit.mazmaz.net/Api/WebApi.asmx/SyncClientData", requestOptions)
    .then((response) => {
      console.log(`💬 [sqliteDp.postVisitPlans] gotten response: ${JSON.stringify(response)}`);
      return response.json();
    })
    .then((result) => {
      console.log(`💬 [sqliteDp.postVisitPlans] parsed result: ${JSON.stringify(result)}`);
      if (result.d.Response.Token) {
        console.log(`💬 [sqliteDp.postVisitPlans] initial global.userInfo: ${JSON.stringify(global.userInfo)}`);
        global.userInfo.lastSyncDateTime = result.d.LastSyncAtDate;
        global.userInfo.token = result.d.Response.Token;
        global.userInfo.tokenExpirationDateTime = result.d.Response.ExpirationDate;
        console.log(`💬 [sqliteDp.postVisitPlans] updated global.userInfo: ${JSON.stringify(global.userInfo)}`);
        console.log(`👍 [sqliteDp.postVisitPlans] returned: ${result.d}`);
        return result.d;
      } else throw new Error(result.d.Response.Message);
    })
    .catch((err) => err);
};

export const syncLocalData = async (dataTables) => {
  console.log(`🏁 [sqliteDp.syncLocalData]`);
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

  db.exec(queries, false, () => console.log(`👍 insert queries executed successfully..`));

  console.log(`👍 [sqliteDp.syncLocalData] synced: ${dataTables}`);
};

const insertData = async (dataTables) => {
  console.log(`🏁 [sqliteDp.insertData]`);
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

  console.log(`👍 [sqliteDp.insertData]`);
};

export const select = async (tableName) => {
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

export const loadVisitPlans = async () => {
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

export const tableExists = async (table_name) => {
  const db = openDatabase("db");
  let pr = new Promise((resolve, reject) => {
    let query = `SELECT * FROM sqlite_master WHERE type='table' AND name='${table_name}';`;
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        (_, { rows: { _array } }) => {
          console.log(`👍 ${query} => length: ${_array.length} => ${JSON.stringify([..._array])}`);
          resolve(_array.length > 0);
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

export const updateVisitPlanResult = async (VisitPlanCustomer) => {
  try {
    console.log(`🏁 [sqliteDp.updateVisitPlanResult]`);

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
      if (item.rxSync === 2) {
        console.log("rxSync === 2");
        let query = `UPDATE VisitPlanResults SET ProductSubId = ? , SellPrice = ? , Weight = ? , ShelfVisibleCount = ?, LastModifiedDate = ? , SyncStatus = ? WHERE ID = ?`;
        let parameters = [item.ProductSubId, item.SellPrice, item.Weight, item.ShelfVisibleCount, item.LastModifiedDate, item.SyncStatus, item.Id];
        queries.push({ sql: `${query};`, args: parameters });
      } else if (item.rxSync === 1) {
        console.log("rxSync === 1");

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
      } else if (item.rxSync === -1) {
        console.log("rxSync === -1");

        let query = `DELETE FROM VisitPlanResults WHERE ID = ?`;
        let parameters = [item.Id];
        queries.push({ sql: `${query};`, args: parameters });
      }
    }

    // db.transaction((tx) => {
    for (const query of queries) {
      console.log(`💬 [sqliteDp.updateVisitPlanResult] query: ${JSON.stringify(query)}`);
      let result = await executeSql(query.sql, query.args);
      console.log(`💬 [sqliteDp.updateVisitPlanResult] result: ${JSON.stringify(result)}`);
    }

    return `👍 [sqliteDp.updateVisitPlanResult]`;
  } catch (err) {
    console.log(`❌ [sqliteDp.updateVisitPlanResult]`);
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
