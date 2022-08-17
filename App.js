import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./navigator";
import Realm from "realm";

const FeelingSchema = {
  name: "Feeling",
  properties: {
    _id: "int",
    emotion: "string",
    message: "string",
  },
  primaryKey: "_id",
};

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        const realm = await Realm.open({
          path: "nomadDiaryDB",
          schema: [FeelingSchema],
        });
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setReady(true);
      }
    }

    prepare();
  }, []);

  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}
