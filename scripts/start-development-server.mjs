import execute from './execute.mjs';
import initializeMongodbReplSet from './initializeMongodbReplSet.mjs';

execute('docker-compose -f docker-compose-dev-mongodb.yaml up -d');

initializeMongodbReplSet()
    .then(() => {
        execute('docker-compose -f docker-compose-dev-server.yaml up -d --build');
        process.exit();
    })
