import React, { useEffect, useState } from "react";
import "./Header.scss";

const Header = () => {
  const [password, setPassword] = useState("Password");
  const seconds = 3;

  useEffect(() => {
    setTimeout(() => {
      setPassword(passwordTitleSwap());
    }, seconds * 1000);
  }, [password]);

  /**
   * Функция, которая перемешивает элементы массива titleList и возвращает случайный элемент массива.
   * @return {string} Один из элементов массива titleList.
   */
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
