import execute from './execute.js';
import initializeMongodbReplSet from './initializeMongodbReplSet.js';

execute('docker-compose -f docker-compose-dev-mongodb.yaml up -d');

initializeMongodbReplSet()
    .then(() => {
        execute('docker-compose -f docker-compose-dev-server.yaml up -d');
        process.exit();
    })
