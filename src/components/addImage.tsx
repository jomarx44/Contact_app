import React from "react";
import { FC } from "react";
import { StyleSheet, Dimensions, View, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

let { height, width } = Dimensions.get("window");
const AddImage: FC = () => {
  return (
    <View style={styles.imageContainer}>
      <TouchableOpacity
        style={{ alignItems: "center" }}
      >
        <FontAwesome name="user" size={100} color="#3895D3" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: height / 4.5,
    width: height / 4.5,
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 2,
    borderColor:'#3895D3',
    borderRadius:90
  },
});
export default AddImage;
