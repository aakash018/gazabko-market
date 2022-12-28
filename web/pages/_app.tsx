import "../styles/globals.css";
import type { AppProps } from "next/app";
import Provider, { useAuth } from "../context/User";
import Modal from "react-modal";
import { useContext, useEffect, useRef, useState } from "react";
import React from "react";
import AlertBox from "../components/shared/AlertBox";
import axios from "axios";
import { Cart } from "../@types/global";

// ? For Global Alert ---

type TAlert = "error" | "message";

interface IAlert {
  alert: { type?: TAlert; message: string };
  setAlert: React.Dispatch<
    React.SetStateAction<{ type?: TAlert; message: string }>
  >;
}

interface ICart {
  cart: Cart | null;
  setCart: React.Dispatch<React.SetStateAction<Cart | null>> | null;
}

export const AlertContext = React.createContext<IAlert>({
  alert: {
    type: "message",
    message: "",
  },
  setAlert: () => {},
});

export const CartContext = React.createContext<ICart>({
  cart: {
    products: [],
    subTotal: 0,
    totalProducts: 0,
  },
  setCart: () => {},
});

export function useAlert() {
  return useContext(AlertContext);
}

export function useCart() {
  return useContext(CartContext);
}

// ? --- Ends

function MyApp({ Component, pageProps }: AppProps) {
  const [alert, setAlert] = useState<{ type?: TAlert; message: string }>({
    type: "error",
    message: "",
  });
  const [cart, setCart] = useState<Cart | null>(null);

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

  const cartValue = {
    cart: cart,
    setCart: setCart,
  };

  return (
    <Provider>
      <AlertContext.Provider value={value}>
        <CartContext.Provider value={cartValue}>
          <AlertBox
            type={alert!.type || "error"}
            message={alert!.message}
            show={alert?.message.trim() !== ""}
          />

          <Component {...pageProps} />
        </CartContext.Provider>
      </AlertContext.Provider>
      <div id="modal" ref={modalRef}></div>
    </Provider>
  );
}

export default MyApp;
