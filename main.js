import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  Text, 
  Alert
} from 'react-native';

export default function App() {
  // Game state
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [level, setLevel] = useState(0);
  const [difficulty, setDifficulty] = useState('easy'); // 'easy', 'medium', 'hard'
  const [flashingColor, setFlashingColor] = useState(null);
  
  // Colors for our game
  const colors = ['green', 'red', 'blue', 'yellow', 'purple', 'orange', 'pink', 'teal', 'lime'];
  
  // Get settings based on difficulty
  const getSettings = () => {
    switch(difficulty) {
      case 'medium':
        return { speed: 600, colors: 9 };
      case 'hard':
        return { speed: 400, colors: 9, reverse: true };
      default: // easy
        return { speed: 800, colors: 6 };
    }
  };
  
  // Start a new game
  const startGame = () => {
    setSequence([]);
    setPlayerSequence([]);
    setLevel(0);
    setIsPlaying(true);
    addToSequence();
  };
  
  // Add a new color to the sequence
  const addToSequence = () => {
    const settings = getSettings();
    const availableColors = colors.slice(0, settings.colors);
    const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];
    
    const newSequence = [...sequence, randomColor];
    setSequence(newSequence);
    setLevel(newSequence.length);
    
    // Show the sequence
    setTimeout(() => showSequence(newSequence), 1000);
  };
  
  // Show the sequence to the player
  const showSequence = (sequenceToShow) => {
    setIsShowingSequence(true);
    setPlayerSequence([]);
    
    const settings = getSettings();
    
    // Flash each button in the sequence
    sequenceToShow.forEach((color, index) => {
      setTimeout(() => {
        // Flash the button
        setFlashingColor(color);
        
        // Return to normal after a short time
        setTimeout(() => {
          setFlashingColor(null);
        }, 300);
        
        // If this is the last item, allow player to respond
        if (index === sequenceToShow.length - 1) {
          setTimeout(() => setIsShowingSequence(false), 500);
        }
      }, index * settings.speed);
    });
  };
  
  // Handle player button press
  const handlePress = (color) => {
    if (isShowingSequence || !isPlaying) return;
    
    // Flash the button when pressed
    setFlashingColor(color);
    setTimeout(() => setFlashingColor(null), 300);
    
    const newPlayerSequence = [...playerSequence, color];
    setPlayerSequence(newPlayerSequence);
    
    const settings = getSettings();
    const expectedSequence = settings.reverse ? [...sequence].reverse() : sequence;
    
    // Check if player made a mistake
    const index = newPlayerSequence.length - 1;
    if (newPlayerSequence[index] !== expectedSequence[index]) {
      Alert.alert('Game Over!', `You reached level ${level}`, [
        { text: 'Play Again', onPress: startGame }
      ]);
      setIsPlaying(false);
      return;
    }
    
    // Check if player completed the sequence
    if (newPlayerSequence.length === expectedSequence.length) {
      setTimeout(() => addToSequence(), 1000);
    }
  };
  
  // Change difficulty
  const changeDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty);
    if (isPlaying) {
      Alert.alert('Difficulty Changed', 'Starting a new game with new difficulty');
      setTimeout(startGame, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Genius Game</Text>
      <Text style={styles.info}>Level: {level} | Difficulty: {difficulty}</Text>
      
      <View style={styles.gameContainer}>
        {/* First row */}
        <View style={styles.row}>
          {colors.slice(0, 3).map(color => (
            <TouchableOpacity
              key={color}
              style={[
                styles.button, 
                styles[color],
                flashingColor === color && styles.flashingButton
              ]}
              onPress={() => handlePress(color)}
              disabled={isShowingSequence || !isPlaying}
            />
          ))}
        </View>
        
        {/* Second row */}
        <View style={styles.row}>
          {colors.slice(3, 6).map(color => (
            <TouchableOpacity
              key={color}
              style={[
                styles.button, 
                styles[color],
                flashingColor === color && styles.flashingButton
              ]}
              onPress={() => handlePress(color)}
              disabled={isShowingSequence || !isPlaying}
            />
          ))}
        </View>
        
        {/* Third row */}
        <View style={styles.row}>
          {colors.slice(6, 9).map(color => (
            <TouchableOpacity
              key={color}
              style={[
                styles.button, 
                styles[color],
                flashingColor === color && styles.flashingButton
              ]}
              onPress={() => handlePress(color)}
              disabled={isShowingSequence || !isPlaying}
            />
          ))}
        </View>
      </View>
      
      {/* Game controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.startButton} onPress={startGame}>
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>
        
        <View style={styles.difficultyButtons}>
          <TouchableOpacity 
            style={[styles.diffButton, styles.easyButton, difficulty === 'easy' && styles.selectedButton]} 
            onPress={() => changeDifficulty('easy')}
          >
            <Text style={styles.diffButtonText}>Easy</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.diffButton, styles.mediumButton, difficulty === 'medium' && styles.selectedButton]} 
            onPress={() => changeDifficulty('medium')}
          >
            <Text style={styles.diffButtonText}>Medium</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.diffButton, styles.hardButton, difficulty === 'hard' && styles.selectedButton]} 
            onPress={() => changeDifficulty('hard')}
          >
            <Text style={styles.diffButtonText}>Hard</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {isShowingSequence && <Text style={styles.message}>Watch the sequence...</Text>}
      {isPlaying && !isShowingSequence && (
        <Text style={styles.message}>
          {getSettings().reverse ? 'Repeat in REVERSE order' : 'Repeat the sequence'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 20,
  },
  gameContainer: {
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    width: 70,
    height: 70,
    margin: 5,
    borderRadius: 8,
  },
  flashingButton: {
    opacity: 0.5,
  },
  // Button colors
  green: { backgroundColor: '#00c853' },
  red: { backgroundColor: '#ff1744' },
  blue: { backgroundColor: '#2979ff' },
  yellow: { backgroundColor: '#ffea00' },
  purple: { backgroundColor: '#aa00ff' },
  orange: { backgroundColor: '#ff6d00' },
  pink: { backgroundColor: '#f50057' },
  teal: { backgroundColor: '#00bfa5' },
  lime: { backgroundColor: '#c6ff00' },
  controls: {
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  difficultyButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  diffButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  easyButton: { backgroundColor: '#4caf50' },
  mediumButton: { backgroundColor: '#ff9800' },
  hardButton: { backgroundColor: '#f44336' },
  selectedButton: {
    borderWidth: 2,
    borderColor: '#000',
  },
  diffButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
    marginTop: 15,
    fontStyle: 'italic',
  },
});

console.log('Minimal Genius Game is ready to run!');
