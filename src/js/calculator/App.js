import React, { useState, useEffect, useRef } from "react";
import Addon from "./components/Addon";

const App = () => {
  const [income, setIncome] = useState(0);
  const [addons, setAddons] = useState({ flow: false, events: false });
  const [perMonth, setPerMonth] = useState(100);


  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const prevAddons = usePrevious(addons);

  useEffect(() => {
    if (!prevAddons) {
      return;
    }

    const { flow, events } = addons;
    let totalPrice = perMonth;

    if (flow !== prevAddons.flow) {
      if (flow) {
        totalPrice += 50;
      } else if (prevAddons.flow) {
        totalPrice -= 50;
      }
    }

    if (events !== prevAddons.events) {
      if (events) {
        totalPrice += 15;
      } else if (prevAddons.events) {
        totalPrice -= 15;
      }
    }

    setPerMonth(totalPrice);
  }, [addons])

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
            />
            <Addon
              label="Events"
              value="events"
              addons={addons}
              setAddons={setAddons}
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