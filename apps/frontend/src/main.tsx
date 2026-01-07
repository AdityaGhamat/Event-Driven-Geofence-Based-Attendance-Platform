import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import { RouterProvider } from "react-router";
import { routes } from "./routes/index.tsx";
import { AuthProvider } from "./modules/auth/context/AuthContext.tsx";
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={12}
        containerStyle={{
          top: 20,
          right: 20,
        }}
        toastOptions={{
          className: "",
          style: {
            background: "transparent",
            boxShadow: "none",
            border: "none",
            padding: 0,
          },
        }}
      />
      <RouterProvider router={routes} />
    </AuthProvider>
  </QueryClientProvider>
);
