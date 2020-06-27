import * as dp from "./sqliteProvider";

//////////////////// DROP
export const dropTableProduct = () => {
  console.log("dropping table Product..");
  dp.dropPermanentTables("Product");
};

export const dropTableProductGroup = () => {
  console.log("dropping table ProductGroup..");
  dp.dropPermanentTables("ProductGroup");
};
export const dropTableProductSub = () => {
  console.log("dropping table ProductSub..");
  dp.dropPermanentTables("ProductSub");
};

export const dropTableUserVisitPlan = () => {
  console.log("dropping table UserVisitPlan..");
  dp.dropPermanentTables("UserVisitPlan");
};
export const dropTableVisitPlanCustomers = () => {
  console.log("dropping table VisitPlanCustomers..");
  dp.dropPermanentTables("VisitPlanCustomers");
};
export const dropTableVisitPlanResults = () => {
  console.log("dropping table VisitPlanResults..");
  dp.dropPermanentTables("VisitPlanResults");
};

export const dropAll = () => {
  console.log("dropping all tables..");
};
dp.dropPermanentTables("Product", "ProductGroup", "ProductSub", "UserVisitPlan", "VisitPlanCustomers", "VisitPlanResults");

//////////////////// CREATE

export const createTableProductGroup = () => {
  console.log("creating table ProductGroup..");
  dp.executeNonQuery(
    `create table if not exists productGroup (key integer primary key not null, Id,ParentId,ProductGroupCode,Title,LastModifiedDate,SyncStatus)`,
    []
  );
};
export const createTableProduct = () => {
  console.log("creating table Product..");
  dp.executeNonQuery(
    `create table if not exists Product (key integer primary key not null,Id,ProductGroupId,ProductCode,Taste,LastModifiedDate,SyncStatus)`,
    []
  );
};

export const createTableProductSub = () => {
  console.log("creating table ProductSub..");
  dp.executeNonQuery(
    `create table if not exists ProductSub (key integer primary key not null,Id,ProductId,BarCode,IranCode,Color,Language,PriceType,PriceValue,MeasurmentType,MeasurmentScale,LastModifiedDate,SyncStatus)`,
    []
  );
};
export const createTableUserVisitPlan = () => {
  console.log("creating table UserVisitPlan..");
  dp.executeNonQuery(
    `create table if not exists UserVisitPlan (key integer primary key not null,Id,Summary,OperationDate,DateX,LastModifiedDate,SyncStatus)`,
    []
  );
};

export const createTableVisitPlanCustomers = () => {
  console.log("creating table VisitPlanCustomers..");
  dp.executeNonQuery(
    `create table if not exists VisitPlanCustomers (key integer primary key not null,Id,VisitPlanId,CustomerId,Code,Title,Owner,Long,Lat,Type,Address,Phone,Cell,Vol,ResultAttachedFileTitle,ResultSummary,ResultStatus,ResultVisitedDate,LastModifiedDate,SyncStatus)`,
    []
  );
};

export const createTableVisitPlanResults = () => {
  console.log("creating table VisitPlanResults..");
  dp.executeNonQuery(
    `create table if not exists VisitPlanResults (key integer primary key not null,Id,VisitPlanCustomerId,ProductSubId,SellPrice,Weight,HasInventory,ShelfInventoryCount,ShelfVisibleCount,WarehouseInventoryCount,VerbalPurchaseCount,FactorPurchaseCount,LastModifiedDate,SyncStatus)`,
    []
  );
};

export const createAll = () => {
  console.log("creating all tables..");
  let queryArray = [
    `create table if not exists productGroup (key integer primary key not null, Id,ParentId,ProductGroupCode,Title,LastModifiedDate,SyncStatus)`,
    `create table if not exists Product (key integer primary key not null,Id,ProductGroupId,ProductCode,Taste,LastModifiedDate,SyncStatus)`,
    `create table if not exists ProductSub (key integer primary key not null,Id,ProductId,BarCode,IranCode,Color,Language,PriceType,PriceValue,MeasurmentType,MeasurmentScale,LastModifiedDate,SyncStatus)`,
    `create table if not exists UserVisitPlan (key integer primary key not null,Id,Summary,OperationDate,DateX,LastModifiedDate,SyncStatus)`,
    `create table if not exists VisitPlanCustomers (key integer primary key not null,Id,VisitPlanId,CustomerId,Code,Title,Owner,Long,Lat,Type,Address,Phone,Cell,Vol,ResultAttachedFileTitle,ResultSummary,ResultStatus,ResultVisitedDate,LastModifiedDate,SyncStatus)`,
    `create table if not exists VisitPlanResults (key integer primary key not null,Id,VisitPlanCustomerId,ProductSubId,SellPrice,Weight,HasInventory,ShelfInventoryCount,ShelfVisibleCount,WarehouseInventoryCount,VerbalPurchaseCount,FactorPurchaseCount,LastModifiedDate,SyncStatus)`,
  ];
  dp.executeParameterless(...queryArray);
};

export const createAll1 = () => {
  console.log("creating all tables..");
  tx.executeSql(
    query,
    params,
    () => console.log(`query executed successfully..`),
    (transaction, error) => console.log(`query execution failed.. error: ${error}`)
  );
  const db = openDatabase("db");
  createTableProductGroup();
  createTableProduct();
  createTableProductSub();
  createTableUserVisitPlan();
  createTableVisitPlanCustomers();
  createTableVisitPlanResults();
};
//////////////////// INSERT

