import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi } from "@fortawesome/free-solid-svg-icons";
import { Endpoint } from "shared/endpoint";

const ConnectionIndicatorComponent = ({ endpoint, latency }: {
  endpoint: Endpoint;
  latency: number;
}) => (
  <div
    className={classNames(
      "inline-block text-slate-600 bg-gray-200 rounded text-center mr-1",
      {
        hidden: !endpoint || endpoint.id == "local" || latency < 500,
      }
    )}
    style={{
      fontSize: "0.6rem",
      lineHeight: "1.2rem",
      padding: "0.1rem 0.2rem",
    }}
    title="Slow Connection"
  >
    <FontAwesomeIcon icon={faWifi} /> Slow
  </div>
);

export const ConnectionIndicator = connect((state: any) => ({
  endpoint: state.endpoint,
  latency: state.latency,
}))(ConnectionIndicatorComponent);
