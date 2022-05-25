import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";

import { Contacts } from "../config";

const Item: FC<Contacts> = (props) => {
  return (
    <View style={styles.container}>
      <View>
        <FontAwesome
          style={{ alignSelf: "center", marginHorizontal: 5 }}
          name="user-circle-o"
          size={30}
          color="#3895D3"
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text>{props.name}</Text>
      </View>
      <View style={{ justifyContent: "flex-end" }}>
        <AntDesign
          name={props.favorite ? "star" : "staro"}
          size={30}
          color="#3895D3"
        />
      </View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
    padding: 10,
    alignItems: "center",
  },
});
