import clc from "cli-color";

class LogService {
    public log(msg: string) {
        console.log((clc as any).green(msg));
    }

    public error(msg: string) {
        console.log((clc as any).red(msg));
    }
}
export const logService = new LogService();

