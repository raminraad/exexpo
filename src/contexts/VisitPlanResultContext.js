import React from "react";

const VisitPlanResultContext = React.createContext({
  value: { visitPlanCustomer: {}, visitPlanResults: [{ Id: 0, PriceValue: 0, MeasurmentScale: 0, ShelfVisibleCount: 0 }] },
  setValue: (value) => {},
}); // use a state to initialize

export default VisitPlanResultContext;
