import React from "react";
import classNames from "classnames";
import { Route, Routes, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { AlternativesPage } from "./pages/alternatives";
import { LoadingPage } from "./pages/loading";
import { LanguagesPage } from "./pages/languages";
import { MiniModePage } from "./pages/mini-mode";
import { PermissionsPage } from "./pages/onboarding/permissions";
import { PluginsPage } from "./pages/onboarding/plugins";
import { PrivacyPage } from "./pages/onboarding/privacy";
import { RevisionBoxPage } from "./pages/revision-box";
import { SettingsPage } from "./pages/settings";
import { TitleBar } from "./pages/title-bar";
import { TutorialsPage } from "./pages/onboarding/tutorials";
import { TextInputPage } from "./pages/text-input";
import { WelcomePage } from "./pages/onboarding/welcome";
import "./css/main.css";

const AppComponent = ({ darkTheme }: {
  darkTheme: boolean;
}) => {
  const location = useLocation();
  // set this manually to always render a page for development
  let page = null;
  const miniModeWindow = location.pathname.endsWith("minimode");
  return (
    <div
      className={classNames("app", process.platform, {
        dark: darkTheme,
        "mini-mode-window": miniModeWindow,
        transparent: miniModeWindow,
      })}
    >
      <TitleBar />
      {page ? (
        page
      ) : (
        <Routes>
          <Route path="/" element={<LoadingPage />} />
          <Route path="/alternatives" element={<AlternativesPage />} />
          <Route path="/input" element={<TextInputPage />} />
          <Route path="/languages" element={<LanguagesPage />} />
          <Route path="/minimode" element={<MiniModePage />} />
          <Route path="/permissions" element={<PermissionsPage />} />
          <Route path="/plugins" element={<PluginsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/revision" element={<RevisionBoxPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/tutorials" element={<TutorialsPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
        </Routes>
      )}
    </div>
  );
};

const mapState = (state: any) => ({
  darkTheme: state.darkTheme,
  miniMode: state.miniMode,
  nuxCompleted: state.nuxCompleted,
});

// @ts-ignore
export const App = connect(mapState)(AppComponent);
