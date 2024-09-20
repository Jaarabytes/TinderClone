import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native-web";

const DUMMY_PROFILES = [
  { id: 1, name: "Alice", age: 28, bio: "Adventure seeker", image: "https://maxm-imggenurl.web.val.run/headshot-of-a-smiling-woman-with-blonde-hair" },
  { id: 2, name: "Bob", age: 32, bio: "Coffee enthusiast", image: "https://maxm-imggenurl.web.val.run/headshot-of-a-smiling-man-with-brown-hair" },
  { id: 3, name: "Charlie", age: 25, bio: "Music lover", image: "https://maxm-imggenurl.web.val.run/headshot-of-a-smiling-person-with-curly-hair" },
];

// components/Card.js
function Card({ profile, onSwipe }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: profile.image }} style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardName}>{profile.name}, {profile.age}</Text>
        <Text style={styles.cardBio}>{profile.bio}</Text>
      </View>
      <View style={styles.cardButtons}>
        <TouchableOpacity style={[styles.button, styles.nopeButton]} onPress={() => onSwipe('left')}>
          <Text style={styles.buttonText}>✖️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.likeButton]} onPress={() => onSwipe('right')}>
          <Text style={styles.buttonText}>❤️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// components/CardItem.js
function CardItem({ profile }) {
  return (
    <View style={styles.cardItem}>
      <Image source={{ uri: profile.image }} style={styles.cardItemImage} />
      <Text style={styles.cardItemName}>{profile.name}</Text>
    </View>
  );
}

// screens/HomeScreen.js
function HomeScreen({ navigation }) {
  const [currentProfile, setCurrentProfile] = useState(0);

  const handleSwipe = (direction) => {
    console.log(`Swiped ${direction} on ${DUMMY_PROFILES[currentProfile].name}`);
    setCurrentProfile((prev) => (prev + 1) % DUMMY_PROFILES.length);
  };

  return (
    <View style={styles.container}>
      <Card profile={DUMMY_PROFILES[currentProfile]} onSwipe={handleSwipe} />
    </View>
  );
}

// screens/ProfileScreen.js
function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Profile</Text>
      <Image source={{ uri: "https://maxm-imggenurl.web.val.run/headshot-of-a-smiling-person" }} style={styles.profileImage} />
      <Text style={styles.profileName}>John Doe, 30</Text>
      <Text style={styles.profileBio}>I love traveling and trying new foods!</Text>
    </View>
  );
}

// screens/MatchesScreen.js
function MatchesScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>My Matches</Text>
      {DUMMY_PROFILES.map((profile) => (
        <CardItem key={profile.id} profile={profile} />
      ))}
    </ScrollView>
  );
}

// navigation/AppNavigator.js
function AppNavigator() {
  const [currentScreen, setCurrentScreen] = useState('Home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return <HomeScreen navigation={{ navigate: setCurrentScreen }} />;
      case 'Profile':
        return <ProfileScreen />;
      case 'Matches':
        return <MatchesScreen />;
      default:
        return <HomeScreen navigation={{ navigate: setCurrentScreen }} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => setCurrentScreen('Home')}>
          <Text style={styles.tabBarText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentScreen('Profile')}>
          <Text style={styles.tabBarText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentScreen('Matches')}>
          <Text style={styles.tabBarText}>Matches</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// App.js
function App() {
  return <AppNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
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
    margin: 20,
  },
  cardImage: {
    width: '100%',
    height: '70%',
  },
  cardInfo: {
    padding: 10,
  },
  cardName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardBio: {
    fontSize: 14,
    color: '#666',
  },
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nopeButton: {
    backgroundColor: '#ff6b6b',
  },
  likeButton: {
    backgroundColor: '#4ecdc4',
  },
  buttonText: {
    fontSize: 24,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cardItemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  cardItemName: {
    fontSize: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  profileBio: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  tabBarText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

