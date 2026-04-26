import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// This defines what a "Set" looks like
interface WorkoutSet {
  id: string;
  exercise: string;
  weight: string;
  reps: string;
  date: string;
}

export default function WorkoutsScreen() {
  const [exercise, setExercise] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutSet[]>([]);

  const saveSet = () => {
    if (exercise && weight && reps) {
      const newSet: WorkoutSet = {
        id: Date.now().toString(),
        exercise,
        weight,
        reps,
        date: new Date().toLocaleDateString(),
      };
      setWorkoutHistory([newSet, ...workoutHistory]);
      // Clear inputs after saving
      setWeight('');
      setReps('');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <Text style={styles.header}>Gym Log</Text>

      {/* Input Section */}
      <View style={styles.card}>
        <TextInput 
          style={styles.input} 
          placeholder="Exercise (e.g. Bench Press)" 
          placeholderTextColor="#888"
          value={exercise}
          onChangeText={setExercise}
        />
        <View style={styles.row}>
          <TextInput 
            style={[styles.input, { flex: 1, marginRight: 10 }]} 
            placeholder="Weight (lbs)" 
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />
          <TextInput 
            style={[styles.input, { flex: 1 }]} 
            placeholder="Reps" 
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={reps}
            onChangeText={setReps}
          />
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={saveSet}>
          <Ionicons name="add-circle" size={20} color="white" />
          <Text style={styles.saveButtonText}>Log Set</Text>
        </TouchableOpacity>
      </View>

      {/* History List */}
      <FlatList 
        data={workoutHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.historyCard}>
            <View>
              <Text style={styles.historyExercise}>{item.exercise}</Text>
              <Text style={styles.historyDate}>{item.date}</Text>
            </View>
            <View style={styles.statsContainer}>
              <Text style={styles.historyStats}>{item.weight} lbs x {item.reps}</Text>
            </View>
          </View>
        )}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', paddingTop: 60, paddingHorizontal: 20 },
  header: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  card: { backgroundColor: '#1c1c1e', padding: 15, borderRadius: 15, marginBottom: 20 },
  input: { backgroundColor: '#2c2c2e', color: '#fff', borderRadius: 8, padding: 12, marginBottom: 10, fontSize: 16 },
  row: { flexDirection: 'row' },
  saveButton: { backgroundColor: '#007AFF', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 15, borderRadius: 10 },
  saveButtonText: { color: 'white', fontWeight: 'bold', marginLeft: 8, fontSize: 16 },
  historyCard: { backgroundColor: '#1c1c1e', padding: 15, borderRadius: 12, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  historyExercise: { color: '#fff', fontSize: 18, fontWeight: '600' },
  historyDate: { color: '#888', fontSize: 12 },
  statsContainer: { backgroundColor: '#2c2c2e', padding: 8, borderRadius: 6 },
  historyStats: { color: '#007AFF', fontWeight: 'bold', fontSize: 16 },
});