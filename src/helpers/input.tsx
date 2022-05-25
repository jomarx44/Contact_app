import React, { FC } from "react";
import { StyleSheet, TextInput, View ,Dimensions} from "react-native";

let { height, width } = Dimensions.get("window");
interface Props {
  editable: boolean;
  placeholder: string;
  maxLength: number;
  value:any;
  onChangeText: (text: string) => void;
}
const Input: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
          {props.children}
        <TextInput
        focusable={props.editable}
          style={{ flex: 1 }}
          editable={props.editable}
          placeholder={props.placeholder}
          maxLength={props.maxLength}
          onChangeText={props.onChangeText}
          defaultValue={props.value}
        />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"row",
    justifyContent: "center",
    alignItems: "center",
         
  },
});
export default Input;
