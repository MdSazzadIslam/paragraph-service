import app from "./app";
import { errorHandler, notFoundErrorHandler } from "./middlewares/apiErrorHandler";
import { config } from "dotenv";

config();
/**
 * An IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined.
 * This prevents accessing variables within the IIFE idiom as well as polluting the global scope.
 * The primary reason to use an IIFE is to obtain data privacy.
 * Because JavaScript's var scopes variables to their containing function,
 * any variables declared within the IIFE cannot be accessed by the outside world.
 */
(() => {
  app.use(errorHandler);
  app.use(notFoundErrorHandler);
  const PORT: number = parseInt(process.env.PORT as string);
  app
    .listen(PORT, () => {
      console.log("##########################################################");
      console.log("#####               STARTING SERVER                  #####");
      console.log("##########################################################\n");
      console.log(`Server running → PORT ${PORT}`);
    })
    .on("error", e => {
      console.error(e);
    });
})();
