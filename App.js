// import React from 'react'
// import AppNavigation from './src/navigation/AppNavigation'

// const App = () => {
//   return (
//       <AppNavigation />
//   )
// }

// export default App




import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { OpenAI } from "openai";

// 🔑 Setup AI Client
const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.EXPO_PUBLIC_AI_KEY, // 👉 PUT YOUR TOKEN HERE
  defaultHeaders: {
    "Content-Type": "application/json",
  },
});

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const flatListRef = useRef();

  // 🧠 Send Message to AI
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };

    // Add user message
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await client.chat.completions.create({
        model: "openai/gpt-oss-20b:groq",
        messages: [
          { role: "system", content: "You are a helpful assistant" },
          ...messages,
          userMessage,
        ],
      });

      const aiMessage = {
        role: "assistant",
        content: response.choices[0].message.content,
      };

      // Add AI response
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log("AI Error:", error);
    }

    setLoading(false);
  };

  // 💬 Render Message
  const renderItem = ({ item }) => {
    const isUser = item.role === "user";

    return (
      <View
        style={[
          styles.messageWrapper,
          isUser ? styles.rightAlign : styles.leftAlign,
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            isUser ? styles.userBubble : styles.aiBubble,
          ]}
        >
          <Text style={styles.messageText}>{item.content}</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar style="light" />
      
      {/* CHAT LIST */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContainer}

        // ⚡ PERFORMANCE
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews
        showsVerticalScrollIndicator={false}

        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />

      {/* LOADING */}
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="small" color="#fff" />
        </View>
      )}

      {/* INPUT */}
      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          placeholderTextColor="#888"
          style={styles.input}
          multiline
        />

        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendText}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// 🎨 STYLES
const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: "#0f172a",
  },

  listContainer: {
    padding: 12,
    paddingBottom: 80,
  },

  messageWrapper: {
    marginVertical: 6,
    flexDirection: "row",
  },

  leftAlign: {
    justifyContent: "flex-start",
  },

  rightAlign: {
    justifyContent: "flex-end",
  },

  messageBubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 16,
  },

  userBubble: {
    backgroundColor: "#2563eb",
    borderBottomRightRadius: 4,
  },

  aiBubble: {
    backgroundColor: "#1e293b",
    borderBottomLeftRadius: 4,
  },

  messageText: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 20,
  },

  inputContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#020617",
    borderTopWidth: 1,
    borderColor: "#1e293b",
  },

  input: {
    flex: 1,
    backgroundColor: "#1e293b",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#fff",
    maxHeight: 100,
  },

  sendButton: {
    marginLeft: 10,
    backgroundColor: "#2563eb",
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 12,
  },

  sendText: {
    color: "#fff",
    fontSize: 18,
  },

  loader: {
    paddingVertical: 5,
    alignItems: "center",
  },
});





