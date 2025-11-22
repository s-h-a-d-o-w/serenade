import * as os from "os";
import packageJson from "../package.json";

export default class Metadata {
  version = packageJson.version;

  identifier(application: string, language: any): string {
    return JSON.stringify({
      os: {
        platform: os.platform(),
        release: os.release(),
      },
      version: this.version,
      application,
      language,
    });
  }
}
