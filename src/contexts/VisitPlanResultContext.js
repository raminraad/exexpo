import React from "react";

const VisitPlanResultContext = React.createContext({
  value: { visitPlanCustomer: {}, visitPlanResults: [{ Id: 0,rxKey:0,rxSync:0, PriceValue: 0,PriceType:0, MeasurmentScale: 0,MeasurmentType:0, ShelfVisibleCount: 0 ,productGroupTitles:[],productTitle:''}] },
  setValue: (value) => {},
}); // use a state to initialize

export default VisitPlanResultContext;
