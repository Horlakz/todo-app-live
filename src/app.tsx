import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";

import "./styles/globals.scss";

import QueryClientProvider from "./providers/query-client";
import TodoProvider from "./providers/todo";
import Router from "./router";
import ErrorFallback from "./ui/ErrorFallback";

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
    >
      <TodoProvider>
        <QueryClientProvider>
          <Router />

          <Toaster
            position="bottom-left"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: { duration: 5000 },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                // backgroundColor: "var(--color-grey-0)",
                backgroundColor: "bg-red-500",
                color: "bg-red-100",
              },
            }}
          />
        </QueryClientProvider>
      </TodoProvider>
    </ErrorBoundary>
  );
}

export default App;
