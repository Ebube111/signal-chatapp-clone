import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    ScrollView
} from "react-native";
import { Input, Image, Button } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";
// import loginImage from '../images/login.png'

function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace("Home");
            }
        });

        return unsubscribe;
    }, []);

    const signin = () => {
        auth.signInWithEmailAndPassword(email, password).catch((error) =>
            alert(error)
        );
    };

    return (
        <ScrollView style={styles.head}>
            <View style={styles.container}>
                <StatusBar style="light" />
                <Image
                    source={require("../images/login.png")}
                    style={{
                        width: 200,
                        height: 200,
                        backgroundColor: "rgba(151, 227, 225, 0.15)",
                        borderRadius: 30
                    }}
                />
                <View style={styles.inputContainer}>
                    <Input
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholder="Email"
                        autoFocus
                        type="email"
                    />
                    <Input
                        placeholder="Password"
                        autoFocus
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                        type="password"
                        onSubmitEditing={signin}
                    />
                </View>
                <Button
                    onPress={signin}
                    title="Login"
                    containerStyle={styles.button}
                />
                <Button
                    onPress={() => navigation.navigate("Register")}
                    title="Register"
                    type="outline"
                    containerStyle={styles.button}
                />
                <View style={{ height: 10 }} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },
    inputContainer: {
        width: 300
    },
    head: {
        flex: 1,
        maxHeight: "100%",
        backgroundColor: "white"
    },
    button: {
        width: 200,
        marginTop: 10,
        marginBottom: 20
    }
});

export default LoginScreen;
