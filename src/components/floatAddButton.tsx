import React, { FC } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

let { height, width } = Dimensions.get("window");
interface Props {
  onPressed: () => void;
}

const AddFloat: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPressed}>
        <Ionicons name="add-circle-outline" size={50} color="#3895D3" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height / 10,
    justifyContent: "center",
    alignItems: "flex-end",
    margin: 10,
  },
});
export default AddFloat;
