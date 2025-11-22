#!/usr/bin/env node

import dotenv from "dotenv";
import { notarize } from "@electron/notarize";

dotenv.config();

export default async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;
  if (process.env.SKIP_NOTARIZE || electronPlatformName !== "darwin") {
    return;
  }

  const appName = context.packager.appInfo.productFilename;
  return await notarize({
    appBundleId: "ai.serenade.app",
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_PASSWORD,
  });
};
