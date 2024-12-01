function RightSidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-rose hidden lg-2:flex lg-2:w-full lg-2:max-w-rightWrapper lg-2:justify-center">
      <div className="flex h-screen w-full max-w-[378px] flex-col p-4 lg-2:sticky lg-2:top-0">
        {children}
      </div>
    </div>
  );
}

export default RightSidebar;
