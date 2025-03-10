import { X } from "lucide-react";

function MediaFormVisualizer({
  files,
  onRemoveFile,
}: {
  files: File[];
  onRemoveFile: (index: number) => void;
}) {
  return (
    <div className="flex gap-2 px-4">
      {files.map((file, index) => (
        <div key={index} className="relative">
          {file.type.startsWith("image/") ? (
            <img
              src={URL.createObjectURL(file)}
              alt={`upload-${index}`}
              className="size-64 rounded object-cover"
            />
          ) : (
            <video
              src={URL.createObjectURL(file)}
              className="size-64 rounded object-cover"
              controls
            />
          )}

          <button
            onClick={() => onRemoveFile(index)}
            className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black"
          >
            <X size={22} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default MediaFormVisualizer;
