import React from "react";
import classNames from "classnames";
import { ipcRenderer } from "electron";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faCloud, faCog, faPlug, faTools } from "@fortawesome/free-solid-svg-icons";
import { General } from "./settings/general";
import { Docs } from "./settings/docs";
import { Plugins } from "./settings/plugins";
import { Server } from "./settings/server";
import { Advanced } from "./settings/advanced";
import { Endpoint as EndpointType } from "shared/endpoint";

const Section = ({ current, icon, page, title }: {
  current: string;
  icon: any;
  page: string;
  title: string;
}) => {
  const showPage = (e: React.MouseEvent, page: string) => {
    e.preventDefault();
    ipcRenderer.send("setSettingsPage", page);
  };

  return (
    <a
      href="#"
      onClick={(e: React.MouseEvent) => showPage(e, page)}
      className={classNames("block text-center py-2 w-full rounded-md transition-colors", {
        "text-slate-600 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700":
          current != page,
        "bg-gray-200 hover:bg-gray-200 dark:bg-gray-700": current == page,
      })}
      style={{
        minWidth: "80px",
      }}
    >
      <FontAwesomeIcon icon={icon} className="settings-icon" />
      <h2>{title}</h2>
    </a>
  );
};

export const setValue = (key: string, e: any) => {
  let value: any = e;
  if (e.target) {
    value = e.target.type == "checkbox" ? e.target.checked : e.target.value;
  }

  ipcRenderer.send("setSettings", { [key]: value });
};

export const Row = ({ title, subtitle, action }: {
  title: any;
  subtitle?: any;
  action: any;
}) => (
  <div className="flex items-center border-b border-gray-200 py-2 dark:border-neutral-500">
    <div>
      <h2 className="block font-medium text-sm">{title}</h2>
      {subtitle ? <h3 className="block text-sm">{subtitle}</h3> : null}
    </div>
    <div className="ml-auto">{action}</div>
  </div>
);

const SettingsPageComponent = ({ endpoints, microphones, settingsPage }: {
  endpoint: EndpointType;
  endpoints: EndpointType[];
  microphones: any[];
  settingsPage: string;
}) => {
  if (!endpoints || !endpoints.length || !microphones || !microphones.length) {
    return null;
  }

  return (
    <div className="pt-[24px] h-screen flex flex-col">
      <div className="flex w-full justify-around px-4 mb-2">
        <Section current={settingsPage} icon={faCog} page="general" title="General" />
        <Section current={settingsPage} icon={faBookOpen} page="docs" title="Docs" />
        <Section current={settingsPage} icon={faPlug} page="plugins" title="Plugins" />
        <Section current={settingsPage} icon={faCloud} page="server" title="Server" />
        <Section current={settingsPage} icon={faTools} page="advanced" title="Advanced" />
      </div>
      <div className="flex-1 overflow-y-scroll">
        <div
          className={classNames("settings-content", {
            hidden: settingsPage != "general",
          })}
        >
          <General />
        </div>
        <div
          className={classNames("settings-content", {
            hidden: settingsPage != "docs",
          })}
        >
          <Docs />
        </div>
        <div
          className={classNames("settings-content", {
            hidden: settingsPage != "plugins",
          })}
        >
          <Plugins />
        </div>
        <div
          className={classNames("settings-content", {
            hidden: settingsPage != "server",
          })}
        >
          <Server />
        </div>
        <div
          className={classNames("settings-content", {
            hidden: settingsPage != "advanced",
          })}
        >
          <Advanced />
        </div>
      </div>
    </div>
  );
};

export const SettingsPage = connect((state: any) => ({
  endpoint: state.endpoint,
  endpoints: state.endpoints,
  microphones: state.microphones,
  settingsPage: state.settingsPage,
}))(SettingsPageComponent);
