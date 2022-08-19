import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import colors from "../colors";
import { Ionicons } from "@expo/vector-icons";
import { useDB } from "../context";
import { emotions } from "./Write";
import { Dimensions } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

//  variables
const SCREEN_WIDTH = Number(Dimensions.get("window").width);
const SCREEN_HEIGHT = Number(Dimensions.get("window").height);
// Styled
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
  font-size: 18px;
`;

const Record = styled.View`
  background-color: ${colors.cardColor};
  flex-direction: row;
  padding: 10px 20px;
  border-radius: 20px;
  align-items: center;
  position: relative;
`;

const EmotionRecord = styled(Record)`
  background-color: ${colors.cardColor};
  min-width: ${SCREEN_WIDTH / 1.7}px;
  max-width: ${SCREEN_WIDTH / 1.5}px;
  position: absolute;
  justify-content: space-between;
  z-index: 5;
`;

const EmotionEditTouch = styled.TouchableOpacity``;

const EmotionSelect = styled.TouchableOpacity``;

const Emotion = styled.Text`
  font-size: 26px;
  margin-right: 10px;
`;

const Message = styled.Text`
  font-size: 18px;
  font-weight: 400;
`;

const MessageEdit = styled.TextInput`
  font-size: 18px;
  font-weight: 400;
`;

const IconBtn = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
`;

const Icon = styled(Ionicons)``;

const Separator = styled.View`
  height: 10px;
`;

const Home = ({ navigation: { navigate } }) => {
  //states
  const { fireFeelings, realm } = useDB();
  const [realmFeelings, setRealmFeelings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState("");
  const [nowEditingEmotion, setNowEditingEmotion] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState("");

  useEffect(() => {
    const realmFeelings = realm.objects("Feeling");
    setRealmFeelings(realmFeelings);
    realmFeelings.addListener(() => {
      const realmFeelings = realm.objects("Feeling");
      setRealmFeelings(realmFeelings);
    });

    return () => {
      realmFeelings.removeAllListeners();
    };
    // realm Filter
    // const happy = feelings.filtered("emotion = '😊' ");
  }, []);

  const onChangeText = (text) => {
    setEditText(text);
  };

  const onPressEditEmotion = () => {
    setNowEditingEmotion((prev) => !prev);
  };

  const renderItem = ({ item }) => {
    const onPress = () => {
      const id = item._id;
      const target = realm.objects("Feeling").filtered(`_id == '${id}'`);
      console.log(target[0]);
      if (isEdit) {
        try {
          // 수정하고 누를때
          setEditingId(null);
          console.log(`target : ${target[0].message}`);
          realm.write(() => {
            target[0].message = editText;
            target[0].emotion = selectedEmotion;
          });
          setSelectedEmotion("");
        } catch (error) {
          console.log(error);
        } finally {
          setIsEdit(false);
          setEditText("");
          setNowEditingEmotion(false);
          console.log(`updated target : ${JSON.stringify(target)}`);
        }
      } else {
        try {
          // 처음 수정할때
          setEditingId(target[0]._id);
          setEditText(target[0].message);
          setSelectedEmotion(target[0].emotion);
        } catch (error) {
          console.log(error);
        } finally {
          setIsEdit(true);
        }
      }
    };
    //Firebase
    // return <Text>{item.emotion}</Text>;

    return (
      <Record>
        {isEdit && editingId === item._id ? (
          <>
            {nowEditingEmotion ? (
              <EmotionRecord isVisible={nowEditingEmotion}>
                {emotions.map((emotion, index) => (
                  <EmotionSelect
                    key={Math.random()}
                    onPress={() => {
                      setSelectedEmotion(emotion);
                      setNowEditingEmotion(false);
                    }}
                  >
                    <Text>
                      {selectedEmotion === "" ? emotion : selectedEmotion}
                    </Text>
                  </EmotionSelect>
                ))}
              </EmotionRecord>
            ) : null}

            <EmotionEditTouch onPress={onPressEditEmotion}>
              <Emotion>
                {selectedEmotion === "" ? item.emotion : selectedEmotion}
              </Emotion>
            </EmotionEditTouch>
            <MessageEdit
              placeholder="수정할 내용을 입력해주세요"
              value={editText}
              onChangeText={onChangeText}
            />
          </>
        ) : (
          <>
            <Emotion>{item.emotion}</Emotion>
            <Message>{item.message}</Message>
          </>
        )}

        <IconBtn onPress={onPress}>
          <Icon
            name={editingId === item._id ? "md-checkmark-outline" : "pencil"}
            size={18}
          />
        </IconBtn>
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
