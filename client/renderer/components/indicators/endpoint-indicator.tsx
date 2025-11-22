import React from "react";
import { ipcRenderer } from "electron";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faLock } from "@fortawesome/free-solid-svg-icons";
import { Endpoint } from "shared/endpoint";
import { Indicator } from "./indicator";

const EndpointIndicatorComponent = ({ endpoint }: { endpoint: Endpoint }) => (
  <Indicator
    onClick={(e: React.MouseEvent) => {
      e.preventDefault();
      ipcRenderer.send("setSettingsPage", "server");
      ipcRenderer.send("showSettingsWindow");
    }}
  >
    <FontAwesomeIcon icon={endpoint && endpoint.id == "local" ? faLock : faCloud} />{" "}
    {endpoint && endpoint.id == "local" ? "Local" : "Cloud"}
  </Indicator>
);

export const EndpointIndicator = connect((state: any) => ({
  endpoint: state.endpoint,
}))(EndpointIndicatorComponent);
