import React from "react";

// value: { visitPlanCustomer: {}, visitPlanResults: [{ Id: 0,rxKey:0,rxSync:0, PriceValue: 0,PriceType:0, MeasurmentScale: 0,MeasurmentType:0, ShelfVisibleCount: 0 ,productGroupTitles:[],productTitle:''}] },
const VisitPlanResultContext = React.createContext({
  value: {
    visitPlanCustomer: {},
    visitPlanResults: [
      {
        Id: null,
        VisitPlanCustomerId: null,
        ProductSubId: null,
        SellPrice: null,
        Weight: null,
        HasInventory: true,
        ShelfInventoryCount: null,
        ShelfVisibleCount: null,
        WarehouseInventoryCount: null,
        VerbalPurchaseCount: null,
        FactorPurchaseCount: null,
        LastModifiedDate: "",
        SyncStatus: null,
      },
    ],
  },
  setValue: (value) => {},
}); // use a state to initialize

export default VisitPlanResultContext;
