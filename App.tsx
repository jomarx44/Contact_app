import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { FC } from "react";
import { RootStackParamList } from "./src/navigation/root";
import Create from "./src/screen/create";
import EditDelete from "./src/screen/editDelete";
import Favorite from "./src/screen/favorite";
import Home from "./src/screen/home";

const Stack = createStackNavigator<RootStackParamList>();
const App : FC = ()=> {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="Create" component={Create}options={{headerShown:false}} />
        <Stack.Screen name="Favorites" component={Favorite} options={{headerShown:false}}/>
        <Stack.Screen name="UpdateDelete" component={EditDelete} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App