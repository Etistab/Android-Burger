/**
 * Represents the possible values for the API's endpoints HTTP methods.
 */
type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

/**
 * Represents a configurable object you can pass to a Route to define specific behavior.
 */
interface RouteOptions {
  update?: boolean;
  admin?: boolean;
  auth?: boolean;
}

/**
 * Represents a route of the API.
 */
interface Route {
  method: HttpMethod;
  path: string;
  handler: (...args: any) => Promise<any>;
  options?: RouteOptions;
}

/**
 * Represents an array of routes to be mounted on the given path.
 */
interface Path {
  path: string;
  routes: Route[];
}
