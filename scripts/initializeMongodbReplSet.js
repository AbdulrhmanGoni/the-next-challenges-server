import execute from './execute.js';

export default async function initializeMongodbReplSet() {
  return new Promise((resolve, reject) => {
    let tries = 5;
    setInterval(() => {
      if (tries) {
        try {
          tries--;
          execute("docker exec primary-mongodb-container bash ./scripts/initialize-mongodb-replSet.sh");
          resolve()
        } catch (e) {
          console.log('Failed to connect to the primary database');
          console.log('Retrying...\n');
        }
      } else {
        reject()
        process.exit(1);
      }
    }, 2000);
  })
};
