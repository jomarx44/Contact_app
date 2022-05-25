interface Props {
  modalVisiblity: boolean;
  setModalVisibility: () => void;
}
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
  Dimensions, StyleSheet, Text, TouchableOpacity, View
} from "react-native";
import ModalProps from "react-native-modal";
import { RootStackParamList } from "../navigation/root";

let { height, width } = Dimensions.get("window");
type HomeScreenProp = StackNavigationProp<RootStackParamList, "Home">;

const ModalSideMenu: React.FC<Props> = ({
  modalVisiblity,
  setModalVisibility,
}) => {
  const navigation = useNavigation<HomeScreenProp>();

  return (
    <ModalProps
      isVisible={modalVisiblity}
      onSwipeComplete={setModalVisibility}
      onBackButtonPress={setModalVisibility}
      onBackdropPress={setModalVisibility}
      animationIn="slideInLeft" // Has others, we want slide in from the left: ;
      animationOut="fadeOutUpBig" // When discarding the drawer
      swipeDirection="right" // Discard the drawer with swipe to left
      useNativeDriver // Faster animation
      hideModalContentWhileAnimating // Better performance, try with/without
      propagateSwipe // Allows swipe events to propagate to children components (eg a ScrollView inside a modal)
      style={styles.modalView}
    >
      <View style={styles.containerView}>
        <View style={styles.titleContainer}>
          <Text style={styles.textTitle}>Contacts App </Text>
        </View>
        <TouchableOpacity
          style={styles.touchableStyle}
          onPress={() => navigation.navigate("Home")}
        >
          <Text>Contact List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableStyle}
          onPress={() => navigation.navigate("Favorites")}
        >
          <Text>Favorites</Text>
        </TouchableOpacity>
      </View>
    </ModalProps>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "#3895D3",
  },
  textTitle: {
    letterSpacing: 0.25,
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  touchableStyle: { padding: 10, alignItems: "center" },
  modalView: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    margin: 0,
    marginTop: 0,
  },
  containerView: {
    backgroundColor: "#ffffff",
    height: height,
    width: width * 0.5,
    elevation: 10,
    borderWidth: 0,
  },
});

export default ModalSideMenu;
