import React from "react";
import { Range as ReactRange, getTrackBackground } from "react-range";

const Range = (outerProps) => {
  return (
    <ReactRange
      {...outerProps}
      renderThumb={({ isDragged, props }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: '30px',
            width: '30px',
            backgroundColor: "#fff",
            borderRadius: '50%',
            transition: 'box-shadow 0.05s linear',
            boxShadow: isDragged ? "0px 0px 15px rgba(23, 58, 86, 0.3)" : "0px 0px 11px rgba(23, 58, 86, 0.3)",
            border: "2px solid #ff9900",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

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
              values: outerProps.values,
              colors: ["#ff9900", "#bcd0e560"],
              min: outerProps.min,
              max: outerProps.max
            })
          }}
        >
          {children}
        </div>
      )}
    />
  );
};

export default Range;