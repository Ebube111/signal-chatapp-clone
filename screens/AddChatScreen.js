import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button, Input } from "react-native-elements";
import { db } from "../firebase";

const AddChatScreen = ({ navigation }) => {
    const [input, setInput] = useState("");
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new Chat",
            headerBackTitle: "Chats"
        });
    });

    const createChat = async () => {
        await db
            .collection("chats")
            .add({
                chatName: input
            })
            .then(() => {
                navigation.goBack();
            })
            .catch((error) => alert(error));
    };
    return (
        <View style={styles.container}>
            <Input
                value={input}
                onChangeText={(text) => setInput(text)}
                leftIcon={
                    <Icon
                        name="wechat"
                        type="antdesign"
                        size={24}
                        color="black"
                    />
                }
                onSubmitEditing={createChat}
                placeholder="Enter a chat name"
            />
            <Button
                disabled={!input}
                onPress={createChat}
                title="add a new chat"
            />
        </View>
    );
};

export default AddChatScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
        height: "100%"
    }
});
