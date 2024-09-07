import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";

import { StackNavigationProp } from "@react-navigation/stack";
import {
  addDocumentReference,
  createUser,
} from "@/src/firebase/firebase-config";
import { UserFactory } from "@/src/factories/UserFactory";
import { User } from "@/src/models/User";
import { FirestoreData } from "@/src/models/FireStoreData";

type RootStackParamList = {
  Login: undefined;
};

type RegistrationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface RegistrationScreenProps {
  navigation: RegistrationScreenNavigationProp;
}

export default function RegistrationScreen({
  navigation,
}: RegistrationScreenProps) {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = async () => {
    let user: User = await UserFactory.createUser(email, password, name);
    createUser(user)
      .then((response: any) => {
        console.log("user creation sucessful")
        const data: FirestoreData = {
          id: response.user?.uid,
          email: user.email,
          name: user.name,
        };
        addDocumentReference("users", data)
          .then(() => console.log("doc added"))
          .catch((error: any) =>
            console.log("error addDocumentReference :", error)
          );
      })
      .catch((error: any) => console.log("error createUser : ", error));
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setname(text)}
          value={name}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}
        >
          <Text style={styles.buttonTitle}>Create account</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already got an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
