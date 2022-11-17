import { useContext, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { ListaContext } from "../../context/ListasContext";
import { useNavigation } from "@react-navigation/native";
import { GlobalNavigationProp } from "../../views/Home";
import { CheckCircle, X } from "phosphor-react-native";

export function ModalCheckAdd() {
  const navigation = useNavigation<GlobalNavigationProp>();
  const { modalVisibleCheck, showModalCheck, newCheck } =
    useContext(ListaContext);
  const [text, onChangeText] = useState("");

 

  function checkAdd(title: string) {
    newCheck(text);
    onChangeText("");
    showModalCheck(false);
    navigation.navigate("Selected");
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisibleCheck}
      onRequestClose={() => {
        showModalCheck(!modalVisibleCheck);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            placeholder="Item"
            value={text}
            onChangeText={onChangeText}
          />

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 230,
              marginTop: 25,
            }}
          >
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                onChangeText("");
                showModalCheck(!modalVisibleCheck);
              }}
            >
              <X size={32} color="#FFF" />
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonCreate]}
              onPress={() => checkAdd(text)}
            >
              <CheckCircle size={32} color="#FFF" />
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 25,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#D80B0B",
  },
  buttonCreate: {
    backgroundColor: "#38b000",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    width: 250,
    height: 45,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "#2B2C2E",
    borderRadius: 8,
  },
});
