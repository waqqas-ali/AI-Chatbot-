// import React, { useState, useRef } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   StatusBar,
// } from "react-native";

// // 🔑 API URL
// const API_URL = "https://router.huggingface.co/v1/chat/completions";

// export default function App() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const flatListRef = useRef();

//   // 🧠 Send Message to AI (Lightweight)
//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { role: "user", content: input };

//     // Add user message
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: {
//           "Authorization": `Bearer ${process.env.EXPO_PUBLIC_AI_KEY}`, // ⚠️ dev only
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           model: "openai/gpt-oss-20b:groq",
//           messages: [
//             { role: "system", content: "You are a helpful assistant" },
//             ...messages,
//             userMessage,
//           ],
//         }),
//       });

//       const data = await response.json();

//       const aiMessage = {
//         role: "assistant",
//         content:
//           data?.choices?.[0]?.message?.content ||
//           "⚠️ No response from AI",
//       };

//       setMessages((prev) => [...prev, aiMessage]);
//     } catch (error) {
//       console.log("AI Error:", error);

//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content: "⚠️ Something went wrong. Try again.",
//         },
//       ]);
//     }

//     setLoading(false);
//   };

//   // 💬 Render Message
//   const renderItem = ({ item, index }) => {
//     const isUser = item.role === "user";

//     return (
//       <View
//         style={[
//           styles.messageWrapper,
//           isUser ? styles.rightAlign : styles.leftAlign,
//         ]}
//       >
//         <View
//           style={[
//             styles.messageBubble,
//             isUser ? styles.userBubble : styles.aiBubble,
//           ]}
//         >
//           <Text style={styles.messageText}>{item.content}</Text>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <StatusBar barStyle="light-content" />

//       {/* CHAT LIST */}
//       <FlatList
//         ref={flatListRef}
//         data={messages}
//         renderItem={renderItem}
//         keyExtractor={(item, index) => `${item.role}-${index}`}
//         contentContainerStyle={styles.listContainer}
//         initialNumToRender={10}
//         maxToRenderPerBatch={10}
//         windowSize={5}
//         removeClippedSubviews
//         showsVerticalScrollIndicator={false}
//         onContentSizeChange={() =>
//           flatListRef.current?.scrollToEnd({ animated: true })
//         }
//       />

//       {/* LOADING */}
//       {loading && (
//         <View style={styles.loader}>
//           <ActivityIndicator size="small" color="#fff" />
//         </View>
//       )}

//       {/* INPUT */}
//       <View style={styles.inputContainer}>
//         <TextInput
//           value={input}
//           onChangeText={setInput}
//           placeholder="Type a message..."
//           placeholderTextColor="#888"
//           style={styles.input}
//           multiline
//         />

//         <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
//           <Text style={styles.sendText}>➤</Text>
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// // 🎨 STYLES
// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 40,
//     flex: 1,
//     backgroundColor: "#0f172a",
//   },

//   listContainer: {
//     padding: 12,
//     paddingBottom: 80,
//   },

//   messageWrapper: {
//     marginVertical: 6,
//     flexDirection: "row",
//   },

//   leftAlign: {
//     justifyContent: "flex-start",
//   },

//   rightAlign: {
//     justifyContent: "flex-end",
//   },

//   messageBubble: {
//     maxWidth: "75%",
//     padding: 12,
//     borderRadius: 16,
//   },

//   userBubble: {
//     backgroundColor: "#2563eb",
//     borderBottomRightRadius: 4,
//   },

//   aiBubble: {
//     backgroundColor: "#1e293b",
//     borderBottomLeftRadius: 4,
//   },

//   messageText: {
//     color: "#fff",
//     fontSize: 15,
//     lineHeight: 20,
//   },

//   inputContainer: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     flexDirection: "row",
//     padding: 10,
//     backgroundColor: "#020617",
//     borderTopWidth: 1,
//     borderColor: "#1e293b",
//   },

//   input: {
//     flex: 1,
//     backgroundColor: "#1e293b",
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     color: "#fff",
//     maxHeight: 100,
//   },

//   sendButton: {
//     marginLeft: 10,
//     backgroundColor: "#2563eb",
//     paddingHorizontal: 16,
//     justifyContent: "center",
//     borderRadius: 12,
//   },

//   sendText: {
//     color: "#fff",
//     fontSize: 18,
//   },

//   loader: {
//     paddingVertical: 5,
//     alignItems: "center",
//   },
// });





// import React, { useEffect, useRef } from "react";
// import { View, Button } from "react-native";
// import { Audio } from "expo-av";
// import * as Speech from "expo-speech";

// export default function App() {
//   const ws = useRef(null);
//   const recording = useRef(null);

//   useEffect(() => {
//     ws.current = new WebSocket("ws://192.168.1.35:3000");

//     ws.current.onmessage = (event) => {
//       const data = JSON.parse(event.data);

//       // 🔊 Speak response
//       Speech.speak(data.text);
//     };
//   }, []);

//   const startRecording = async () => {
//     await Audio.requestPermissionsAsync();

//     const rec = new Audio.Recording();
//     await rec.prepareToRecordAsync(
//       Audio.RecordingOptionsPresets.HIGH_QUALITY
//     );
//     await rec.startAsync();

//     recording.current = rec;
//   };

//   const stopRecording = async () => {
//     await recording.current.stopAndUnloadAsync();
//     const uri = recording.current.getURI();

//     const response = await fetch(uri);
//     const blob = await response.blob();

//     // send to backend
//     ws.current.send(blob);
//   };

//   return (
//     <View style={{ marginTop: 100 }}>
//       <Button title="Start Talking" onPress={startRecording} />
//       <Button title="Stop & Send" onPress={stopRecording} />
//     </View>
//   );
// }





// import React, { useEffect, useRef, useState } from "react";
// import { View, Button, Text } from "react-native";
// import { Audio } from "expo-av";
// import * as Speech from "expo-speech";

// export default function App() {
//   const recording = useRef(null);
//   const ws = useRef(null);
//   const [status, setStatus] = useState("Idle");

//   useEffect(() => {
//     ws.current = new WebSocket("ws://192.168.1.35:3000");

//     ws.current.onopen = () => {
//       console.log("✅ Connected");
//       setStatus("Connected");
//     };

//     ws.current.onmessage = (event) => {
//       const data = JSON.parse(event.data);

//       console.log("🤖 AI:", data.text);
//       setStatus("AI Speaking...");

//       Speech.speak(data.text, {
//         onDone: () => setStatus("Idle"),
//       });
//     };

//     ws.current.onerror = (err) => {
//       console.log("❌ WS Error:", err.message);
//       setStatus("Error");
//     };

//     return () => ws.current?.close();
//   }, []);

//   // 🎤 Start Recording
//   const startRecording = async () => {
//     try {
//       setStatus("Recording...");

//       await Audio.requestPermissionsAsync();

//       const rec = new Audio.Recording();

//       await rec.prepareToRecordAsync(
//         Audio.RecordingOptionsPresets.HIGH_QUALITY
//       );

//       await rec.startAsync();

//       recording.current = rec;

//       console.log("🎤 Recording started");
//     } catch (err) {
//       console.log("❌ Start Error:", err);
//     }
//   };

//   // 🛑 Stop Recording
//   const stopRecording = async () => {
//     try {
//       setStatus("Processing...");

//       await recording.current.stopAndUnloadAsync();

//       const uri = recording.current.getURI();

//       console.log("📁 Audio:", uri);

//       const response = await fetch(uri);
//       const blob = await response.blob();

//       ws.current.send(blob);
//       console.log("📡 Audio sent");
//       setStatus("Waiting for AI...");
//     } catch (err) {
//       console.log("❌ Stop Error:", err);
//     }
//   };

//   return (
//     <View style={{ marginTop: 100, padding: 20 }}>
//       <Text style={{ marginBottom: 20 }}>
//         Status: {status}
//       </Text>

//       <Button title="🎤 Start Talking" onPress={startRecording} />
//       <View style={{ height: 20 }} />
//       <Button title="🛑 Stop & Send" onPress={stopRecording} />
//     </View>
//   );
// }







import React, { useEffect, useRef, useState } from "react";
import { View, Button, Text } from "react-native";
import { Audio } from "expo-av";
import * as Speech from "expo-speech";

export default function App() {
  const recording = useRef(null);
  const ws = useRef(null);
  const [status, setStatus] = useState("Idle");

  useEffect(() => {
    // 🔊 Enable audio (IMPORTANT for iOS)
    Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    // 🔌 WebSocket connection
    ws.current = new WebSocket("ws://192.168.1.35:3000");

    ws.current.onopen = () => {
      console.log("✅ Connected");
      setStatus("Connected");
    };

    ws.current.onmessage = (event) => {
      console.log("📩 RAW:", event.data);

      try {
        // ✅ Safe JSON parsing
        let data;
        try {
          data = JSON.parse(event.data);
        } catch (e) {
          console.log("❌ JSON Parse Failed");
          return;
        }

        if (!data || typeof data.text !== "string") {
          console.log("❌ Invalid data:", data);
          return;
        }

        let text = data.text.trim();

        // ✅ Prevent crash (limit length)
        if (text.length > 300) {
          text = text.substring(0, 300);
          console.log("⚠️ Trimmed long response");
        }

        console.log("🤖 AI:", text);

        setStatus("AI Speaking...");

        // 🔥 Stop previous speech
        try {
          Speech.stop();
        } catch (e) {}

        // 🔊 Speak safely
        Speech.speak(text, {
          language: "en",
          pitch: 1,
          rate: 0.9,
          onStart: () => console.log("🔊 Speaking started"),
          onDone: () => {
            console.log("✅ Speaking finished");
            setStatus("Idle");
          },
          onError: (e) => {
            console.log("❌ Speech error:", e);
            setStatus("Speech error");
          },
        });

      } catch (err) {
        console.log("❌ Crash prevented:", err);
      }
    };

    ws.current.onerror = (err) => {
      console.log("❌ WS Error:", err.message);
      setStatus("Error");
    };

    ws.current.onclose = () => {
      console.log("🔌 Disconnected");
      setStatus("Disconnected");
    };

    return () => ws.current?.close();
  }, []);

  // 🎤 Start Recording
  const startRecording = async () => {
    try {
      setStatus("Recording...");

      const permission = await Audio.requestPermissionsAsync();

      if (!permission.granted) {
        alert("Microphone permission required");
        return;
      }

      const rec = new Audio.Recording();

      await rec.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      await rec.startAsync();

      recording.current = rec;

      console.log("🎤 Recording started");
    } catch (err) {
      console.log("❌ Start Error:", err);
      setStatus("Start Error");
    }
  };

  // 🛑 Stop Recording & Send
  const stopRecording = async () => {
    try {
      if (!recording.current) {
        console.log("⚠️ No recording");
        return;
      }

      setStatus("Processing...");

      await recording.current.stopAndUnloadAsync();

      const uri = recording.current.getURI();

      console.log("📁 Audio:", uri);

      const response = await fetch(uri);
      const blob = await response.blob();

      // 📡 Send audio
      ws.current.send(blob);

      console.log("📡 Audio sent");

      setStatus("Waiting for AI...");
    } catch (err) {
      console.log("❌ Stop Error:", err);
      setStatus("Stop Error");
    }
  };

  return (
    <View
      style={{
        marginTop: 100,
        padding: 20,
        alignItems: "center",
      }}
    >
      <Text style={{ marginBottom: 20, fontSize: 18 }}>
        Status: {status}
      </Text>

      <Button title="🎤 Start Talking" onPress={startRecording} />
      <View style={{ height: 20 }} />
      <Button title="🛑 Stop & Send" onPress={stopRecording} />

      <View style={{ height: 20 }} />

      {/* 🔊 Test button */}
      <Button
        title="🔊 Test Voice"
        onPress={() => {
          Speech.stop();
          Speech.speak("Hello, voice is working correctly");
        }}
      />
    </View>
  );
}