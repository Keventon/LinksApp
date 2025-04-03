import {
  Alert,
  FlatList,
  Image,
  Linking,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
import { colors } from "@/styles/colors";
import { Categories } from "@/components/Categories";
import { Link } from "@/components/Link";
import { Option } from "@/components/Option";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { categories } from "@/utils/categories";
import { LinkStorage, linkStorage } from "@/storage/link-storage";

export default function Index() {
  const [showModal, setShowModal] = useState(false);
  const [link, setLink] = useState<LinkStorage>({} as LinkStorage);
  const [links, setLinks] = useState<LinkStorage[]>([]);
  const [category, setCategory] = useState(categories[0].name);

  async function geLinks() {
    try {
      const response = await linkStorage.get();

      const filtered = response.filter((link) => {
        return link.category === category;
      });

      setLinks(filtered);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os links");
    }
  }

  function handleDetails(selected: LinkStorage) {
    setShowModal(true);
    setLink(selected);
  }

  async function linkRemove() {
    try {
      await linkStorage.remove(link.id);
      setShowModal(false);
      geLinks();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível remover o link");
    }
  }

  function handleRemove() {
    Alert.alert("Remover", "Tem certeza que deseja remover esse link?", [
      {
        text: "Não",
        onPress: () => setShowModal(false),
      },
      {
        text: "Sim",
        onPress: linkRemove,
        style: "destructive",
      },
    ]);
  }

  async function handleOpenLink() {
    try {
      await Linking.openURL(link.url);
      setShowModal(false);
    } catch (error) {
      setShowModal(false);
      Alert.alert("Erro", "Não foi possível abrir o link");
    }
  }

  useFocusEffect(
    useCallback(() => {
      geLinks();
    }, [category])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("@/assets/logo.png")} style={styles.logo} />

        <TouchableOpacity activeOpacity={0.7}>
          <MaterialIcons
            name="add"
            size={32}
            color={colors.green[300]}
            onPress={() => router.navigate("/add")}
          />
        </TouchableOpacity>
      </View>

      <Categories onChange={setCategory} selected={category} />

      <FlatList
        data={links}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link
            name={item.name}
            url={item.url}
            onDetails={() => {
              handleDetails(item);
            }}
          />
        )}
        style={styles.links}
        contentContainerStyle={styles.linksContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal transparent visible={showModal} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalCategory}>{link.category}</Text>
              <TouchableOpacity>
                <MaterialIcons
                  name="close"
                  size={20}
                  color={colors.gray[400]}
                  onPress={() => setShowModal(false)}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalLinkName}>{link.name}</Text>
            <Text style={styles.modalUrl}>{link.url}</Text>

            <View style={styles.modalFooter}>
              <Option
                name="Excluir"
                icon="delete"
                variant="secondary"
                onPress={handleRemove}
              />
              <Option name="Abrir" icon="language" onPress={handleOpenLink} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
