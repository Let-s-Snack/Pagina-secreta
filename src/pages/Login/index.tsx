import { Input, notification, Spin } from "antd";
import * as S from "./styles";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [token, setToken] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!!localStorage.getItem("user")) {
      navigate("/");
    }
  }, [localStorage.getItem("user")]);

  const handleGenerateToken = () => {
    if (userEmail && userPassword) {
      setIsLoading(true);
      const bodyAuth = {
        email: userEmail,
        password: userPassword,
      };
      fetch(
        "http://ec2-52-20-248-152.compute-1.amazonaws.com:8080/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyAuth),
        }
      )
        .then((response) => {
          if (!response.ok) {
            setIsLoading(false);
            throw new Error("Erro na requisição: " + response.status);
          }
          return response.json();
        })
        .then((responseData) => {
          setToken(responseData?.message);
        })
        .catch((error) => {
          setIsLoading(false);
          notification.open({
            type: "error",
            message: `Erro na chamada da API: ${error}`,
          });
        });
      return;
    }
    notification.open({
      type: "error",
      message: "Todos os campos devem estar preenchidos!",
    });
  };

  useEffect(() => {
    if (token) {
      fetch(
        `http://ec2-52-20-248-152.compute-1.amazonaws.com:8080/administrator/findAdministratorByEmailAndPassword?email=${userEmail}&password=${userPassword}`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            setIsLoading(false);
            throw new Error("Erro na requisição: " + response.status);
          }
          return response.json();
        })
        .then((responseData) => {
          localStorage.setItem("userName", responseData.name);
          localStorage.setItem("userEmail", userEmail);
          localStorage.setItem("userPassword", userPassword);
          localStorage.setItem("authToken", token);
          setIsLoading(false);
          navigate("/");
        })
        .catch((error) => {
          setIsLoading(false);
          notification.open({
            type: "error",
            message: `Erro na chamada da API: ${error}`,
          });
        });
    }
  }, [token]);
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
          <S.StyledButton type="primary" onClick={handleGenerateToken}>
            Entrar
          </S.StyledButton>
        </S.FormWrapper>
        {isLoading && <Spin fullscreen />}
      </S.PageWrapper>
    </>
  );
};
