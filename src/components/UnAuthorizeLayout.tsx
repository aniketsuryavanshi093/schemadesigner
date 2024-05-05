import React from "react";

const UnAuthorizeLayout = ({ children }: { children: React.JSX.Element }) => {
  return (
    <main className="flex flex-row items-center justify-center bg-white ">
      {children}
    </main>
  );
};

export default UnAuthorizeLayout;
