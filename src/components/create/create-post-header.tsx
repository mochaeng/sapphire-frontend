import BackButton from "../back-button";

function CreateHeader() {
  return (
    <div className="sticky top-0 z-10 flex h-14 w-full items-center gap-2 border-b-1 border-[#8a96a3]/25 bg-background p-4 text-profileHeader">
      <BackButton isStyckyHeader={false} />
      <span className="text-[19px] font-medium text-primaryOnly">NEW POST</span>
    </div>
  );
}

export default CreateHeader;
