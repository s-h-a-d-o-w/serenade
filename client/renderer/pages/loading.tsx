import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { Spinner } from "../components/spinner";

const LoadingPageComponent: React.FC<{
  loggedIn: boolean | undefined;
}> = ({ loggedIn }) => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loggedIn === true) {
    return <Navigate to="/alternatives" />;
  } else if (loggedIn === false) {
    return <Navigate to="/welcome" />;
  }

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden items-center justify-center text-center text-sm">
      <div className={`transition-opacity duration-300 ${showLoading ? "opacity-100" : "opacity-0"}`}>
        <div>
          <Spinner hidden={false} />
          <div>Loading...</div>
        </div>
      </div>
    </div>
  );
};

export const LoadingPage = connect((state: any) => ({
  loggedIn: state.loggedIn,
}))(LoadingPageComponent);
