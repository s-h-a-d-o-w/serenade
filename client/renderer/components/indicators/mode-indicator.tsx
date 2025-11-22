import React from "react";
import { ipcRenderer } from "electron";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faICursor } from "@fortawesome/free-solid-svg-icons";
import { Indicator } from "./indicator";
import classNames from "classnames";

const ModeIndicatorComponent = ({ dictateMode }: { dictateMode: boolean }) => (
  <Indicator
    className={classNames({ "hidden": !dictateMode })}
    onClick={(e: React.MouseEvent) => {
      e.preventDefault();
      ipcRenderer.send("toggleDictateMode");
    }}
  >
    <FontAwesomeIcon icon={faICursor} /> {dictateMode ? "Dictate" : "Listen"}
  </Indicator>
);

export const ModeIndicator = connect((state: any) => ({
  dictateMode: state.dictateMode,
}))(ModeIndicatorComponent);
