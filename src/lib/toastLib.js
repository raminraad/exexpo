import { StyleSheet } from "react-native";

import * as rxGlobal from "../lib/rxGlobal";
import { Toast } from "native-base";

export const error = (text,duration=rxGlobal.setting.toastDurationDefault) => {
  Toast.show({
    text,
    textStyle: styles.textCommon,
    duration,
    style: [styles.common, styles.error],
  });
};
export const success = (text,duration=rxGlobal.setting.toastDurationDefault) => {
  Toast.show({
    text,
    textStyle: styles.textCommon,
    duration,
    style: [styles.common, styles.success],
  });
};
export const message = (text,duration=rxGlobal.setting.toastDurationDefault) => {
  Toast.show({
    text,
    textStyle: styles.textCommon,
    duration,
    style: [styles.common, styles.message],
  });
};

const styles = StyleSheet.create({
  common: {
    marginBottom:60,
    marginHorizontal:100,
    borderRadius:25
  },
  textCommon: { textAlign: "center"},
  error: { backgroundColor: rxGlobal.globalColors.toasts.error },
  success: { backgroundColor: rxGlobal.globalColors.toasts.success },
  message: { backgroundColor: rxGlobal.globalColors.toasts.message },
});
