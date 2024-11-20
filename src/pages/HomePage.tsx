// import AuthPanel from "@/components/auth/AuthPanel";
import Header from "@/components/header";

function HomePage() {
  return (
    <div className="flex w-full justify-center">
      {/* <AuthPanel /> */}
      <div className="flex w-full max-w-screen-2xl justify-center">
        <Header />
        <div className="flex w-full max-w-[1016px]">
          <div className="h-2 w-full bg-rose-600"></div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
