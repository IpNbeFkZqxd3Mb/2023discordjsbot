import { RequestHandler, Request, Response } from 'express';
export interface IRouteItem {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete';
  middlewares: RequestHandler[];
}
