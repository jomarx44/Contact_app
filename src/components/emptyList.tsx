import React, { FC } from "react";
import { Text, View } from "react-native";

const Empty: FC = () => {
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ color: "#796e6eea" }}>Empty list</Text>
    </View>
  );
};

export default Empty;
