import React from "react";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const UnsupportedOs = ({ message }: { message: string }) => (
  <div className="frame">
    <div className="main-frame unsupported-page">
      <FontAwesomeIcon icon={faWrench} className="icon-big" />
      <p>{`Sorry, your version of macOS is unsupported.`}</p>
      <p>{message}</p>
    </div>
  </div>
);
