import { Menu } from "antd";
import { css, styled } from "styled-components";

export const SiderTriggerWrapper = styled.div(
  () => css`
    && {
      display: flex;
      flex-direction: column;
      border-right: 1px solid #0000001a;
      height: 100%;
      *,
      svg,
      span {
        color: #ef5b23;
        width: 16px;
        height: 16px;
      }
      span {
        margin: 0rem 1.6rem;
      }
    }
  `
);

export const StyledMenu = styled(Menu)`
  svg,
  span {
    color: #ef5b23;
  }
`;
