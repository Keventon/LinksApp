import { Alert, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { router } from "expo-router";
import { Categories } from "@/components/Categories";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useState } from "react";
import { linkStorage } from "@/storage/link-storage";

export default function Add() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");

  async function handleAdd() {
    try {
      if (!category) {
        return Alert.alert("Categoria", "Selecione uma categoria");
      }

      if (!name.trim()) {
        return Alert.alert("Nome", "Preencha o nome do link");
      }

      if (!url.trim()) {
        return Alert.alert("URL", "Preencha a URL do link");
      }
      await linkStorage.save({
        id: new Date().getTime().toString(),
        name,
        url,
        category,
      });

      Alert.alert("Sucesso", "Link salvo com sucesso", [
        {
          text: "Ok",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar o link");
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialIcons
            name="arrow-back"
            size={32}
            color={colors.gray[200]}
            onPress={() => router.back()}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Novo</Text>
      </View>

      <Text style={styles.label}>Selecione uma categoria</Text>
      <Categories onChange={setCategory} selected={category} />

      <View style={styles.form}>
        <Input placeholder="Nome do link" onChangeText={setName} />
        <Input placeholder="URL" autoCapitalize="none" onChangeText={setUrl} />
        <Button title="Salvar" onPress={handleAdd} />
      </View>
    </View>
  );
}
