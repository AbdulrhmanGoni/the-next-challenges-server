import { argv } from 'process';
import execute from './execute.mjs';
import initializeMongodbReplSet from './initializeMongodbReplSet.mjs';
import getTestingENV from './getTestingENV.mjs';

const target = argv[2] || "all";

const envVariables = getTestingENV();

if (target === "units") {
    execute('yarn test:units', envVariables);
    process.exit();
} else {
    execute('docker-compose -f docker-compose-testing-mongodb.yaml up -d');

    initializeMongodbReplSet()
        .then(() => {
            execute(`yarn test:${target}`, envVariables);
            process.exit();
        })
}
