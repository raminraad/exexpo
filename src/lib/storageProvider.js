import { AsyncStorage } from "react-native";


export const store = async (key, value) => {
  try {
    console.log(`🏁 [storageProvider.store]`);
    console.log(`💬 [storageProvider.store] storing: ${key} : ${value}`);
    await AsyncStorage.setItem(key, value);
    console.log(`👍 [storageProvider.store] stored: ${key} : ${value}`);
    return true;
  } catch (err) {
    console.log(`❌ [storageProvider.store] : ${err}`);
  }
};

export const retrieve = async (key) => {
  
  try {
    console.log(`🏁 [storageProvider.retrieve]`);
    console.log(`💬 [storageProvider.retrieve] retrieving: ${key}`);
    const value = await AsyncStorage.getItem(key);
    console.log(`👍 [storageProvider.retrieve] retrieved value: ${value}`);
    if (value !== null) {
      return value;
    }
  } catch (err) {
    console.log(`❌ [storageProvider.retrieve] ${err}`);
    return null;
  }
};
