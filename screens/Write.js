import React, { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import { useDB } from "../context";
import colors from "../colors";
import firestore from "@react-native-firebase/firestore";

const View = styled.View`
  flex: 1;
  padding: 0px 30px;
  background-color: ${colors.bgColor};
`;
const Title = styled.Text`
  color: ${colors.textColor};
  margin: 50px 0px;
  text-align: center;
  font-size: 26px;
  font-weight: 500;
`;

const TextInput = styled.TextInput`
  background-color: white;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 16px;
`;

const Btn = styled.TouchableOpacity`
  width: 100%;
  margin-top: 25px;
  padding: 10px 20px;
  background-color: ${colors.btnColor};
  align-items: center;
  border-radius: 20px;
`;

const BtnText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 500;
`;

const Emotions = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  justify-content: space-between;
`;

const Emotion = styled.TouchableOpacity`
  background-color: white;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 20px;
  overflow: hidden;
  border: ${(props) => (props.selected ? "2px" : "0px")};
  border-color: rgba(0, 0, 0, 0.5);
`;

const EmotionText = styled.Text`
  font-size: 22px;
`;

export const emotions = ["π€―", "π₯²", "π€¬", "π€", "π₯°", "π", "π€©"];

const Write = ({ navigation: { goBack } }) => {
  const { realm } = useDB();
  const [selectedEmotion, setEmotion] = useState(null);
  const [feelings, setFeelings] = useState("");
  const onEmotionPress = (face) => setEmotion(face);
  const onChangeText = (text) => setFeelings(text);
  const onSubmit = () => {
    if (feelings === "" || selectedEmotion == null) {
      return Alert.alert("λ€μ μλ ₯ν΄μ£ΌμΈμ~");
    }
    realm.write(() => {
      const feeling = realm.create("Feeling", {
        _id: Date.now(),
        emotion: selectedEmotion,
        message: feelings,
      });
      console.log(feeling);
    });
    writeFire(selectedEmotion, feelings);

    goBack();
  };

  const writeFire = (emotion, feeling) => {
    firestore()
      .collection("feelings")
      .doc("chanhwi")
      .update({
        data: firestore.FieldValue.arrayUnion({
          createdAt: Date.now(),
          emotion,
          feeling,
        }),
      })
      .then(() => console.log("FBμ λ©μΈμ§ μΆκ°λ¨"));
  };

  return (
    <View>
      <Title>μ€λ κΈ°λΆμ΄ μ΄λμ?</Title>
      <Emotions>
        {emotions.map((emotion, index) => (
          <Emotion
            selected={emotion === selectedEmotion}
            key={index}
            onPress={() => onEmotionPress(emotion)}
          >
            <EmotionText>{emotion}</EmotionText>
          </Emotion>
        ))}
      </Emotions>
      <TextInput
        returnKeyLabel="done"
        onSubmitEditing={onSubmit}
        placeholder="μ€λμ κΈ°λΆμ μ μ΄λ³΄μΈμ"
        value={feelings}
        onChangeText={onChangeText}
      />
      <Btn onPress={onSubmit}>
        <BtnText>μ μ₯</BtnText>
      </Btn>
    </View>
  );
};

export default Write;
