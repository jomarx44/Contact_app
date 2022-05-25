import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList, SafeAreaView,
  StatusBar,
  StyleSheet, TouchableOpacity,
  View
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Empty from "../components/emptyList";
import Item from "../components/flatlistItem";
import AddFloat from "../components/floatAddButton";
import Header from "../components/header";
import ModalSideMenu from "../components/modal";
import { GetData } from "../helpers/asyncMethod";
import { RootStackParamList } from "../navigation/root";

let { height, width } = Dimensions.get("window");

type HomeScreenProp = StackNavigationProp<RootStackParamList, "Home">;
interface Contact {
  list: Array<ContactList>;
}
interface ContactList {
  name: string;
  favorites: boolean;
  phoneNo: string;
  landLineNo: string;
}
const Home: FC<Contact> = (props) => {
  const navigation = useNavigation<HomeScreenProp>();
  const [isKeys, setKeys] = useState<any>(null);
  const [modalVisiblity, setModalVisibility] = useState<boolean>(false);
  const [contactList, setContactList] = useState<any>("");
  const pressModal = () => {
    setModalVisibility(true);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getAllkeys();
    });

    const getAllkeys = async () => {
      let val: any = await GetData();

      setContactList(JSON.parse(val));
      console.log("laman: ", contactList);
    };

    getAllkeys().catch(console.error);

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={null} />
      <Header onPress={() => pressModal()} title={"Contact App"} endLabel={""}>
        <Entypo name="menu" size={30} color="#fff" />
      </Header>

      <View style={styles.flatlistContainer}>
        <FlatList
          data={contactList}
          keyExtractor={(item, index) => `${item}-${index}`}
          scrollEnabled={true}
          showsVerticalScrollIndicator={true}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("UpdateDelete", { item })}
                style={{ width: width / 1.2, height: 60 }}
              >
                <Item
                  name={item?.name}
                  phoneNo={item?.phoneNo}
                  landLineNo={item?.landLineNo}
                  favorite={item?.favorite}
                />
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={() => <Empty />}
        />
      </View>
      <AddFloat onPressed={() => navigation.navigate("Create")} />
      <ModalSideMenu
        modalVisiblity={modalVisiblity}
        setModalVisibility={() => setModalVisibility(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    height: height,
  },
  flatlistContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Home;
