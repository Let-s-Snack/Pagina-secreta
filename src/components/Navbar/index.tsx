import {
  BarChartOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Divider, Layout } from "antd";
import { useEffect, useState } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];
export const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [userDatas, setUserDatas] = useState({
    username: localStorage.getItem("userName"),
    email: localStorage.getItem("userEmail"),
    password: localStorage.getItem("userPassword"),
    authToken: localStorage.getItem("authToken"),
  });
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    localStorage.clear();
  };

  const handleBiFormClick = () => {
    fetch(
      "https://spring-redis-dev.onrender.com/dashboardForms/incrementarContadorDashboardForms",
      {
        method: "POST",
      }
    );
  };

  const handleBiAppClick = () => {
    fetch(
      "https://spring-redis-dev.onrender.com/dashboardApp/incrementarContadorDashboardApp",
      {
        method: "POST",
      }
    );
  };

  const items: MenuItem[] = [
    {
      key: "1",
      label: "Pesquisa de mercado",
      onClick: () => {
        navigate("/");
        handleBiAppClick();
      },
      icon: <BarChartOutlined />,
    },
    {
      key: "2",
      label: "Avaliações da ExpoTech",
      onClick: () => {
        navigate("/bi2");
        handleBiFormClick();
      },
      icon: <PieChartOutlined />,
    },
    {
      key: "3",
      label: userDatas.username,
      icon: <Avatar size={20} icon={<UserOutlined />} />,
      children: [
        {
          key: "3-1",
          label: "Sair",
          onClick: handleLogout,
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  const fetchToken = () => {
    if (userDatas.email?.length && userDatas.password?.length) {
      const bodyAuth = {
        email: userDatas.email,
        password: userDatas.password,
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
            localStorage.clear();
            navigate("/login");
            throw new Error("Erro na requisição: " + response.status);
          }
          return response.json();
        })
        .then((responseData) => {
          localStorage.setItem("authToken", responseData.message);
        })
        .catch(() => {
          handleLogout();
        });
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("userEmail") &&
      localStorage.getItem("userPassword") &&
      localStorage.getItem("authToken")
    ) {
      fetchToken();
      const intervalId = setInterval(() => {
        fetchToken();
      }, 180000);
      return () => clearInterval(intervalId);
    } else {
      handleLogout();
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      handleLogout();
    }
  }, [localStorage.getItem("authToken")]);
  return (
    <>
      <Layout.Sider
        width={256}
        collapsedWidth="4.7rem"
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        theme="light"
        onBreakpoint={(broken) => {
          setCollapsed(broken);
        }}
        trigger={
          <S.SiderTriggerWrapper onClick={() => setCollapsed(!collapsed)}>
            <Divider style={{ margin: "0px" }} />
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </S.SiderTriggerWrapper>
        }
      >
        <S.StyledMenu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["1"]}
          mode="inline"
          theme="light"
          items={items}
        />
      </Layout.Sider>
    </>
  );
};
