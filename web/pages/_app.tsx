import "../styles/globals.css";
import type { AppProps } from "next/app";
import Provider, { useAuth } from "../context/User";
import Modal from "react-modal";
import { useContext, useEffect, useRef, useState } from "react";
import React from "react";
import AlertBox from "../components/shared/AlertBox";
import axios from "axios";

// ? For Global Alert ---

type TAlert = "error" | "message";

interface IAlert {
  alert: { type?: TAlert; message: string };
  setAlert: React.Dispatch<
    React.SetStateAction<{ type?: TAlert; message: string }>
  >;
}

export const AlertContext = React.createContext<IAlert>({
  alert: {
    type: "message",
    message: "",
  },
  setAlert: () => {},
});

export function useAlert() {
  return useContext(AlertContext);
}

// ? --- Ends

function MyApp({ Component, pageProps }: AppProps) {
  const [alert, setAlert] = useState<{ type?: TAlert; message: string }>({
    type: "error",
    message: "",
  });

  const modalRef = useRef<any>();

  Modal.setAppElement(modalRef.current);
  useEffect(() => {
    let resetAlert: any;

    if (alert?.message !== "") {
      resetAlert = setTimeout(() => {
        setAlert({
          message: "",
        });
      }, 2000); // 2 seconds
    }

    return () => clearTimeout(resetAlert);
  }, [alert]);

  const value = {
    alert: alert,
    setAlert: setAlert,
  };

  return (
    <Provider>
      <AlertContext.Provider value={value}>
        <AlertBox
          type={alert!.type || "error"}
          message={alert!.message}
          show={alert?.message.trim() !== ""}
        />

        <Component {...pageProps} />
      </AlertContext.Provider>
      <div id="modal" ref={modalRef}></div>
    </Provider>
  );
}

export default MyApp;
