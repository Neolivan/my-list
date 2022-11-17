import { useContext } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { ListaContext } from "../context/ListasContext";
import { LinearGradient } from "expo-linear-gradient";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { ModalCheckAdd } from "../components/ModalCheckAdd/ModalCheckAdd";

export function SelectedList() {
  const { selectedList, updateCheck } = useContext(ListaContext);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(0, 0, 0, 0.79)", "transparent"]}
        style={styles.background}
      />
      <ModalCheckAdd />
      <ScrollView style={styles.todoContainer}>
        {selectedList.items ? (
          selectedList.items.map((item) => {
            return (
              <BouncyCheckbox
                size={35}
                fillColor="#52b69a"
                unfillColor="#FFFFFF"
                text={item.description}
                iconStyle={{ borderColor: "#52b69a" }}
                innerIconStyle={{ borderWidth: 2 }}
                textStyle={{
                  color: `${item.checked == false ? '#adb5bd' : '#FFF'}`,
                  fontSize: 18,
                }}
                isChecked={item.checked}
                onPress={(isChecked: boolean) => {
                  updateCheck(isChecked, item.id);
                }}
                key={item.id}
                style={{ marginBottom: 15 }}
              />
            );
          })
        ) : (
          <></>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#0C2299",
    padding: 16,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  todoContainer: {
    width: "100%",
    height: "100%",
    // backgroundColor:'#054a91',
    backgroundColor: "#0077b6",
    padding: 10,
    borderRadius: 15,
  },
});
