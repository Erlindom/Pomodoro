/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import Header from './src/components/Header';
import Timer from './src/components/Timer';

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

function App(): React.JSX.Element {
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 10)
    } else {
      clearInterval(interval);
    }
    
    if (time === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  function handleStartStop() {
    setIsActive(!isActive);
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors[currentTime]}]}>
      <View style={{paddingHorizontal: 15, flex: 1 }}>
        <Text style={styles.text}>Pomodoro</Text>
        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
        <Timer time={time} />
        <TouchableOpacity style={styles.button} onPress={handleStartStop}>
          <Text style={styles.time}>{isActive ? "STOP" : "START"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
  time: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#333333',
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
  }
});

export default App;
