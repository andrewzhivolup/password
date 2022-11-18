import React, { useEffect, useState } from "react";
import { Button, Slider, Switch, Typography } from "antd";
import "./Main.scss";

const Main = () => {
  const { Paragraph } = Typography;
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(10);
  const [upperCaseBool, setUpperCaseBool] = useState(true);
  const [lowerCaseBool, setLowerCaseBool] = useState(true);
  const [numbersBool, setNumbersBool] = useState(true);
  const [specialSimbolsBool, setSpecialSimbolsBool] = useState(true);

  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "1234567890";
  const specialSimbols = "!@#$%^&*()-_+=;:,./?\\|`~[]{}";
  useEffect(() => {
    generatePassword();
  }, [
    passwordLength,
    upperCaseBool,
    lowerCaseBool,
    numbersBool,
    specialSimbolsBool,
  ]);

  const generatePassword = () => {
    let charset = "";
    if (upperCaseBool) charset += letters.toUpperCase();
    if (lowerCaseBool) charset += letters;
    if (numbersBool) charset += numbers;
    if (specialSimbolsBool) charset += specialSimbols;
    let password = "";
    console.log(charset);
    for (let i = 0; i < passwordLength; ++i) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(password);
  };
  const trueColor = "#a1db84";
  const falseColor = "#ff6e6e";
  const blackColor = "#000";
  const min = 4;
  const max = 32;
  const marks = {
    [min]: {
      style: {
        color: blackColor,
      },
      label: min,
    },
    [max]: {
      style: {
        color: blackColor,
      },
      label: max,
    },
  };
  return (
    <div className="main">
      <Paragraph
        className="paragraph"
        style={{
          color: passwordLength < 10 ? falseColor : trueColor,
        }}
        copyable
      >
        {password}
      </Paragraph>
      <div className="slider">
        <Slider
          defaultValue={passwordLength}
          min={min}
          max={max}
          marks={marks}
          tooltip={{ open: true }}
          onChange={(value) => {
            setPasswordLength(value);
          }}
        />
        <p className="slider__name">Длина пароля</p>
      </div>
      <div className="switch-group">
        <div className="switch-group__charset-element">
          <p className="switch-group__charset-element__name">Прописные буквы</p>
          <Switch
            disabled={
              !lowerCaseBool && !numbersBool && !specialSimbolsBool
                ? true
                : false
            }
            className="switch-group__charset-element__switch"
            defaultChecked
            onChange={(value) => {
              setUpperCaseBool(value);
            }}
          />
        </div>
        <div className="switch-group__charset-element">
          <p className="switch-group__charset-element__name">Строчные</p>
          <Switch
            disabled={
              !upperCaseBool && !numbersBool && !specialSimbolsBool
                ? true
                : false
            }
            defaultChecked
            onChange={(value) => {
              setLowerCaseBool(value);
            }}
          />
        </div>
        <div className="switch-group__charset-element">
          <p className="switch-group__charset-element__name">Цифры</p>
          <Switch
            disabled={
              !upperCaseBool && !lowerCaseBool && !specialSimbolsBool
                ? true
                : false
            }
            defaultChecked
            onChange={(value) => {
              setNumbersBool(value);
            }}
          />
        </div>
        <div className="switch-group__charset-element">
          <p className="switch-group__charset-element__name">
            Специальные символы
          </p>
          <Switch
            disabled={
              !upperCaseBool && !lowerCaseBool && !numbersBool ? true : false
            }
            defaultChecked
            onChange={(value) => {
              setSpecialSimbolsBool(value);
            }}
          />
        </div>
      </div>
      <Button className="button" type="primary" onClick={generatePassword}>
        Сгенерировать
      </Button>
    </div>
  );
};

export default Main;
