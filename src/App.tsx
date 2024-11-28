import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import Root from "./pages/Root";
import AuthProvider from "./provider/auth/AuthProvider";
import ProfilePage from "./pages/ProfilePage";
import ProtectedLayout from "./pages/ProtectedLayout";
import { ThemeProvider } from "./provider/theme/ThemeProvider";
import AuthUserProvider from "./provider/auth/AuthUserProvider";

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
    <AuthProvider>
      <AuthUserProvider>
        <ThemeProvider defaultTheme="light" storageKey="sapphire-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthUserProvider>
    </AuthProvider>
  );
}

export default App;
