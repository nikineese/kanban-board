import "normalize.css/normalize.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import React from "react";
import "@/shared/lib/ui/styles.css";
import { wrapper } from "@/entities/redux";

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
}

export default App;
