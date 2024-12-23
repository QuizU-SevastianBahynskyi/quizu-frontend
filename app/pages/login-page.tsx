'use client';

import React from "react";
import {
  SquaredLayout,
  SquaredLayoutProps,
} from "@sevastian-bahynskyi/squared-layout";
import AuthenticationCard from "../_components/AuthenticationCard/AuthenticationCard";

const LoginPage: React.FC = () => {
  const backgroundLayoutConfig: SquaredLayoutProps = {
    net: {
      color: "black",
      width: 2,
    },
    paintedSquareRatio: 7,
    square: {
      changeToDefaultColorInterval: {
        from: 1500,
        to: 3500,
      },
      changeTransition: "1.5s ease-in-out",
      defaultColor: "#283618",
    },
  };

  return (
    <>
        <SquaredLayout {...backgroundLayoutConfig}/>
        <AuthenticationCard />
    </>
  );
};

export default LoginPage;
