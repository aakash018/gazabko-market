import React from "react";
import Button from "./Button";
import { TbArrowBack } from "react-icons/tb";
import { useRouter } from "next/router";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      icon={<TbArrowBack />}
      onClick={() => {
        router.back();
      }}
    >
      Back
    </Button>
  );
};

export default BackButton;
