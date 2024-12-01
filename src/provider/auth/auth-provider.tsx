// import { useEffect, useState } from "react";
// import { AuthContext } from "./auth-context";
// import { authStatus } from "@/lib/api/auth";

// export default function AuthProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     async function checkAuthStatus() {
//       try {
//         setIsAuthenticated(await authStatus());
//       } catch (error) {
//         console.log("error checking auth status:", error);
//         setIsAuthenticated(false);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     checkAuthStatus();
//   }, []);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
