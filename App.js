import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native-web";

const DUMMY_PROFILES = [
  { id: 1, name: "Alice", age: 28, bio: "Adventure seeker", image: "https://maxm-imggenurl.web.val.run/headshot-of-a-smiling-woman-with-blonde-hair" },
  { id: 2, name: "Bob", age: 32, bio: "Coffee enthusiast", image: "https://maxm-imggenurl.web.val.run/headshot-of-a-smiling-man-with-brown-hair" },
  { id: 3, name: "Charlie", age: 25, bio: "Music lover", image: "https://maxm-imggenurl.web.val.run/headshot-of-a-smiling-person-with-curly-hair" },
];

function App() {
  const [currentProfile, setCurrentProfile] = useState(0);

  const handleSwipe = (direction) => {
    console.log(`Swiped ${direction} on ${DUMMY_PROFILES[currentProfile].name}`);
    setCurrentProfile((prev) => (prev + 1) % DUMMY_PROFILES.length);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: DUMMY_PROFILES[currentProfile].image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{DUMMY_PROFILES[currentProfile].name}, {DUMMY_PROFILES[currentProfile].age}</Text>
          <Text style={styles.bio}>{DUMMY_PROFILES[currentProfile].bio}</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.button, styles.nopeButton]} onPress={() => handleSwipe('left')}>
          <Text style={styles.buttonText}>✖️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.likeButton]} onPress={() => handleSwipe('right')}>
          <Text style={styles.buttonText}>❤️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: 300,
    height: 400,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '80%',
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 14,
    color: '#666',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nopeButton: {
    backgroundColor: '#ff6b6b',
  },
  likeButton: {
    backgroundColor: '#4ecdc4',
  },
  buttonText: {
    fontSize: 30,
  },
});
