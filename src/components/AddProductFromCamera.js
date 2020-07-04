import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { Camera } from "expo-camera";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as rxGlobal from "../lib/rxGlobal";
import { Image } from "react-native-elements";
import { Spinner } from "native-base";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isOnPreview, setIsOnPreview] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [pictures, setPictures] = useState([]);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  console.log("RENDER");
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 8 }}
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
          {isCapturing?<Spinner size={72} color='white' style={[
              rxGlobal.globalStyles.CircleShapeView,
              {
                backgroundColor: "#FFFFFF77",
                marginBottom: 20,
                alignSelf: "center",
              },
            ]}/>: <TouchableOpacity
            style={[
              rxGlobal.globalStyles.CircleShapeView,
              {
                backgroundColor: "#FFFFFF77",
                marginBottom: 20,
                alignSelf: "center",
              },
            ]}
            onPress={async () => {
              try {
                setIsCapturing(true);
                if (cameraRef) {
                  let newPicture = await cameraRef.takePictureAsync();
                  setPictures([...pictures, newPicture]);
                  setIsOnPreview(true);
                  console.log("photo", newPicture);
                }
              } catch (err) {
                
              } finally {
                setIsCapturing(false);
              }
            }}>
            <MaterialCommunityIcons name='camera-iris' size={72} color='white' />
          </TouchableOpacity>}
        </View>
      </Camera>

      {pictures.length?<ScrollView horizontal style={{flex:1, marginVertical: 10 }}>
        {pictures.map((pic) => (
          <Image source={{ uri: pic.uri }} style={{marginHorizontal:5, width: 100, height: 100 }} PlaceholderContent={<ActivityIndicator />} key={pic.uri} />
        ))}
      </ScrollView>:null}
    </View>
  );
}
