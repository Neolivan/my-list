import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../views/Home";
import { TouchableOpacity } from "react-native";
import { ListaContext } from "../context/ListasContext";
import { SelectedList } from "../views/SelectedList";
import { ListChecks, ListPlus } from "phosphor-react-native";

export function Navigator() {
  const Stack = createNativeStackNavigator();
  const { showModalAdd, selectedList, showModalCheck } =
    React.useContext(ListaContext);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#000",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Listas"
          options={{
            title: "Minhas Listas",
            headerRight: () => (
              <TouchableOpacity onPress={() => showModalAdd(true)}>
                <ListPlus size={32} color="#FFF" />
              </TouchableOpacity>
            ),
          }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Selected"
          options={{
            title: selectedList ? selectedList.name : "",
            headerRight: () => (
              <TouchableOpacity onPress={() => showModalCheck(true)}>
                <ListChecks size={32} color="#FFF" />
              </TouchableOpacity>
            ),
          }}
          component={SelectedList}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
