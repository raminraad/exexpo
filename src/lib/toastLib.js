import { StyleSheet } from "react-native";

import * as rxGlobal from "../lib/rxGlobal";
import { Toast } from "native-base";

export const error = (text) => {
  Toast.show({
    text,
    textStyle: styles.textCommon,
    duration: rxGlobal.setting.toastDuration,
    style: [styles.common, styles.error],
  });
};
export const success = (text) => {
  Toast.show({
    text,
    textStyle: styles.textCommon,
    duration: rxGlobal.setting.toastDuration,
    style: [styles.common, styles.error],
  });
};

const styles = StyleSheet.create({
  common: {
    height: 55,
    marginBottom:56,
    
  },
  textCommon: { textAlign: "right", marginRight: 25 },
  error: { backgroundColor: rxGlobal.globalColors.toasts.error },
  success: { backgroundColor: rxGlobal.globalColors.toasts.success },
});
