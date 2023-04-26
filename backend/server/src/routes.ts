import { RequestHandler, Request, Response } from 'express';
import { IRouteItem } from './utils/interface/IRouteTiem';
import { CrossChannelRoutes } from './routes/CrossChannelRoute';

export const AppRoutes: IRouteItem[] = [...CrossChannelRoutes];
