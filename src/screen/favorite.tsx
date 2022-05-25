import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
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

type FavoriteScreenProp = StackNavigationProp<RootStackParamList, "Favorites">;

const Favorites = () => {
  const navigation = useNavigation<FavoriteScreenProp>();
  const [contactList, setContactList] = useState<any>("");
  const [modalVisiblity, setModalVisibility] = useState(false);
  const pressModal = () => {
    console.log("modal");
    setModalVisibility(true);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getAllkeys();
    });

    const getAllkeys = async () => {
      const val: any = await GetData();
      setContactList(JSON.parse(val));
    };

    getAllkeys().catch(console.error);

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={null} />
      <Header onPress={() => pressModal()} title={"Favorites"} endLabel={" "}>
        <Entypo name="menu" size={30} color="#fff" />
      </Header>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FlatList
          data={contactList}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item, index }) => {
            return (
              <View>
                {item?.favorite && (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("UpdateDelete", { item })
                    }
                    style={{ width: width / 1.2, height: 60 }}
                  >
                    <Item
                      name={item?.name}
                      phoneNo={item?.phoneNo}
                      landLineNo={item?.landLineNo}
                      favorite={item?.favorite}
                    />
                  </TouchableOpacity>
                )}
              </View>
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
});
export default Favorites;
