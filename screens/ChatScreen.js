import React, { useLayoutEffect, useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import { Avatar } from "react-native-elements";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { db, auth } from "../firebase";
import firebase from "firebase";

const ChatScreen = ({ navigation, route }) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerTitleAlign: "left",
            headerBackTitleVisible: false,
            headerTitle: () => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Avatar
                        rounded
                        source={{
                            uri:
                                messages[0]?.data.photoURL ||
                                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                        }}
                    />

                    <Text
                        style={{
                            color: "white",
                            marginLeft: 10,
                            fontWeight: "700"
                        }}
                    >
                        {route.params.chatName}
                    </Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={navigation.goBack}
                >
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 80,
                        marginRight: 20
                    }}
                >
                    <TouchableOpacity>
                        <FontAwesome
                            name="video-camera"
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        });
    }, [navigation, messages]);

    const sendMessage = () => {
        Keyboard.dismiss();

        db.collection("chats").doc(route.params.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        });
        setInput("");
    };

    useEffect(() => {
        const unsubscribe = db
            .collection("chats")
            .doc(route.params.id)
            .collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                }));
                setMessages(data);
            });
        return unsubscribe;
    }, [route]);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
                            {messages.map(({ id, data }) =>
                                data.email === auth.currentUser.email ? (
                                    <View key={id} style={styles.reciever}>
                                        <Avatar
                                            position="absolute"
                                            rounded
                                            //WEB
                                            containerStyle={{
                                                position: "absolute",
                                                bottom: -15,
                                                right: -5
                                            }}
                                            bottom={-15}
                                            right={-5}
                                            size={30}
                                            source={{ uri: data.photoURL }}
                                        />
                                        <Text style={styles.recieverText}>
                                            {data.message}
                                        </Text>
                                    </View>
                                ) : (
                                    <View key={id} style={styles.sender}>
                                        <Avatar
                                            position="absolute"
                                            rounded
                                            //WEB
                                            containerStyle={{
                                                position: "absolute",
                                                bottom: -15,
                                                right: -5
                                            }}
                                            bottom={-15}
                                            right={-5}
                                            size={30}
                                            source={{ uri: data.photoURL }}
                                        />
                                        <Text style={styles.senderText}>
                                            {data.message}
                                        </Text>
                                        <Text style={styles.senderName}>
                                            {data.displayName}
                                        </Text>
                                    </View>
                                )
                            )}
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput
                                value={input}
                                onChangeText={(text) => setInput(text)}
                                onSubmitEditing={sendMessage}
                                style={styles.textInput}
                                placeholder="Signal Message"
                            />
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={sendMessage}
                            >
                                <Ionicons
                                    name="send"
                                    size={24}
                                    color="#2B68E6"
                                />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    reciever: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative"
    },
    sender: {
        padding: 15,
        backgroundColor: "#2B68E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative"
    },
    senderText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15
    },
    recieverText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30
    }
});
