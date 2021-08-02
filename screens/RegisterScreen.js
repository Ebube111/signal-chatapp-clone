import React, { useState, useLayoutEffect } from "react";
import {
    StyleSheet,
    View,
    KeyboardAvoidingView,
    ScrollView
} from "react-native";
import { Input, Image, Text, Button } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";
import manImage from "../images/man.jpg";

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: " Back to Login"
        });
    }, [navigation]);

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL: imageUrl || manImage
                });
            })
            .catch((error) => alert(error.message));
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <KeyboardAvoidingView behavior="padding" style={styles.view}>
                    <StatusBar style="light" />
                    <Text h3 style={{ marginBottom: 50 }}>
                        Create a Signal account
                    </Text>
                    <View style={styles.inputContainer}>
                        <Input
                            placeholder="Full Name"
                            autoFocus
                            type="text"
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                        <Input
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <Input
                            placeholder="password"
                            type="password"
                            value={password}
                            secureTextEntry
                            onChangeText={(text) => setPassword(text)}
                        />
                        <Input
                            placeholder="Profile Picture Url (optional)"
                            autoFocus
                            type="text"
                            value={imageUrl}
                            onChangeText={(text) => setImageUrl(text)}
                            onSubmitEditing={register}
                        />
                    </View>
                    <Button
                        containerStyle={styles.button}
                        raised
                        onPress={register}
                        title="Register"
                    />
                </KeyboardAvoidingView>
            </View>
        </ScrollView>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    view: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },
    button: {
        width: 200,
        marginTop: 10
    },
    inputContainer: {
        width: 300
    }
});
