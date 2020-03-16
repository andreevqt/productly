import React, { useEffect } from "react";

const Addon = ({
  label,
  value,
  addons,
  setAddons,
  onChange
}) => {

  useEffect(() => {
    if (onChange) {
      onChange(addons.value);
    }
  }, [addons])

  const onClick = (e) => {
    setAddons({ ...addons, [value]: !addons[value] });
  };

  const classes = ["calculator-addon"];
  if (addons[value]) {
    classes.push("calculator-addon--selected");
  }

  return (
    <div
      className={classes.join(" ")}
      onClick={onClick}>
      {label}
    </div>);
};

export default Addon;