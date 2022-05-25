import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ModalSideMenu from "../components/modal";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/root";
import { useNavigation } from "@react-navigation/native";
import Input from "../helpers/input";
import { FC } from "react";
import Header from "../components/header";
import AddImage from "../components/addImage";
import { StoreData } from "../helpers/asyncMethod";
import { Contacts } from "../config";

let { height, width } = Dimensions.get("window");

type CreateScreenProp = StackNavigationProp<RootStackParamList, "Create">;

const Create: FC = () => {
  const navigation = useNavigation<CreateScreenProp>();
  const [isName, setName] = useState<string>("");
  const [isPhoneNo, setPhoneNo] = useState<string>("");
  const [favorite, setFavorite] = useState<boolean>(false);
  const [isLandLine, setLandLine] = useState<string>("");
  const [newContacts, setNewContacts] = useState<Contacts[] | null>(null);
  const addContact = () => {
    let value = {
      name: isName,
      phoneNo: isPhoneNo,
      landLineNo: isLandLine,
      favorite: favorite,
    };
    if (isName && isPhoneNo) {
      if (StoreData(value)) {
        alert("Added successfully!");
        navigation.navigate("Home");
      } else {
        alert("Failed to add");
      }
    } else {
      alert("Please fill up the form");
    }

    setName("");
    setPhoneNo("");
    setLandLine("");
    setFavorite(false);
  };

  const cancelPress = () => {
    setName("");
    setPhoneNo("");
    setLandLine("");
    setFavorite(false);
      navigation.navigate("Home");
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={null} />
      <Header
        onPress={() => navigation.goBack()}
        title={"Add Contacts"}
        endLabel={""}
      >
        <Ionicons name="arrow-back" size={20} color="#fff" />
      </Header>
      <ScrollView style={styles.subContainer}>
        <View style={styles.favorites}>
          <Pressable onPress={() => setFavorite(!favorite)}>
            <AntDesign
              name={favorite ? "star" : "staro"}
              size={40}
              color="#3895D3"
            />
          </Pressable>
        </View>
        <AddImage />

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Input
              editable={true}
              placeholder="Enter your name"
              onChangeText={(txt) => setName(txt)}
              maxLength={20}
              value={isName}
            >
              <Ionicons
                style={{ alignSelf: "center", marginHorizontal: 5 }}
                name="person"
                size={20}
                color="#000"
              />
            </Input>
          </View>

          <View style={styles.inputContainer}>
            <Input
              editable={true}
              placeholder="Phone Number"
              maxLength={20}
              onChangeText={(txt) => setPhoneNo(txt)}
              value={isPhoneNo}
            >
              <FontAwesome
                style={{ alignSelf: "center", marginHorizontal: 5 }}
                name="phone"
                size={20}
                color="#000"
              />
            </Input>
          </View>
          {/* <View style={styles.inputContainer}>
            <Input
              editable={true}
              placeholder="Landline number"
              maxLength={20}
              onChangeText={(txt) => setLandLine(txt)}
              value={isLandLine}
            >
              <Entypo
                style={{ alignSelf: "center", marginHorizontal: 5 }}
                name="landline"
                size={20}
                color="#000"
              />
            </Input>
          </View> */}
            <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => addContact()}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonContainer, { backgroundColor: '#ec7c71' }]}
            onPress={() => cancelPress()}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    height: height,
  },
  subContainer: { flex: 1, backgroundColor: "white" },
  backButton: {
    width: 50,
    justifyContent: "center",
  },
  favorites: {
    height: 50,
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: 10,
  },
  imageContainer: {
    height: height / 4,
    width: height / 4,
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 2,
  },
  formContainer: { flex: 1, margin: 10, marginTop: 20 },
  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 5,
    width: width / 1.1,
    height: 50,
    justifyContent: "flex-start",
    alignSelf: "center",
    marginBottom: 10,
  },
  button: { alignItems: "center", justifyContent: "center", margin: 5 },
  buttonContainer: {
     marginTop: 40,
    width: width / 2.5,
    height: 50,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#3895D3",
    borderRadius: 8,
  },
  buttonText: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 18,
  },
});
export default Create;
