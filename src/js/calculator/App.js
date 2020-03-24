import React, { useState, useEffect, useRef } from "react";
import Addon from "./components/Addon";
import Range from "./components/Range";

const MIN_REVENUE = 0;
const MAX_REVENUE = 200000;
const STEP = 1000;
const INITIAL_PRICE = 100;
const EVENT_PRICE = 50;
const FLOW_PRICE = 15;

const App = () => {
  const [income, setIncome] = useState([0]);
  const [addons, setAddons] = useState({ flow: false, events: false });
  const [addonsPrice, setAddonsPrice] = useState(0);
  const [perMonth, setPerMonth] = useState(INITIAL_PRICE);

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const prevAddons = usePrevious(addons);

  const onIncomeChange = (values) => {
    const [value] = values;
    const [oldValue] = income;
    if (value === oldValue) {
      return;
    }

    setIncome(values);

    const toAdd = INITIAL_PRICE + value * 0.03;
    if (!toAdd) {
      setPerMonth(INITIAL_PRICE);
      return;
    }

    setPerMonth(toAdd);
  }

  const onAddonsChange = () => {
    if (!prevAddons) {
      return;
    }

    const { flow, events } = addons;
    let totalPrice = addonsPrice;

    if (flow !== prevAddons.flow) {
      if (flow) {
        totalPrice += FLOW_PRICE;
      } else if (prevAddons.flow) {
        totalPrice -= FLOW_PRICE;
      }
    }

    if (events !== prevAddons.events) {
      if (events) {
        totalPrice += EVENT_PRICE;
      } else if (prevAddons.events) {
        totalPrice -= EVENT_PRICE;
      }
    }

    setAddonsPrice(totalPrice);
  }

  const formatNumber = (num) => {
    if (typeof num !== "number") {
      return undefined;
    }
    return num.toLocaleString(navigator.language, { minimumFractionDigits: 0, });
  }

  useEffect(() => {
    onAddonsChange();
  }, [addons])

  return (
    <>
      <div className="col-md-6 mb-4 mb-md-0">
        <div className="calculator-panel">
          <div className="calculator-panel__title">What is you current monthly revenue?</div>
          <div className="calculator-panel__currency">
            <span className="calculator-panel__currency-sign">$</span>
            <span className="calculator-panel__currency-value">{formatNumber(income[0])}</span>
          </div>
          <div className="calculator-panel__range-container">
            <Range
              step={STEP}
              min={MIN_REVENUE}
              max={MAX_REVENUE}
              values={income}
              onChange={onIncomeChange}
            />
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
          <div className="d-flex">
            <a href="#" className="btn btn--link btn--primary btn--has-icon mx-auto">Learn more about addons</a>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="calculator-panel">
          <div className="calculator-panel__title d-flex justify-content-center align-items-flex-end">Price <svg width="16" height="16" style={{ marginLeft: "8px", fill: "#ff9900" }}><use xlinkHref="#question" /></svg></div>
          <div className="calculator-panel__currency">
            <span className="calculator-panel__currency-sign">$</span>
            <span className="calculator-panel__currency-value">{formatNumber(perMonth + addonsPrice)}</span>
            <span className="calculator-panel__currency-period">/ month</span>
          </div>
          <div className="calculator-panel__buttons">
            <a href="#" className="btn btn--primary btn--lg btn--rounded mx-auto">Start free 14 day trial</a>
            <a href="#" className="btn btn--primary btn--link btn--lg btn--rounded mx-auto d-flex">Pricings breakdown <svg width="16" height="16" style={{ marginLeft: "8px", fill: "#ff9900" }}><use xlinkHref="#question" /></svg></a>
          </div>
          <div className="text-center"> One morning, when Gregor Samsa woke from troubled dreams</div>
        </div>
      </div>
    </>
  );
};

export default App;