import { create } from "zustand";

type ProfileAvatarStore = {
  crop: { x: number; y: number };
  rotation: number;
  zoom: number;
  croppedAreaPixels: any;
  croppedImage: string | null;
  setCrop: (crop: { x: number; y: number }) => void;
  setRotation: (rotation: number) => void;
  setZoom: (zoom: number) => void;
  setCroppedAreaPixels: (area: any) => void;
  setCroppedImage: (image: string | null) => void;
};

export const useProfileAvatarStore = create<ProfileAvatarStore>((set) => ({
  crop: { x: 0, y: 0 },
  rotation: 0,
  zoom: 1,
  croppedAreaPixels: null,
  croppedImage: null,
  setCrop: (crop) => set({ crop }),
  setRotation: (rotation) => set({ rotation }),
  setZoom: (zoom) => set({ zoom }),
  setCroppedAreaPixels: (area) => set({ croppedAreaPixels: area }),
  setCroppedImage: (image) => set({ croppedImage: image }),
}));
