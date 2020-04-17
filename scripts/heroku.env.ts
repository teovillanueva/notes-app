import fs from "fs";
import path from "path";
import readline from "readline";

import { exec } from "child_process";

(async () => {
    const fileStream = fs.createReadStream(path.join(__dirname, "../.env.production"));

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        if (line) {
            exec(`heroku config:set ${line}`, (error, stdout) => {
                if (error) console.log(error);
                console.log(stdout);
            })
        }
    }
})()