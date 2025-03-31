// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import React, { useMemo } from "react";
// import { ImageEditorDialog, MediaButtons } from "./edit-avatar-profile";

// export type ImageEditStore = {
//   crop: { x: number; y: number };
//   zoom: number;
//   rotation: number;
//   croppedAreaPixels: CroppedArea | null;
//   setCrop: (crop: { x: number; y: number }) => void;
//   setZoom: (zoom: number) => void;
//   setRotation: (rotation: number) => void;
//   setCroppedAreaPixels: (area: CroppedArea | null) => void;
// };

// type ImageEditorProps = {
//   image: string | File | null;
//   temporaryImage?: string | null;
//   onImageChange: () => void;
//   onRemoveImage: () => void;
//   onCropComplete: (file: File) => void;
//   onDialogClose: (shouldSave: boolean) => void;
//   isDialogOpen: boolean;
//   setIsDialogOpen: (open: boolean) => void;
//   aspectRatio: number;
//   shape: "circle" | "rectangle";
//   fallbackText: string;
//   store: ImageEditStore;
// };

// export const ImageEditor = React.memo(function ImageEditor({
//   image,
//   temporaryImage,
//   onImageChange,
//   onRemoveImage,
//   onCropComplete,
//   onDialogClose,
//   isDialogOpen,
//   setIsDialogOpen,
//   aspectRatio,
//   shape,
//   fallbackText,
//   store,
// }: ImageEditorProps) {
//   const getImageSrc = (img: string | File | undefined | null) => {
//     if (typeof img === "string") return img;
//     if (img instanceof File) return URL.createObjectURL(img);
//     return undefined;
//   };

//   const imageSrc = useMemo(() => getImageSrc(image), [image]);
//   const temporaryImageSrc = useMemo(
//     () => getImageSrc(temporaryImage),
//     [temporaryImage],
//   );

//   return (
//     <div className="relative">
//       <div
//         className={`relative ${shape === "circle" ? "rounded-full" : ""} border border-black`}
//       >
//         <div className={shape === "circle" ? "size-28" : "h-40 w-full"}>
//           {shape === "circle" ? (
//             <Avatar className="size-28">
//               <AvatarImage className="object-cover" src={imageSrc} />
//               <AvatarFallback className="bg-secondaryOnlyPlaceholder text-4xl font-bold text-primary">
//                 {fallbackText}
//               </AvatarFallback>
//             </Avatar>
//           ) : (
//             <div className="relative h-full w-full">
//               <img
//                 src={imageSrc || ""}
//                 className="h-full w-full object-cover"
//                 alt="Banner"
//               />
//               {!imageSrc && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-secondary">
//                   <span className="text-lg text-muted-foreground">
//                     {fallbackText}
//                   </span>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//         <MediaButtons
//           onImageChange={onImageChange}
//           onRemoveImage={onRemoveImage}
//         />
//       </div>

//       <ImageEditorDialog
//         isOpen={isDialogOpen}
//         setIsOpen={setIsDialogOpen}
//         imageSrc={temporaryImageSrc}
//         onCropComplete={onCropComplete}
//         onDialogClose={onDialogClose}
//         aspectRatio={aspectRatio}
//         store={store}
//       />
//     </div>
//   );
// });
