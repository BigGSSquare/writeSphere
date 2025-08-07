import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./app/store.js"; // good practice to export persistor from store.js
import { Provider } from "react-redux";
import ScrollToTop from "./components/ScrolltoTop.jsx";
import { PrimeReactProvider } from "primereact/api";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PrimeReactProvider>
            <ScrollToTop />
            <App />
          </PrimeReactProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
