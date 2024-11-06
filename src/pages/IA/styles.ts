import { Button, Input, InputNumber } from "antd";
import styled from "styled-components";

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
`;

export const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ef5b23;
  padding: 5rem 0;
`;

export const FormWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background-color: #f8f8f8;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
`;

export const StyledInput = styled(Input)`
  width: 100%;
  svg {
    color: #ef5b23;
  }
`;

export const StyledInputNumber = styled(InputNumber)`
  width: 100%;
  svg {
    color: #ef5b23;
  }
`;

export const StyledButton = styled(Button)`
  background-color: #ef5b23;
  width: 100%;
`;

export const InputsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;
