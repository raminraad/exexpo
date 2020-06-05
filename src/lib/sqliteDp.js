import { openDatabase } from "expo-sqlite";

const db = openDatabase("db");

export const renewTables = (resolve,reject,result) => {
  let createTables = () => {
    console.log("creating all tables..");
    let createQueries = [
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

export const pullAndCommitVisitPlanData =async  () => {
  console.log("☺☺ pull visit plan data started");
  let authToken = global.authToken;
  let myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");

  let raw = { token: `${authToken}` };
  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(raw),
    redirect: "follow",
  };
  console.log(`☺☺ request sent with token: ${authToken}`);
  return fetch("http://audit.mazmaz.net/Api/WebApi.asmx/SyncServerData", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.d.Response.Token) {
        // setRawData(result.d);
        return result;
      } else throw new Error(result.d.Response.Message);
    })
    // .then((result) => {
      // setPresentationalData(result.d.DataTables.UserVisitPlan);
      // return result;
    // })
    .then((result) => {
      let renewPromise = new Promise((resolve, reject) => {
        renewTables(resolve, reject, result);
      });
      return renewPromise.then(result);
    })
    .then((result) => {
      commitVisitPlanData(result.d.DataTables);
      console.log(`☺☺ last "then" executed`);
    })
    .catch((error) => alert(error))
    
};

const commitVisitPlanData = async (DataTables) => {
  console.log("☺☺ commit started..");
  const db = openDatabase("db");

  let queries = [];
  for (const item of DataTables.ProductGroup) {
    let parameters = [item.Id, item.ParentId, item.ProductGroupCode, item.Title, item.LastModifiedDate, item.SyncStatus];
    let query = `insert into ProductGroup (Id,ParentId,ProductGroupCode,Title,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?)`;
    queries.push({ sql: `${query};`, args: parameters });
  }

  for (const item of DataTables.Product) {
    let parameters = [item.Id, item.ProductGroupId, item.ProductCode, item.Taste, item.LastModifiedDate, item.SyncStatus];
    let query = `insert into Product (Id,ProductGroupId,ProductCode,Taste,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?)`;
    queries.push({ sql: `${query};`, args: parameters });
  }

  for (const item of DataTables.ProductSub) {
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

  for (const item of DataTables.UserVisitPlan) {
    let parameters = [item.Id, item.Summary, item.OperationDate, item.DateX, item.LastModifiedDate, item.SyncStatus];
    let query = `insert into UserVisitPlan (Id,Summary,OperationDate,DateX,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?)`;
    queries.push({ sql: `${query};`, args: parameters });
  }

  for (const item of DataTables.VisitPlanCustomers) {
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

  for (const item of DataTables.VisitPlanResults) {
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
  db.exec(queries, false, () => console.log(`☺☺ insert queries executed successfully..`));

  console.log("☺☺ last line of commit executed");
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
            console.log(`☺☺ ${query} => length: ${_array.length} => ${JSON.stringify([..._array])}`);
          },
          (transaction, error) => console.log(`☻☻ ${query} =>=> ${error}`)
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
