import React from "react";
import Header from "@/components/layout/Header";

const BoardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default BoardLayout;
