import "@css/loading.css";
import "@css/main.css";
import "@css/style.bundle.css";
import "@public/assets/plugins/global/plugins.bundle.css";
import "@public/assets/plugins/custom/vis-timeline/vis-timeline.bundle.css";
import "@public/assets/plugins/custom/datatables/datatables.bundle.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import { PersistGate } from "redux-persist/integration/react";
import { wrapper, store, Persistor } from "../redux/store";
import { Provider } from "react-redux";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import LoadingView from "@/components/LoadingView";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={<LoadingView />} persistor={Persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
      <ToastContainer />
    </>
  );
}
