import figlet from "figlet";
import chalk from "chalk";
import { infoLog } from "./logger";

export function appBanner() {
    const banner = chalk.cyan(
        figlet.textSync("Payway Manager", {
            horizontalLayout: "default",
            verticalLayout: "default",
            width: 50,
            whitespaceBreak: true,
        })
    );
    infoLog(banner)
}