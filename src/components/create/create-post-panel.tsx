import CreatePostForm from "./create-post-form";
import CreateHeader from "./create-post-header";

function CreatePanel() {
  return (
    <div className="w-full">
      <CreateHeader />
      <CreatePostForm />
    </div>
  );
}

export default CreatePanel;
