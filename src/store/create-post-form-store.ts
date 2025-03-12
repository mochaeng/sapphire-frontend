import { create } from "zustand";

type FormState = {
  files: File[];
  setFiles: (files: File[]) => void;
};

const useCreatePostFormStore = create<FormState>((set) => ({
  files: [],
  setFiles: (files: File[]) => {
    set({ files });
  },
}));

export default useCreatePostFormStore;
