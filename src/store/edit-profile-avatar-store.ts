import { create } from "zustand";

export type CroppedArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};

// export type Point = {
//   x: number;
//   y: number;
// };

type ProfileAvatarStore = {
  crop: { x: number; y: number };
  rotation: number;
  zoom: number;
  setCrop: (crop: { x: number; y: number }) => void;
  setRotation: (rotation: number) => void;
  setZoom: (zoom: number) => void;
  croppedAreaPixels: {
    width: number;
    height: number;
    x: number;
    y: number;
  };
  setCroppedAreaPixels: (area: {
    width: number;
    height: number;
    x: number;
    y: number;
  }) => void;
};

export const croppedAreaDefault: CroppedArea = {
  height: 0,
  width: 0,
  x: 0,
  y: 0,
};

export const useProfileAvatarStore = create<ProfileAvatarStore>((set) => ({
  crop: { x: 0, y: 0 },
  setCrop: (crop) => set({ crop }),
  rotation: 0,
  setRotation: (rotation) => set({ rotation }),
  zoom: 1,
  setZoom: (zoom) => set({ zoom }),
  croppedAreaPixels: croppedAreaDefault,
  setCroppedAreaPixels: (croppedAreaPixels) => set({ croppedAreaPixels }),
}));
