import { readFileSync } from "fs";

export default function getTestingENV() {
    const envText = readFileSync(".env.test.local", { encoding: "utf-8" })
    const env = {}
    envText.split("\n").forEach((line) => {
        const [name, value] = line.split("=")
        Object.assign(env, { [name]: value })
    })

    return env
};
