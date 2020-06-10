import { AsyncStorage } from "react-native";


export const store = async (key, value) => {
  try {
    console.log(`🏁 [storageLib.store]`);
    console.log(`💬 [storageLib.store] storing: ${key} : ${value}`);
    await AsyncStorage.setItem(key, value);
    console.log(`👍 [storageLib.store] stored: ${key} : ${value}`);
    return true;
  } catch (error) {
    console.log(`❌ [storageLib.store] : ${error}`);
  }
};

export const retrieve = async (key) => {
  
  try {
    console.log(`🏁 [storageLib.retrieve]`);
    console.log(`💬 [storageLib.retrieve] retrieving: ${key}`);
    const value = await AsyncStorage.getItem(key);
    console.log(`👍 [storageLib.retrieve] retrieved value: ${value}`);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log(`❌ [storageLib.retrieve] ${error}`);
    return null;
  }
};
