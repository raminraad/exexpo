import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as rxGlobal from "../lib/rxGlobal";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            justifyContent: "flex-end",
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: "flex-end",
            }}
            onPress={() => {
              setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              rxGlobal.globalStyles.CircleShapeView,
              {
                backgroundColor: "#FFFFFF77",
                marginBottom: 20,
                alignSelf:'center'
              },
            ]}
            onPress={async () => {
              if (cameraRef) {
                let photo = await cameraRef.takePictureAsync();
                console.log("photo", photo);
              }
            }}>
            <MaterialCommunityIcons name='camera-iris' size={72} color='white' />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
