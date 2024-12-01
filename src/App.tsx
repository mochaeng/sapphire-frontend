import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Root from "./pages/root";
import ErrorPage from "./pages/error-page";
import HomePage from "./pages/home-page";
import ProfilePage from "./pages/profile-page";
import ProtectedLayout from "./pages/protected-layout";
// import AuthProvider from "./provider/auth/auth-provider";
import AuthUserProvider from "./provider/auth/auth-user-provider";
import { ThemeProvider } from "./provider/theme/theme-provider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ":username", element: <ProfilePage /> },
      { path: "posts" },
      {
        path: "my",
        element: <ProtectedLayout />,
        children: [
          { path: "notifications" },
          { path: "messages" },
          { path: "collections" },
        ],
      },
    ],
  },
]);

function App() {
  return (
    // <AuthProvider>
    <AuthUserProvider>
      <ThemeProvider defaultTheme="light" storageKey="sapphire-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthUserProvider>
    // </AuthProvider>
  );
}

export default App;
