import fs from "fs-extra";
import * as os from "os";
import * as path from "path";
import Settings from "./settings";

export default class Log {
  private errorStream?: fs.WriteStream;
  private verboseStream?: fs.WriteStream;

  constructor(private settings: Settings, private startTime?: number) {}

  error(e: any) {
    console.error(e);

    if (!this.errorStream) {
      this.errorStream = fs.createWriteStream(path.join(os.homedir(), ".serenade", "error.log"));
    }

    this.errorStream.write(`${e.stack}\n`);
  }

  verbose(message: string) {
    const messageWithTime = this.startTime ? `${message} +${Date.now() - this.startTime}ms` : message;
    if(!import.meta.env.PROD) {
      console.log(messageWithTime);
    }

    if (!this.settings.getUseVerboseLogging()) {
      return;
    }

    if (!this.verboseStream) {
      this.verboseStream = fs.createWriteStream(
        path.join(os.homedir(), ".serenade", "verbose.log")
      );
    }

    this.verboseStream.write(`${messageWithTime}\n`);
  }
}
