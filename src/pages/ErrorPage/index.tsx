import { Result } from "antd";
import * as S from "../Login/styles";
import { useNavigate } from "react-router-dom";

export const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <S.PageWrapper style={{ backgroundColor: "white" }}>
      <Result
        status="404"
        title="404"
        subTitle="Desculpe, a página que você procurou não existe!"
        extra={
          <S.StyledButton type="primary" onClick={() => navigate("/")}>
            Voltar para a página inicial
          </S.StyledButton>
        }
      />
    </S.PageWrapper>
  );
};
