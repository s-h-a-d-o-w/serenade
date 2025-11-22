import React from "react";
import { ipcRenderer } from "electron";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { languages } from "shared/languages";
import { core } from "../../../gen/core";
import { Indicator } from "./indicator";

const LanguageIndicatorComponent = ({ language, sourceAvailable }: {
  language: core.Language;
  sourceAvailable: boolean;
}) => {
  let icon = <FontAwesomeIcon icon={faGlobe} />;
  if (languages[language]) {
    icon = languages[language]!.icon ? (
      <img
        className={`h-4 w-4 mb-0.5 mx-1 ${language}`}
        src={languages[language]!.icon}
        alt={languages[language]!.name}
      />
    ) : (
      <FontAwesomeIcon icon={faFileAlt} />
    );
  } else if (sourceAvailable) {
    icon = <FontAwesomeIcon icon={faFileAlt} />;
  }

  return (
    <Indicator
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        ipcRenderer.send("showLanguageSwitcher");
      }}
    >
      {icon}
    </Indicator>
  );
};

export const LanguageIndicator = connect((state: any) => ({
  language: state.language,
  sourceAvailable: state.sourceAvailable,
}))(LanguageIndicatorComponent);
