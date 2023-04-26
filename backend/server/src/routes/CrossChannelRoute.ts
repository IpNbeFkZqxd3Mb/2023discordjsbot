import { IRouteItem } from '../utils/interface/IRouteTiem';
import * as CrossChannelController from '../controllers/CrossChannelController';

export const CrossChannelRoutes: IRouteItem[] = [
  {
    path: '/cross_channel/',
    method: 'get',
    middlewares: [CrossChannelController.getAllCrossChannel],
  },
  {
    path: '/channel/',
    method: 'get',
    middlewares: [CrossChannelController.getAllChannel],
  },
  {
    path: '/cross_channel/',
    method: 'post',
    middlewares: [CrossChannelController.save],
  },
];
