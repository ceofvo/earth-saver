import { StatusBar } from "expo-status-bar";

import AuthProvider from "./service/AuthContext";
import AuthContentSwitch from "./menu/AuthContentSwitch";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthProvider>
        <AuthContentSwitch />
      </AuthProvider>
    </>
  );
}
