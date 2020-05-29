import React, { useState ,useEffect} from "react";
import { StyleSheet, View, TouchableOpacity, FlatList, TextInput, Button, ScrollView, KeyboardAvoidingView, Keyboard } from "react-native";
import { Formik } from "formik";
import { RadioButton, Text, Divider } from "react-native-paper";
import { Separator, Content, Container } from "native-base";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { globalStyles, globalColors, globalSizes } from "../styles/global";
import { Icon, ListItem, PricingCard, SearchBar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export default function VisitPlanResultProductForm({ onSubmit, onCancel, initialSelectedItem, rawData }) {
  const [isOnProductSearch, setisOnProductSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [presentationData, setPresentationData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setSelectedItem(initialSelectedItem);
    setPresentationData(rawData);
  }, []);
  
  useEffect(() => {
    setPresentationData(rawData.filter(item=>item.title.includes(searchText)))
  }, [searchText]);

  return (
    <View style={globalStyles.container}>
      
        <View style={{ minHeight:'50%' }}>
          {isOnProductSearch || !selectedItem ? (
            <View style={{ borderWidth: 0.5, marginVertical: 15, borderRadius: 2 }}>
              <SearchBar
                platform='default'
                lightTheme
                placeholder='جستجوی محصول...'
                onChangeText={(val) => {
                  setSearchText(val);
                }}
                value={searchText}
              />
              {presentationData.map((item, i) => (
                <ListItem
                  containerStyle={{ backgroundColor: globalColors.listItemHeaderContainer }}
                  key={i}
                  title={item.title}
                  bottomDivider
                  onPress={() => {
                    Keyboard.dismiss();
                    setisOnProductSearch(false);
                    setSelectedItem(item);
                  }}
                />
              ))}
            </View>
          ) : (
            <PricingCard
              containerStyle={{ alignSelf: "stretch" ,marginHorizontal:50}}
              color='#fca311'
              title={selectedItem.title}
              price='18000 ريال'
              pricingStyle={{ fontSize: 18 }}
              info={[selectedItem.title, "Basic Support", "All Core Features"]}
              button={{ title: "تغییر", icon: "edit" }}
              onButtonPress={() => setisOnProductSearch(true)}
            />
          )}
        </View>
        
      
      <View style={globalStyles.addModalFieldContainer}>
        <Text style={{ ...globalStyles.addModalFieldTitle, flex: 0 }}>قیمت فروش</Text>
        <TextInput style={globalStyles.addModalFieldInput} placeholder='قیمت فروش محصول' />
      </View>
      <View style={globalStyles.addModalFieldContainer}>
        <Text style={{ ...globalStyles.addModalFieldTitle, flex: 0 }}>وزن (گرم) </Text>
        <TextInput style={globalStyles.addModalFieldInput} placeholder='وزن محصول (گرم) ' />
      </View>
      <View style={globalStyles.addModalFieldContainer}>
        <Text style={{ ...globalStyles.addModalFieldTitle, flex: 0 }}>موجودی قابل مشاهده</Text>
        <TextInput style={globalStyles.addModalFieldInput} placeholder='موجودی قابل مشاهده' />
      </View>
    
  
      <Button title='تأیید' color={globalColors.btnAdd} onPress={() => console.log(searchText)} />
      <View style={{ marginVertical: 5 }} />
      <Button title='انصراف' color={globalColors.btnCancel} onPress={onCancel} />
    
    </View>
  );
}
