import {
  BarChartOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Divider, Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];
export const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [username, setUsername] = useState<string>(
    localStorage.getItem("user")!
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("user");
  };

  const items: MenuItem[] = [
    {
      key: "1",
      label: "Pesquisa de mercado",
      onClick: () => {
        navigate("/");
      },
      icon: <BarChartOutlined />,
    },
    {
      key: "2",
      label: "Avaliações da ExpoTech",
      onClick: () => {
        navigate("/bi2");
      },
      icon: <PieChartOutlined />,
    },
    {
      key: "3",
      label: username,
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

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [localStorage.getItem("user")]);
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
