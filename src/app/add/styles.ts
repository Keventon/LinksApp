import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 62,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 24,
    paddingRight: 40,
    marginBottom: 24,
  },
  title: {
    color: colors.gray[200],
    fontSize: 24,
    fontWeight: "600",
  },
  label: {
    color: colors.gray[400],
    fontSize: 14,
    paddingHorizontal: 24,
  },
  form: {
    padding: 24,
    gap: 16,
  },
});

export default styles;
