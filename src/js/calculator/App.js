import React, { useState } from "react";
import Addon from "./components/Addon";

const App = () => {
  const [income, setIncome] = useState(0);
  const [addons, setAddons] = useState({ flow: false, events: false });
  const [perMonth, setPerMonth] = useState(100);

  const calcPrice = () => {
    const { flow, events } = addons;
    let additionalPrice = 0

    if (flow) {
      additionalPrice += 50;
    } else if (perMonth  > 100) {
      additionalPrice -= 50;
    }

    if (events) {
      additionalPrice += 15;
    } else if (perMonth + additionalPrice > 100) {
      additionalPrice -= 15;
    }

    setPerMonth(perMonth + additionalPrice);
  }

  return (
    <>
      <div className="col-md-6 ">
        <div className="calculator-panel">
          <div className="calculator-panel__title">What is you current monthly revenue?</div>
          <div className="calculator-panel__money">
            <div className="calculator-panel__money-dollar">$</div>{income}
          </div>
          <div className="calculator-panel__title">Add-ons (optional)</div>
          <div className="calculator-panel__addons">
            <Addon
              label="Flows"
              value="flow"
              addons={addons}
              setAddons={setAddons}
              onChange={calcPrice}
            />
            <Addon
              label="Events"
              value="events"
              addons={addons}
              setAddons={setAddons}
              onChange={calcPrice}
            />
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="calculator-panel">
          <div className="calculator-panel__title">Price</div>
          <div className="calculator-panel__money">
            <div className="calculator-panel__money-dollar">$</div>
            {perMonth}
            <div className="calculator-panel__money-period">/ month</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;