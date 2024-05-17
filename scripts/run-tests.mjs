import { argv } from 'process';
import execute from './execute.mjs';
import initializeMongodbReplSet from './initializeMongodbReplSet.mjs';

const target = argv[2] || "all";

if (target === "units") {
    execute('yarn test:units');
    process.exit();
} else {
    execute('docker-compose -f docker-compose-testing-mongodb.yaml up -d');

    initializeMongodbReplSet()
        .then(() => {
            execute(`yarn test:${target}`);
            process.exit();
        })
}
