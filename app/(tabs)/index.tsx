import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Text, TextInput, View, Button, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // ✅ Expo vector icons

const App = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiResult, setBmiResult] = useState('');
  const [unit, setUnit] = useState('Metric');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const validateInput = (value, type) => {
    const num = parseFloat(value);
    if (isNaN(num) || num <= 0) {
      Alert.alert('Invalid Input', `Please enter a valid ${type}.`);
      return false;
    }
    return true;
  };

  const calculateBMI = () => {
    if (!validateInput(height, 'height') || !validateInput(weight, 'weight')) return;

    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);
    let bmi;

    if (unit === 'Metric') {
      const heightInMeters = heightNum / 100;
      bmi = weightNum / (heightInMeters * heightInMeters);
    } else {
      bmi = (weightNum / (heightNum * heightNum)) * 703;
    }

    let category = getBMICategory(bmi);
    setBmiResult(`BMI: ${bmi.toFixed(2)}, Category: ${category}`);
  };

  const getBMICategory = (bmi) => {
    if (bmi <= 18.5) return 'Underweight';
    if (bmi < 24.9) return 'Normal weight';
    if (bmi < 29.9) return 'Overweight';
    return 'Obesity';
  };

  const clearInputs = () => {
    setHeight('');
    setWeight('');
    setBmiResult('');
    setUnit('Metric');
  };

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>BMI Calculator</Text>
      
      <Ionicons
        name={isDarkMode ? 'sunny' : 'moon'}
        size={30}
        color={isDarkMode ? '#FFC107' : '#000'}
        onPress={toggleDarkMode}
        style={styles.icon}
      />

      {/* Picker */}
      <View
        style={[
          styles.pickerWrapper,
          isDarkMode ? styles.darkInputContainer : styles.lightInputContainer,
        ]}
      >
        <Picker
          selectedValue={unit}
          style={[
            styles.picker,
            { color: isDarkMode ? "#FFF" : "#000" },
          ]}
          onValueChange={(itemValue) => setUnit(itemValue)}
          itemStyle={{ color: isDarkMode ? "#FFF" : "#000" }}
        >
          <Picker.Item label="Metric (kg/cm)" value="Metric" />
          <Picker.Item label="Standard (lb/in)" value="Standard" />
        </Picker>
      </View>

      {/* ✅ Show selected unit for debugging */}
      <Text style={[styles.selectedUnit, isDarkMode ? styles.darkText : styles.lightText]}>
        Currently Selected Unit: {unit}
      </Text>

      {/* Inputs */}
      <View style={[styles.inputContainer, isDarkMode ? styles.darkInputContainer : styles.lightInputContainer]}>
        <TextInput
          style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
          placeholder={`Height (${unit === 'Metric' ? 'cm' : 'inches'})`}
          placeholderTextColor={isDarkMode ? '#CCC' : '#555'}
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />

        <TextInput
          style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
          placeholder={`Weight (${unit === 'Metric' ? 'kg' : 'lbs'})`}
          placeholderTextColor={isDarkMode ? '#CCC' : '#555'}
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
      </View>

      <Button title="Calculate BMI" onPress={calculateBMI} color={isDarkMode ? '#FFC107' : '#000'} />

      <TouchableOpacity onPress={clearInputs} style={styles.clearButton}>
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>

      {bmiResult ? <Text style={[styles.result, isDarkMode ? styles.darkText : styles.lightText]}>{bmiResult}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 60,
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  lightContainer: {
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  darkText: {
    color: '#FFFFFF',
  },
  lightText: {
    color: '#000000',
  },
  icon: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  pickerWrapper: {
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  selectedUnit: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
    fontWeight: '600',
  },
  inputContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    padding: 10,
  },
  darkInputContainer: {
    backgroundColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  lightInputContainer: {
    backgroundColor: '#f9f9f9',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 6,
    fontSize: 16,
  },
  darkInput: {
    backgroundColor: '#555',
    borderColor: '#777',
    color: '#FFF',
  },
  lightInput: {
    backgroundColor: '#FFF',
    borderColor: '#ccc',
    color: '#000',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  result: {
    marginTop: 25,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  clearButton: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#FF3D00',
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default App;
