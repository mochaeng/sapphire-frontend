const bannerURL =
  "https://i.pinimg.com/736x/dc/52/7c/dc527c727f6bf1eaa25ca7ea896ad27e.jpg";

function UserBanner() {
  return (
    <div className="relative">
      <div className="h-[180px] after:absolute after:inset-0 after:bg-gradient-to-b after:from-black after:bg-[length:100%_144px] after:bg-no-repeat after:opacity-40 after:content-['']">
        <img className="h-full w-full object-cover" src={bannerURL} />
      </div>
    </div>
  );
}

export default UserBanner;
