import { IConfigParams } from "./NinjaProps";

export const InitMobileConfipParams: IConfigParams = {
  shadowResolution: 256,
  antialias: false,
  autoScale: true,
  mapsize: 64,
  layerGridNum: 8,
  cameraFar: 500,
  lodDistance: 25,
  dpr: 1,
  viewGridLength: 4,
};

export const InitTabletConfipParams: IConfigParams = {
  shadowResolution: 512,
  antialias: true,
  autoScale: true,
  mapsize: 256,
  layerGridNum: 32,
  cameraFar: 750,
  lodDistance: 50,
  dpr: [1, 1.5],
  viewGridLength: 4,
};

const isBrowser = typeof window !== "undefined";
const dpr = isBrowser ? window.devicePixelRatio : 1;
export const InitDesktopConfipParams: IConfigParams = {
  shadowResolution: 1024,
  antialias: true,
  autoScale: true,
  mapsize: 1024,
  layerGridNum: 64,
  cameraFar: 1000,
  lodDistance: 100,
  dpr: dpr,
  viewGridLength: 4,
};
