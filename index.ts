import { MongoClient } from "mongodb";
import { logger, applyLogMessage } from "./logger";

const logMessage = applyLogMessage("index.ts");

const sl: Partial<{
  db: MongoClient;
}> = {};

main().finally(closeDatabaseConnection);

async function main() {
  validatedEnv();
  await mongoConnected();
  migrateData();
}

function validatedEnv() {
  const envKeys = ["MONGODB_URI"];

  for (const key of envKeys) {
    if (process.env[key] == null) {
      const error = new Error(logMessage(`process.env.${key} is null`));

      logger.error(error);
      throw error;
    }
  }

  logger.info(logMessage("Environmental variables validated successfully"));
}

async function mongoConnected() {
  logger.info(logMessage("Initializing MongoClient"));

  try {
    var client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
  } catch (databaseError) {
    logger.error(databaseError);
    throw databaseError;
  }

  sl.db = client;

  logger.info(logMessage("MongoClient initialized successfully"));
}

function migrateData() {
  logger.info(logMessage("Starting the process of migrating data"));

  logger.warn(logMessage("TODO: implement migrating data process"));

  logger.info(logMessage("Process of migrating data completed successfully"));
}

function closeDatabaseConnection() {
  logger.info(logMessage("Closing connection in MongoClient"));

  sl?.db?.close();
}
