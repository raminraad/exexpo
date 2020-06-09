import { AsyncStorage } from "react-native";

export const store = async (key, value) => {
  try {
    console.log(`Storing ${key} : ${value}`);

    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.log(`error on storageLib.store: ${error}`);
  }
};

export const retrieve = async (key) => {
    console.log(`Retrieving ${key}`);

  try {
    const value = await AsyncStorage.getItem(key);
    console.log(`Retrieved: ${value}`);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log(`error on storageLib.retrieve: ${error}`);
    return null;
  }
};
