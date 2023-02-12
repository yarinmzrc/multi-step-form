import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FormProvider } from "./contexts/FormContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FormProvider>
      <App />
    </FormProvider>
  </React.StrictMode>
);
