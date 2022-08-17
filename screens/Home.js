import React from "react";
import styled from "styled-components/native";
import colors from "../colors";
import { Ionicons } from "@expo/vector-icons";

const View = styled.View`
  flex: 1;
  padding: 0px 50px;
  padding-top: 80px;
  background-color: ${colors.bgColor};
`;
const Title = styled.Text`
  color: ${colors.textColor};
  font-size: 38px;
  margin-bottom: 80px;
`;
const Btn = styled.TouchableOpacity`
  position: absolute;
  bottom: 50px;
  right: 50px;
  width: 80px;
  height: 80px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.btnColor};
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`;
const BtnText = styled.Text`
  color: white;
`;

const Home = ({ navigation: { navigate } }) => {
  return (
    <View>
      <Title>내 일기</Title>
      <Btn onPress={() => navigate("Write")}>
        <Ionicons name="add" color="white" size={48} />
      </Btn>
    </View>
  );
};

export default Home;
