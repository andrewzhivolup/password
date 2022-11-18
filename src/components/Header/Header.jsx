import React, { useEffect, useState } from "react";
import "./Header.scss";

const Header = () => {
  const [password, setPassword] = useState("Password");
  useEffect(() => {
    setTimeout(() => {
      setPassword(passwordTitleSwap());
    }, 3000);
  }, [password]);

  const passwordTitleSwap = () => {
    const titleList = [
      "Password",
      "P@ssword",
      "passWord",
      "pAsSwOrD",
      "PaSsWoRd",
      "pASSword",
      "=^.__.^=",
    ];
    titleList.sort(() => Math.random() - 0.5);

    return password !== titleList[0] ? titleList[0] : titleList[1];
  };

  return (
    <div className="header">
      <h1 className="h1">{password} Generator</h1>
    </div>
  );
};

export default Header;
