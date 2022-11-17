import { useContext } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { ListaContext } from "../context/ListasContext";
import { LinearGradient } from "expo-linear-gradient";
import { ModalAddList } from "../components/ModalAdd/ModalAdd";
import { useNavigation } from "@react-navigation/native";

export interface GlobalNavigationProp {
  navigate(arg0: string): void;
}

export function HomeScreen() {
  const navigation = useNavigation<GlobalNavigationProp>();
  const { listas, selectedListSet } = useContext(ListaContext);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(0, 0, 0, 0.79)", "transparent"]}
        style={styles.background}
      />
      <ModalAddList />
      <ScrollView style={{ width: "100%" }}>
        {listas.map((item) => {
          return (
            <TouchableOpacity
              style={styles.itemContainer}
              key={item.id}
              onPress={() => {
                selectedListSet(item.id);
                navigation.navigate("Selected");
              }}
            >
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#0B6E4F",
    padding: 16,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  itemContainer: {
    width: "100%",
    backgroundColor: "#FFF",
    minHeight: 48,
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 12,
    marginBottom: 16,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
