interface Props {
  onPress: () => void;
  title: string;
  endLabel: string;
}

import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Header: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <View style={{ width: 50, justifyContent: "center" }}>
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
          {props.children}
        </TouchableOpacity>
      </View>
      <View style={styles.centerTitle}>
        <Text style={styles.centerText}>{props.title}</Text>
      </View>
      <View style={styles.endView}>
        <Text>{props.endLabel}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 80,
    backgroundColor: "#3895D3",
    justifyContent: "space-between",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  centerTitle: {
    alignItems: "center",
    justifyContent: "center",
  },
  centerText: {
    fontSize: 20,
    color: "#fff",
  },
  endView: {
    width: 50,
    justifyContent: "center",
  },
});

export default Header;
