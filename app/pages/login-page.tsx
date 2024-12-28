'use client';

import React from "react";
import {
  SquaredLayout,
  SquaredLayoutProps,
} from "@sevastian-bahynskyi/squared-layout";
import AuthenticationForm from "../_components/AuthenticationForm/AuthenticationForm";

const LoginPage: React.FC = () => {
  const backgroundLayoutConfig: SquaredLayoutProps = {
    net: {
      color: "black",
      width: 2,
    },
    paintedSquareRatio: 10,
    square: {
      changeToDefaultColorInterval: {
        from: 1500,
        to: 4500,
      },
      changeTransition: "1.5s ease-in-out",
      defaultColor: "rgba(129, 0, 217, 0.57)",
    },
  };

  return (
    <>
        <SquaredLayout {...backgroundLayoutConfig}/>
        <AuthenticationForm />
    </>
  );
};

export default LoginPage;
