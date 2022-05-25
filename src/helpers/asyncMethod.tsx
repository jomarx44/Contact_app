import { FC } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const StoreData = async (value: any): Promise<any> => {
  try {
    let con = {
      name: value.name,
      phoneNo: value.phoneNo,
      landLineNo: value.landLineNo,
      favorite: value.favorite,
    };
    let contacts = (await AsyncStorage.getItem("contacts")) || "[]";
    contacts = JSON.parse(contacts);
    contacts.push(con);
    AsyncStorage.setItem("contacts", JSON.stringify(contacts)).then(() => {
      console.log("Contacts updated.");
      GetData();
    });
  } catch (error) {
    alert(error);
  }

  // try {
  //   const jsonValue = JSON.stringify(value);
  //   await AsyncStorage.setItem(value.name, jsonValue);
  //   console.log("pasokkk");
  //   return true;
  // } catch (e) {
  //   console.log("error");

  //   return false;
  // }
};

export const GetData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("contacts");
    jsonValue != null ? JSON.parse(jsonValue) : null;
    return jsonValue;
  } catch (e) {
    console.log("error get data", e);
  }
};

export const RemoveValue = async () => {
  try {
    await AsyncStorage.removeItem("contacts");
    return true;
  } catch (error) {
    console.log("error: ", error);
    return false;
  }
};

export const getAllkeys = async () => {
  try {
    let keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (error) {
    console.log("Error: ", error);
    return false;
  }
};

export const MultiGet = async (values: any) => {
  try {
    values = await AsyncStorage.multiGet(values);
  } catch (error) {
    console.log("error: ", error);
  }
};
