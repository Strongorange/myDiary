import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import colors from "../colors";
import { Ionicons } from "@expo/vector-icons";
import Context, { DBContext, useDB } from "../context";

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

const MessageList = styled.FlatList``;

const Text = styled.Text`
  font-size: 24px;
`;

const Record = styled.View`
  background-color: ${colors.cardColor};
  flex-direction: row;
  padding: 10px 20px;
  border-radius: 20px;
  align-items: center;
`;

const Emotion = styled.Text`
  font-size: 26px;
  margin-right: 10px;
`;

const Message = styled.Text`
  font-size: 18px;
  font-weight: 400;
`;

const Separator = styled.View`
  height: 10px;
`;

const Home = ({ navigation: { navigate } }) => {
  const { fireFeelings, realm } = useDB();
  const [realmFeelings, setRealmFeelings] = useState([]);
  useEffect(() => {
    const realmFeelings = realm.objects("Feeling");
    setRealmFeelings(realmFeelings);
    realmFeelings.addListener(() => {
      console.log("new realm feeling");
      const realmFeelings = realm.objects("Feeling");
      setRealmFeelings(realmFeelings);
    });

    return () => {
      realmFeelings.removeAllListeners();
    };
    // realm Filter
    // const happy = feelings.filtered("emotion = '😊' ");
  }, []);

  const renderItem = ({ item }) => {
    //Firebase
    // return <Text>{item.emotion}</Text>;
    return (
      <Record>
        <Emotion>{item.emotion}</Emotion>
        <Message>{item.message}</Message>
      </Record>
    );
  };

  return (
    <View>
      <Title>내 일기</Title>
      <MessageList
        data={realmFeelings}
        renderItem={renderItem}
        keyExtractor={(item) => item._id + ""}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={{ paddingVertical: 10 }}
        // keyExtractor={(item) => item._id + ""}
      />
      <Btn onPress={() => navigate("Write")}>
        <Ionicons name="add" color="white" size={48} />
      </Btn>
    </View>
  );
};

export default Home;
