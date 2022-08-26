import type { AppProps } from "next/app";
import "../styles/index.css";
import "../styles/variables.css";
import Navbar from "../components/ui/Navbar";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import "leaflet/dist/leaflet.css";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import Footer from "../components/ui/Footer";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Hydrate state={pageProps.dehydratedState}>
          <Head>
            <title>ITDb</title>
          </Head>

          <div className="main-body">
            <Navbar />
            <Component {...pageProps} />
          </div>
          <Footer />
        </Hydrate>
        <ToastContainer autoClose={2000} />
      </QueryClientProvider>

      <style jsx>{`
        .main-body {
          min-height: 100vh;
        }
      `}</style>
    </>
  );
}
