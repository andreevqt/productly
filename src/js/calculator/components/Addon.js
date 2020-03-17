import React, { useEffect } from "react";

const Addon = ({
  label,
  value,
  addons,
  setAddons,
}) => {

  const onClick = (e) => {
    setAddons({ ...addons, [value]: !addons[value] });
  };

  const classes = ["calculator-addon"];
  if (addons[value]) {
    classes.push("calculator-addon--selected");
  }
  const iconClass = "calculator-addon__icon";

  return (
    <div
      className={classes.join(" ")}
      onClick={onClick}>
      {label}
      <svg className={iconClass}>
        <use xlinkHref="#checkbox"></use>
      </svg>
    </div>);
};

export default Addon;