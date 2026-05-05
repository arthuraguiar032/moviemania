import "@/styles/globals.css";

import MainContainer from "@/components/Layout/MainContainer";

export default function App({ Component, pageProps }) {
  return (
    <MainContainer>
      <Component {...pageProps} />;
    </MainContainer>
  );
}
