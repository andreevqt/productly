import React, { useState, useEffect, useRef } from "react";
import Addon from "./components/Addon";
import { Range, getTrackBackground } from "react-range";

const MIN_REVENUE = 0;
const MAX_REVENUE = 200000;
const STEP = 1000;

const App = () => {
  const [income, setIncome] = useState([0]);
  const [addons, setAddons] = useState({ flow: false, events: false });
  const [addonsPrice, setAddonsPrice] = useState(0);
  const [perMonth, setPerMonth] = useState(100);

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

    const toAdd = value * 0.03;
    if (toAdd < 100) {
      setPerMonth(100);
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
      <div className="col-md-6 ">
        <div className="calculator-panel">
          <div className="calculator-panel__title">What is you current monthly revenue?</div>
          <div className="calculator-panel__money">
            <div className="calculator-panel__money-dollar">$</div>{formatNumber(income[0])}
          </div>
          <div className="calculator-panel__range-container">
            <Range
              step={STEP}
              min={MIN_REVENUE}
              max={MAX_REVENUE}
              values={income}
              onChange={onIncomeChange}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: '30px',
                    width: '30px',
                    backgroundColor: "#fff",
                    borderRadius: '50%',
                    boxShadow: "0px 0px 11px rgba(23, 58, 86, 0.6)",
                    border: "2px solid #ff9900",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <svg width="6px" height="6px" style={{ marginRight: "4px" }}>
                    <use xlinkHref="#arrow-left" />
                  </svg>
                  <svg width="6px" height="6px">
                    <use xlinkHref="#arrow-right" />
                  </svg>
                </div>
              )}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: '8px',
                    width: '100%',
                    backgroundColor: "#ff9900",
                    borderRadius: "100px",
                    background: getTrackBackground({
                      values: income,
                      colors: ["#ff9900", "#bcd0e560"],
                      min: MIN_REVENUE,
                      max: MAX_REVENUE
                    })
                  }}
                >
                  {children}
                </div>
              )}
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
          <div className="calculator-panel__money">
            <div className="calculator-panel__money-dollar">$</div>
            {formatNumber(perMonth + addonsPrice)}
            <div className="calculator-panel__money-period">/ month</div>
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