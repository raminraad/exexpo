import * as dp from "./sqliteDp";

//////////////////// DROP
const dropTableProduct = () => {
  console.log("dropping table Product..");
  dp.dropTables("Product");
};

const dropTableProductGroup = () => {
  console.log("dropping table ProductGroup..");
  dp.dropTables("ProductGroup");
};
const dropTableProductSub = () => {
  console.log("dropping table ProductSub..");
  dp.dropTables("ProductSub");
};

const dropTableProductSub = () => {
  console.log("dropping table ProductSub..");
  dp.dropTables("ProductSub");
};
const dropTableUserVisitPlan = () => {
  console.log("dropping table UserVisitPlan..");
  dp.dropTables("UserVisitPlan");
};
const dropTableVisitPlanCustomers = () => {
  console.log("dropping table VisitPlanCustomers..");
  dp.dropTables("VisitPlanCustomers");
};
const dropTableVisitPlanResults = () => {
  console.log("dropping table VisitPlanResults..");
  dp.dropTables("VisitPlanResults");
};

//////////////////// CREATE

const createTableProductGroup = () => {
  console.log("creating table ProductGroup..");
  dp.executeNonQuery(
    `create table if not exists productGroup (key integer primary key not null, Id,ParentId,ProductGroupCode,Title,LastModifiedDate,SyncStatus)`,
    []
  );
};
const createTableProduct = () => {
  console.log("creating table Product..");
  dp.executeNonQuery(
    `create table if not exists Product (key integer primary key not null,Id,ProductGroupId,ProductCode,Taste,LastModifiedDate,SyncStatus)`,
    []
  );
};

const createTableProductSub = () => {
  console.log("creating table ProductSub..");
  dp.executeNonQuery(
    `create table if not exists ProductSub (key integer primary key not null,Id,ProductId,BarCode,IranCode,Color,Language,PriceType,PriceValue,MeasurmentType,MeasurmentScale,LastModifiedDate,SyncStatus)`,
    []
  );
};
const createTableUserVisitPlan = () => {
  console.log("creating table UserVisitPlan..");
  dp.executeNonQuery(
    `create table if not exists UserVisitPlan (key integer primary key not null,Id,Summary,OperationDate,DateX,LastModifiedDate,SyncStatus)`,
    []
  );
};

const createTableVisitPlanCustomers = () => {
  console.log("creating table VisitPlanCustomers..");
  dp.executeNonQuery(
    `create table if not exists VisitPlanCustomers (key integer primary key not null,Id,VisitPlanId,CustomerId,Code,Title,Owner,Long,Lat,Type,Address,Phone,Cell,Vol,ResultAttachedFileTitle,ResultSummary,ResultStatus,ResultVisitedDate,LastModifiedDate,SyncStatus)`,
    []
  );
};

const createTableVisitPlanResults = () => {
  console.log("creating table VisitPlanResults..");
  dp.executeNonQuery(
    `create table if not exists VisitPlanResults (key integer primary key not null,Id,VisitPlanCustomerId,ProductSubId,SellPrice,Weight,HasInventory,ShelfInventoryCount,ShelfVisibleCount,WarehouseInventoryCount,VerbalPurchaseCount,FactorPurchaseCount,LastModifiedDate,SyncStatus)`,
    []
  );
};
//////////////////// INSERT

export const insertProductGroup = (Id, ParentId, ProductGroupCode, Title, LastModifiedDate, SyncStatus) => {
  dp.executeNonQuery(`insert into productGroup (Id,ParentId,ProductGroupCode,Title,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?)`, [
    Id,
    ParentId,
    ProductGroupCode,
    Title,
    LastModifiedDate,
    SyncStatus,
  ]);
};
export const insertProduct = (Id, ParentId, ProductCode, Title, LastModifiedDate, SyncStatus) => {
  dp.executeNonQuery(`insert into product (Id,ProductGroupId,ProductCode,Taste,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?)`, [
    Id,
    ProductGroupId,
    ProductCode,
    Taste,
    LastModifiedDate,
    SyncStatus,
  ]);
};

export const insertProductSub = (
  Id,
  ProductId,
  BarCode,
  IranCode,
  Color,
  Language,
  PriceType,
  PriceValue,
  MeasurmentType,
  MeasurmentScale,
  LastModifiedDate,
  SyncStatus
) => {
  dp.executeNonQuery(
    `insert into ProductSub (Id,ProductId,BarCode,IranCode,Color,Language,PriceType,PriceValue,MeasurmentType,MeasurmentScale,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?,?,?,?,?,?,?)`,
    [Id, ProductId, BarCode, IranCode, Color, Language, PriceType, PriceValue, MeasurmentType, MeasurmentScale, LastModifiedDate, SyncStatus]
  );
};
export const insertUserVisitPlan = (Id, Summary, OperationDate, DateX, LastModifiedDate, SyncStatus) => {
  dp.executeNonQuery(`insert into UserVisitPlan (Id,Summary,OperationDate,DateX,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?)`, [
    Id,
    Summary,
    OperationDate,
    DateX,
    LastModifiedDate,
    SyncStatus,
  ]);
};

export const insertVisitPlanCustomers = (
  Id,
  VisitPlanId,
  CustomerId,
  Code,
  Title,
  Owner,
  Long,
  Lat,
  Type,
  Address,
  Phone,
  Cell,
  Vol,
  ResultAttachedFileTitle,
  ResultSummary,
  ResultStatus,
  ResultVisitedDate,
  LastModifiedDate,
  SyncStatus
) => {
  dp.executeNonQuery(
    `insert into VisitPlanCustomers (Id,VisitPlanId,CustomerId,Code,Title,Owner,Long,Lat,Type,Address,Phone,Cell,Vol,ResultAttachedFileTitle,ResultSummary,ResultStatus,ResultVisitedDate,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      Id,
      VisitPlanId,
      CustomerId,
      Code,
      Title,
      Owner,
      Long,
      Lat,
      Type,
      Address,
      Phone,
      Cell,
      Vol,
      ResultAttachedFileTitle,
      ResultSummary,
      ResultStatus,
      ResultVisitedDate,
      LastModifiedDate,
      SyncStatus,
    ]
  );
};

export const insertVisitPlanResults = (
  Id,
  VisitPlanCustomerId,
  ProductSubId,
  SellPrice,
  Weight,
  HasInventory,
  ShelfInventoryCount,
  ShelfVisibleCount,
  WarehouseInventoryCount,
  VerbalPurchaseCount,
  FactorPurchaseCount,
  LastModifiedDate,
  SyncStatus
) => {
  dp.executeNonQuery(
    `insert into VisitPlanResults (Id,VisitPlanCustomerId,ProductSubId,SellPrice,Weight,HasInventory,ShelfInventoryCount,ShelfVisibleCount,WarehouseInventoryCount,VerbalPurchaseCount,FactorPurchaseCount,LastModifiedDate,SyncStatus) values (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      Id,
      VisitPlanCustomerId,
      ProductSubId,
      SellPrice,
      Weight,
      HasInventory,
      ShelfInventoryCount,
      ShelfVisibleCount,
      WarehouseInventoryCount,
      VerbalPurchaseCount,
      FactorPurchaseCount,
      LastModifiedDate,
      SyncStatus,
    ]
  );
};
