import { Input } from "antd";
import * as S from "./styles";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("login", userEmail, userPassword);
    let username = "admin";
    localStorage.setItem("user", username);
    navigate("/");
  };

  useEffect(() => {
    if (!!localStorage.getItem("user")) {
      navigate("/");
    }
  }, [localStorage.getItem("user")]);
  return (
    <>
      <S.PageWrapper>
        <S.FormWrapper>
          <S.Title>Let's Snack ADM</S.Title>
          <S.StyledInput
            size="large"
            placeholder="Email"
            prefix={<MailOutlined />}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          />
          <S.StyledInputPassword
            size="large"
            placeholder="Senha"
            prefix={<LockOutlined />}
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          />
          <S.StyledButton type="primary" onClick={handleLogin}>
            Entrar
          </S.StyledButton>
        </S.FormWrapper>
      </S.PageWrapper>
    </>
  );
};
