import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react";

interface CheckItem {
  id: number;
  description: string;
  checked: boolean;
}

interface List {
  id: number;
  name: string;
  items: CheckItem[];
}

interface ListaContextType {
  listas: List[];
  modalVisibleAdd: boolean;
  showModalAdd: (show: boolean) => void;
  newList: (title: string) => void;
  selectedList: List;
  selectedListSet: (index: number) => void;
  modalVisibleCheck: boolean;
  showModalCheck: (show: boolean) => void;
  newCheck: (checkItem :string ) => void;
  updateCheck: (checkState:boolean,checkId:number) => void
}

interface ListasProviderProps {
  children: ReactNode;
}

export const ListaContext = createContext({} as ListaContextType);

export function ListasProvider({ children }: ListasProviderProps) {
  const [listas, setListas] = useState<List[]>([]);
  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
  const [modalVisibleCheck, setModalVisibleCheck] = useState(false);
  const [selectedList, setSelectedList] = useState<List>({
    id: 0,
    name: "",
    items: []
  });

  async function getStoreData() {
    const jsonValue = await AsyncStorage.getItem('Listas')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  }

  async function setStoreData(listasArray : List[] ) {
    const jsonValue = JSON.stringify(listasArray)
    await AsyncStorage.setItem('Listas', jsonValue)
  }

  function selectedListSet(index: number) {
    setSelectedList(listas[index]);
  }

  function showModalAdd(show: boolean) {
    setModalVisibleAdd(show);
  }
  function showModalCheck(show: boolean) {
    setModalVisibleCheck(show);
  }

  function newList(listaTitle: string) {
    const lastId = listas.length;
    if (lastId === 0) {
      const newList: List = {
        id: 0,
        name: listaTitle,
        items: []
      };
      setListas((state) => [...state, newList]);
      setSelectedList(newList);
      setStoreData(listas)
    } else {
        const newList: List = {
            id: lastId,
            name: listaTitle,
            items: []
        };
        setListas((state) => [...state, newList]);
        setSelectedList(newList);
        setStoreData(listas)
    }
  }
  function newCheck(checkItem: string) {
    var listaToUpdate :List[] = listas;
    listaToUpdate[selectedList.id].items.push({
        checked: false,
        description: checkItem,
        id: listaToUpdate[selectedList.id].items.length === 0 ? 0 : listaToUpdate[selectedList.id].items.length
    })

    setListas(listaToUpdate)
    setStoreData(listaToUpdate)
  }
  function updateCheck(checkState:boolean,checkId:number){
    var listaToUpdate :List[] = listas;
    listaToUpdate[selectedList.id].items[checkId].checked = checkState;
    setListas(listaToUpdate)
    setStoreData(listaToUpdate)

  }

  async function inialSet (){
    const storeListas = await getStoreData()
    if(storeListas == null){
        setListas([])
    }else{
        setListas(storeListas)
    }
  }

  useEffect(()=>{
    inialSet()
  },[])

  return (
    <ListaContext.Provider
      value={{
        listas,
        modalVisibleAdd,
        showModalAdd,
        newList,
        selectedList,
        selectedListSet,
        modalVisibleCheck,
        showModalCheck,
        newCheck,
        updateCheck,
      }}
    >
      {children}
    </ListaContext.Provider>
  );
}
