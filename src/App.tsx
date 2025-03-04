import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Root from "./pages/root";
import ErrorPage from "./pages/error-page";
import HomePage from "./pages/home-page";
import ProfilePage from "./pages/profile-page";
import ProtectedLayout from "./pages/protected-layout";
import AuthUserProvider from "./provider/auth/auth-user-provider";
import { ThemeProvider } from "./provider/theme/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreatePage from "./pages/create-page";
import OAuthSuccess from "./components/auth/oauth-success";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ":username", element: <ProfilePage /> },
      {
        path: "auth",
        children: [{ path: "oauth-success", element: <OAuthSuccess /> }],
      },
      {
        path: "posts",
        children: [
          { index: true, element: <ErrorPage /> },
          { path: "create", element: <CreatePage /> },
        ],
      },
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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthUserProvider>
        <ThemeProvider defaultTheme="light" storageKey="sapphire-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthUserProvider>
    </QueryClientProvider>
  );
}

export default App;
