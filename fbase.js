import firestore from "@react-native-firebase/firestore";

export const userCollection = firestore().collection("feelings");
