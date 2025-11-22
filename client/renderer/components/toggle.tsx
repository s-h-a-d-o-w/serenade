import React from "react";
import classNames from "classnames";
import { Switch } from "@headlessui/react";

export const Toggle = ({ onChange, value }: {
  onChange: (value: boolean) => void;
  value: boolean;
}) => (
  <Switch
    checked={value}
    onChange={onChange}
    className={classNames(
      "relative inline-flex shrink-0 h-[24px] w-[44px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 shadow",
      {
        "bg-blue-400 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-600": value,
        "bg-gray-300 dark:bg-gray-400 hover:bg-gray-400 dark:hover:bg-gray-500": !value,
      }
    )}
  >
    <span
      aria-hidden="true"
      className={classNames(
        "pointer-events-none inline-block h-[20px] w-[20px] rounded-full bg-white shadow-lg ring-0 transition ease-in-out duration-200",
        {
          "translate-x-5": value,
          "translate-x-0": !value,
        }
      )}
    />
  </Switch>
);
