import { LockOutlined, MailOutlined } from "@ant-design/icons";
import * as S from "./styles";
import { useEffect, useState } from "react";
import { Modal, notification, Rate, Select, Slider, Spin } from "antd";

interface IAProps {
  email?: string;
  exercise?: number;
  fast_food?: number;
  self?: number;
  soda?: number;
  weight?: number | null;
  height?: number | null;
}

export const IA = () => {
  const [userDatas, setUserDatas] = useState<IAProps>();
  const desc = ["Péssimo", "Ruim", "Normal", "Bom", "Excelente"];
  const [resultMessage, setResultMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const success = [
    "🎉 Parabéns! Você está no perfil ideal para o nosso aplicativo! Sua saúde e hábitos se alinham perfeitamente com tudo o que oferecemos. Cadastre-se agora e aproveite ao máximo nossas funcionalidades! 📲✨",
    "💪 Você tem exatamente o perfil que buscamos! Com seu estilo de vida, nosso app foi feito para você. Explore e leve sua saúde para o próximo nível. Cadastre-se já! 🌟",
    "🔝 Você se encaixa direitinho no perfil do nosso app! Com o seu estilo de vida, você vai tirar o melhor proveito de cada funcionalidade. Faça o seu cadastro agora e comece sua jornada! 📱💥",
  ];

  const failed = [
    "✨ Sabemos que seu perfil pode ser um pouco diferente do que costumamos ver, mas temos certeza de que nosso aplicativo ainda pode fazer a diferença! Que tal experimentar e se surpreender? Cadastre-se já. 🚀😉",
    "👀 Embora seu perfil seja um pouco fora do nosso público principal, queremos que você também faça parte dessa experiência! Cadastre-se no app e explore as possibilidades que preparamos para ajudar na sua jornada. 📲💡",
    "🌐 Sabemos que todos têm necessidades únicas, e é por isso que nosso app está aqui para ajudar a cada um, à sua maneira. Que tal baixar e explorar? Pode ser o início de uma ótima experiência! 🔍📲",
  ];

  const handleChangeText = (result: boolean) => {
    if (result) {
      return success[Math.floor(Math.random() * 3)];
    }
    return failed[Math.floor(Math.random() * 3)];
  };

  const hadleSendInformation = () => {
    if (
      userDatas?.email?.length &&
      userDatas.exercise &&
      userDatas.fast_food &&
      userDatas.height &&
      userDatas.self &&
      userDatas.soda &&
      userDatas.weight
    ) {
      setIsLoading(true);
      fetch(
        "http://ec2-54-175-111-241.compute-1.amazonaws.com:8080/getResponse/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userDatas),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro na requisição: " + response.status);
          }
          return response.json();
        })
        .then((responseData: any) => {
          setIsLoading(false);
          setResultMessage(handleChangeText(responseData.is_possible_user));
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

  const handleModalInfo = () => {
    setIsLoading(false);
    Modal.info({
      title: "Resultado",
      centered: true,
      content: (
        <div>
          <p>{resultMessage}</p>
        </div>
      ),
      onOk() {},
    });
  };

  useEffect(() => {
    if (resultMessage.length) handleModalInfo();
  }, [resultMessage]);
  return (
    <S.PageWrapper>
      <S.FormWrapper>
        <S.Title>Descubra seu tipo para nosso app</S.Title>
        <S.InputsWrapper>
          <S.StyledInput
            size="large"
            placeholder="Email"
            prefix={<MailOutlined />}
            onChange={(email) => {
              setUserDatas({ ...userDatas, email: email.target.value });
            }}
          />
          <S.StyledInputNumber
            style={{ width: "100%" }}
            size="large"
            min="0"
            placeholder="Peso"
            prefix={<LockOutlined />}
            onChange={(weight) =>
              setUserDatas({ ...userDatas, weight: weight as number | null })
            }
          />
          <S.StyledInputNumber
            style={{ width: "100%" }}
            size="large"
            min="0"
            placeholder="Altura"
            prefix={<LockOutlined />}
            onChange={(height) => {
              setUserDatas({ ...userDatas, height: height as number | null });
            }}
          />
          Autoavaliação da sua saúde
          <Rate
            tooltips={desc}
            onChange={(rate) => setUserDatas({ ...userDatas, self: rate })}
          />
          Quantidade de vezes que foi no fast food nos últimos 7 dias
          <Slider
            min={1}
            max={40}
            style={{ width: "100%" }}
            onChange={(food) => setUserDatas({ ...userDatas, fast_food: food })}
          />
          Quantidade de vezes que realizou atividade física nos últimos 7 dias
          <Slider
            min={1}
            max={30}
            style={{ width: "100%" }}
            onChange={(fisic) => {
              setUserDatas({ ...userDatas, exercise: fisic });
            }}
          />
          Tipo de refrigerante consumido
          <Select
            style={{ width: "100%" }}
            placeholder="Selecione"
            onChange={(soda) => {
              setUserDatas({ ...userDatas, soda });
            }}
            options={[
              { value: 1, label: "Não toma refrigerante" },
              { value: 2, label: "Diet" },
              { value: 3, label: "Normal" },
              { value: 4, label: "Ambos" },
            ]}
          />
          <S.StyledButton
            type="primary"
            onClick={() => {
              hadleSendInformation();
            }}
          >
            Validar
          </S.StyledButton>
        </S.InputsWrapper>
      </S.FormWrapper>
      {isLoading && <Spin fullscreen />}
    </S.PageWrapper>
  );
};
