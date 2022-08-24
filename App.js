import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./navigator";
import Realm from "realm";
import firestore from "@react-native-firebase/firestore";
import Context, { DBContext, useDB } from "./context";
import styled from "styled-components";

const Loading = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 36px;
`;

const FeelingSchema = {
  name: "Feeling",
  properties: {
    _id: "int",
    emotion: "string",
    message: "string",
    // CreatedAt 추가
  },
  primaryKey: "_id",
};

export default function App() {
  const [ready, setReady] = useState(false);
  const [realm, setRealm] = useState(null);
  const [fireFeelings, setFireFeeling] = useState([]);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        const connection = await Realm.open({
          path: "nomadDiaryDB",
          schema: [FeelingSchema],
        });
        setRealm(connection);

        // Firebase
        firestore()
          .collection("feelings")
          .doc("chanhwi")
          .onSnapshot((documentSnapshot) => {
            try {
              setFireFeeling(documentSnapshot.data()["data"]);
            } catch (error) {
              console.log(error);
            } finally {
            }
          });
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setReady(true);
      }
    }

    prepare();
  }, []);

  if (!ready) {
    return (
      <Loading>
        <Text>로딩중...</Text>
      </Loading>
    );
  }

  return (
    <DBContext.Provider value={{ fireFeelings, realm }}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </DBContext.Provider>
  );
}
