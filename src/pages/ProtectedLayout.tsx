import { Outlet } from "react-router-dom";

function ProtectedLayout() {
  return (
    <div>
      Protected router
      <Outlet />
    </div>
  );
}

export default ProtectedLayout;
