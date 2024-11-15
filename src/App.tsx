import "./App.css";
import AuthPanel from "./components/auth/AuthPanel";

function App() {
  return (
    <div className="flex w-full justify-center">
      <AuthPanel />
      {/* <div className="max-w-screen-2xl">
        <Header />
        <div className="flex w-full max-w-[1016px]">
          <div className="h-2 w-full bg-rose-600"></div>
        </div>
      </div> */}
    </div>
  );
}

export default App;
