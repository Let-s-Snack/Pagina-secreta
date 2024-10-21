import * as S from "../Bi1/styles";

export const Bi2 = () => {
  return (
    <S.Wrapper>
      <S.CustomIframe
        title="Dashboard Avaliações da ExpoTech - Let's Snack"
        src={
          window.innerWidth < 700
            ? "https://app.powerbi.com/view?r=eyJrIjoiYTUzYWI3NGUtM2U3ZC00MDQzLWJhYjMtZWQ1YjMxOWE4Mzk4IiwidCI6ImIxNDhmMTRjLTIzOTctNDAyYy1hYjZhLTFiNDcxMTE3N2FjMCJ9&pageName=a99b97e214601de202e1"
            : "https://app.powerbi.com/view?r=eyJrIjoiYTUzYWI3NGUtM2U3ZC00MDQzLWJhYjMtZWQ1YjMxOWE4Mzk4IiwidCI6ImIxNDhmMTRjLTIzOTctNDAyYy1hYjZhLTFiNDcxMTE3N2FjMCJ9&pageName=87cd7032d44ddabc0b06"
        }
      />
    </S.Wrapper>
  );
};
