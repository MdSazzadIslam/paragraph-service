import { ContentRoute } from "./contentRoute";

/**
 * Init Express REST routes
 * @returns {void}
 */

class Routes {
  private prefix: string = "/api/v1/contentpass";
  public routes(app): void {
    app.use(this.prefix, new ContentRoute().router);
  }
}
export { Routes };
