import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import AddImage from "../components/addImage";
import { GetData, RemoveValue } from "../helpers/asyncMethod";
import Input from "../helpers/input";
import { RootStackParamList } from "../navigation/root";

let { height, width } = Dimensions.get("window");
type Props = {
  route: {
    params: {
      item: {
        name: string;
        phoneNo: string;
        landLineNo: string;
        favorite: boolean;
      };
    };
  };
};
type EditDeleteScreen = StackNavigationProp<RootStackParamList, "UpdateDelete">;
const EditDelete: FC<Props> = ({ route }) => {
  const navigation = useNavigation<EditDeleteScreen>();
  const [favorite, setFavorite] = useState<boolean>(false);
  const [editable, setEditable] = useState<boolean>(false);
  const [isName, setName] = useState<string>("");
  const [isPhoneNo, setPhoneNo] = useState<string>("");
  const [isLandLine, setLandLine] = useState<string>("");
  const [contactList, setContactList] = useState<any>("");
  const [oldKeyNo, setOldKeyNo] = useState<any>("");
  useEffect(() => {
    setName(route?.params?.item?.name);
    setPhoneNo(route?.params?.item?.phoneNo);
    setLandLine(route?.params?.item?.landLineNo);
    setFavorite(route?.params?.item?.favorite);
  }, []);

  const pressUpdate = async () => {
    console.log("old : ", oldKeyNo);
    try {
      let Contacts: any = (await AsyncStorage.getItem("contacts")) || "[]";
      Contacts = JSON.parse(Contacts);
      let holder: any = [];
      let value = Contacts.filter(function (e: {
        name: any;
        phoneNo: any;
        landLineNo: any;
        favorite: any;
      }) {
        if (e.phoneNo !== oldKeyNo) {
          let con = {
            name: e.name,
            phoneNo: e.phoneNo,
            landLineNo: e.landLineNo,
            favorite: e.favorite,
          };
          holder.push(con);
        } else {
          let val = {
            name: isName,
            phoneNo: isPhoneNo,
            landLineNo: isLandLine,
            favorite: favorite,
          };

          holder.push(val);
        }
        return holder;
      });
      RemoveValue()
        ? AsyncStorage.setItem("contacts", JSON.stringify(holder)).then(() => {
            Alert.alert(
              "Update",
              "successfully Updated!",
              [{ text: "Ok", onPress: () => navigation.navigate("Home") }],
              { cancelable: false }
            );
          })
        : alert("Error!");
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const pressDelete = () => {
    Alert.alert(
      "Delete",
      "Are you sure ?",
      [
        { text: "Cancel", onPress: () => navigation.navigate("Home") },
        {
          text: "Yes",
          onPress: async () => {
            try {
              let Contacts: any =
                (await AsyncStorage.getItem("contacts")) || "[]";
              Contacts = JSON.parse(Contacts);
              let value = Contacts.filter(function (e: {
                name: any;
                phoneNo: any;
                landLineNo: any;
                favorite: any;
              }) {
                if (e.name !== isName && e.phoneNo !== isPhoneNo) {
                  let con = {
                    name: e.name,
                    phoneNo: e.phoneNo,
                    landLineNo: e.landLineNo,
                    favorite: e.favorite,
                  };
                  return Contacts.push(con);
                }
              });

              RemoveValue()
                ? AsyncStorage.setItem("contacts", JSON.stringify(value)).then(
                    () => {
                      Alert.alert(
                        "Deleted",
                        "successfully deleted!",
                        [
                          {
                            text: "Ok",
                            onPress: () => navigation.navigate("Home"),
                          },
                        ],
                        { cancelable: false }
                      );
                    }
                  )
                : alert("Error!");
            } catch (error) {
              console.log("error: ", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  const editPress = () => {
    setEditable(!editable);

    setOldKeyNo(isPhoneNo);
  };
  const setText = (txt: React.SetStateAction<string>) => {
    setName(txt);
    console.log(isName);
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={null} />
      <View style={styles.headerContainer}>
        <View style={styles.backButton}>
          <Pressable style={styles.button} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="#fff" />
          </Pressable>
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}></Text>
        </View>
        <TouchableOpacity style={styles.backButton} onPress={() => editPress()}>
          <Text style={styles.titleText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.subContainer}>
        <View style={styles.favorites}>
          <Pressable
            onPress={() => setFavorite(!favorite)}
            disabled={!editable}
          >
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
              editable={editable}
              placeholder={"Enter your name"}
              onChangeText={(text) => setText(text)}
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
              editable={editable}
              placeholder="Phone Number"
              maxLength={20}
              onChangeText={(text) => setPhoneNo(text)}
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
              editable={editable}
              placeholder="Landline number"
              maxLength={20}
              onChangeText={(text) => setLandLine(text)}
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
              disabled={!editable}
              style={styles.buttonContainer}
              onPress={() => pressUpdate()}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonContainer, { backgroundColor: "#ec7c71" }]}
              onPress={() => pressDelete()}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    height: height,
  },
  headerContainer: {
    flexDirection: "row",
    height: 80,
    backgroundColor: "#3895D3",
    justifyContent: "space-between",
  },
  subContainer: { flex: 1, backgroundColor: "white" },
  backButton: {
    width: 50,
    justifyContent: "center",
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: { fontSize: 20, color: "#fff" },
  favorites: {
    height: 50,
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: 10,
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
export default EditDelete;
