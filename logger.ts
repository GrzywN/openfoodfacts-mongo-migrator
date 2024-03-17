import initLogger from "pino";

const logger = initLogger();
const applyLogMessage = (filenameWithExtension: string) => (message: string) =>
  `${filenameWithExtension}: ${message}`;

export { logger, applyLogMessage };
