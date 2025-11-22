import { clipboard } from "electron";
import * as os from "os";
import Settings from "../settings";
import driver from "serenade-driver";

const chromeVariants = [
  "chrome",
  "chromium",
  "brave",
]
const jetBrainsVariants = [
  "jetbrains",
  "androidstudio",
  "appcode",
  "clion",
  "datagrip",
  "goland",
  "intellij",
  "phpstorm",
  "pycharm",
  "rider",
  "rubymine",
  "resharper",
  "webstorm"
]
const vsCodeVariants = [
  "code/code",
  "code--unity-launch",
  "cursor",
  "visualstudiocode",
  "visual studio code",
  "vs code",
  "vscode",
  "vscodium",
  "windsurf"
]

export default class System {
  // some applications don't have what they're commonly referred to in their application bundle,
  // so create a set of aliases to allow people to refer to apps more naturally
  private aliases: { [key: string]: string } = {
    terminal: "term",
    vscode: "code",
    "visual studio code": "code",
  };

  constructor(private settings: Settings) {}

  applicationMatches(application: string, possible: string[]): string[] {
    let alias = application.toLowerCase();
    if (this.aliases[alias]) {
      alias = this.aliases[alias];
    }

    return possible.filter(
      (e: string) =>
        e.toLowerCase().includes(application.toLowerCase()) ||
        e.toLowerCase().includes(application.toLowerCase().replace(/\s/g, "")) ||
        e.toLowerCase().includes(alias)
    );
  }

  click(button: string = "left", count: number = 1) {
    return driver.click(button, count);
  }

  clickable(): Promise<string[]> {
    return driver.getClickableButtons();
  }

  clickButton(name: string) {
    return driver.clickButton(name);
  }

  async copy() {
    await this.pressKey("c", os.platform() == "darwin" ? ["command"] : ["control"]);
    await this.delay(300);
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async determineActiveApplication() {
    const result = (await driver.getActiveApplication()).toLowerCase();
    if (result === "system dialog") {
      return "system dialog";
    } else if (result.includes("atom")) {
      return "atom";
    } else if (

      vsCodeVariants.some(variant => result.includes(variant)) ||
      (result.split(" ").length > 0 && result.split(" ")[0].endsWith("code")) ||
      (result.split("/").length > 0 && result.split("/")[0].endsWith("code"))
    ) {
      return "vscode";
    } else if (
      jetBrainsVariants.some(variant => result.includes(variant))
    ) {
      return "jetbrains";
    } else if (
      chromeVariants.some(variant => result.includes(variant))
    ) {
      return "chrome";
    } else if (result.includes("firefox")) {
      return "firefox";
    } else if (result.includes("safari")) {
      return "safari";
    } else if (result.includes("edge")) {
      return "edge";
    } else if (result.includes("hyper")) {
      return "hyper";
    } else if (result.includes("iterm")) {
      return "iterm";
    } else if (this.isTerminal(result)) {
      return "terminal";
    } else if (result.includes("slack")) {
      return "slack";
    } else if (result.includes("electron") || result.includes("serenade")) {
      return "serenade";
    }

    return result;
  }

  getClipboard(): string {
    return clipboard.readText();
  }

  async getEditorStateWithAccessibilityApi() {
    const state: { text: string; cursor: number; error: boolean } = await driver.getEditorState();
    return {
      source: state.text,
      cursor: state.cursor,
      error: state.error,
    };
  }

  async focus(application: string) {
    try {
      await driver.focusApplication(application, this.aliases);
      await this.delay(300);
    } catch (e) {}
  }

  installedApplications() {
    return driver.getInstalledApplications();
  }

  isTerminal(app: string): boolean {
    return (
      app.includes("alacritty") ||
      app.includes("bash") ||
      app.includes("hyper") ||
      app.includes("iterm") ||
      app.includes("mintty") ||
      app.includes("msys2") ||
      app.includes("powershell") ||
      app.includes("putty") ||
      app.includes("shell") ||
      app.includes("terminal") ||
      app.includes("terminator") ||
      app.includes("warp") ||
      app.includes("xterm")
    );
  }

  launch(application: string) {
    try {
      return driver.launchApplication(application, this.aliases);
    } catch (e) {}
  }

  async paste(app: string = "") {
    const data = this.settings.getPasteKeys(app);
    await this.pressKey(data.key, data.modifiers);
    await this.delay(100);
  }

  async pressKey(key: string, modifiers: string[] = [], count: number = 1) {
    await driver.pressKey(key, modifiers, count);
    await this.delay(50);
  }

  quit(application: string) {
    return driver.quitApplication(application, this.aliases);
  }

  runningApplications(): Promise<string[]> {
    return driver
      .getRunningApplications()
      .then((applications: string[]) =>
        applications.filter(
          (e: string) => !e.includes("coreservices") && !e.includes("privateframeworks")
        )
      );
  }

  async selectAll() {
    await this.pressKey("a", os.platform() == "darwin" ? ["command"] : ["control"]);
    await this.delay(300);
  }

  async setClipboard(text: string) {
    clipboard.writeText(text);
    await this.delay(100);
  }

  typeText(text: string, app: string) {
    if (!text) {
      return;
    }

    if (!this.isTerminal(app) && this.settings.getClipboardInsert()) {
      return this.typeTextWithClipboard(text, app);
    } else {
      return this.typeTextWithKeystrokes(text);
    }
  }

  async typeTextWithClipboard(text: string, app: string) {
    const previous = this.getClipboard();
    await this.setClipboard(text);
    await this.paste(app);
    this.setClipboard(previous);
  }

  async typeTextWithKeystrokes(text: string) {
    await driver.typeText(text);
    await this.delay(50);
  }
}
