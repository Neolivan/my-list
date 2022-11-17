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

export function ModalAddList() {
  const navigation = useNavigation<GlobalNavigationProp>();
  const { modalVisibleAdd, showModalAdd, newList } = useContext(ListaContext);
  const [text, onChangeText] = useState("");

  function listAdd(title: string) {
    newList(text);
    onChangeText("");
    showModalAdd(false);
    navigation.navigate("Selected");
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisibleAdd}
      onRequestClose={() => {
        showModalAdd(!modalVisibleAdd);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            placeholder="Nome da lista"
            value={text}
            onChangeText={onChangeText}
          />

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 280,
              marginTop: 25,
            }}
          >
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                onChangeText("");
                showModalAdd(!modalVisibleAdd);
              }}
            >
              <Text style={styles.textStyle}>Cancelar</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonCreate]}
              onPress={() => listAdd(text)}
            >
              <Text style={styles.textStyle}>Criar</Text>
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#D80B0B",
  },
  buttonCreate: {
    backgroundColor: "#38b000",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
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
