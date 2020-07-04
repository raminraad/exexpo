import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as rxGlobal from "../lib/rxGlobal";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  let camera = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const capture = async () => {
    if (camera) {
      let photo = await camera.takePictureAsync();
    }  };

  if (hasPermission === null) {
    return <View />;
  } else if (hasPermission === false) {
    return <Text>{rxGlobal.globalLiterals.validationErrors.cameraPermissionDenied}</Text>;
  } else
    return (
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={(ref) => {
          camera = ref;
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: "column-reverse",
            alignItems: "center",
            alignContent: "center",
          }}>
          <TouchableOpacity
            style={[
              rxGlobal.globalStyles.CircleShapeView,
              {
                backgroundColor: "#FFFFFF77",
                marginBottom: 20,
              },
            ]}
            onPress={() => {
              takePictureAsync();
            }}>
            <MaterialCommunityIcons name='camera-iris' size={72} color='white' />
          </TouchableOpacity>
        </View>
      </Camera>
    );
}
