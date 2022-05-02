import { zoomState } from 'models';
import instance from './instance';

export const createZoom = (zoom: zoomState) => {
  const url = '/create/zoom';
  return instance.post(url, zoom);
};
