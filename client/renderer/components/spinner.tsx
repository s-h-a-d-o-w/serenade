import React from "react";
import classNames from "classnames";

export const Spinner = ({ hidden }: { hidden: boolean }) => (
  <div className={classNames("lds-ring", { hidden })}>
    <div />
    <div />
    <div />
    <div />
  </div>
);
