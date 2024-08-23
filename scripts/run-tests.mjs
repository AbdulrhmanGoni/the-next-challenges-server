import { argv } from 'process';
import execute from './execute.mjs';
import initializeMongodbReplSet from './initializeMongodbReplSet.mjs';
import getTestingENV from './getTestingENV.mjs';

const target = argv[2] || "all";
let skipRunningDatabase = false;

for (let index = 3; index < argv.length; index++) {
    if (argv[index] === "--skip-db") {
        skipRunningDatabase = true
    }
}

const envVariables = getTestingENV();

if (target === "units") {
    execute('yarn test:units', envVariables);
    process.exit();
} else {
    if (skipRunningDatabase) {
        execute(`yarn test:${target}`, envVariables);
    } else {
        execute('yarn test:run-db');
        initializeMongodbReplSet()
            .then(() => {
                execute(`yarn test:${target}`, envVariables);
                process.exit();
            })
    }
}
