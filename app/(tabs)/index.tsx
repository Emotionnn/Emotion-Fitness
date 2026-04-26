import React, { useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { LineChart } from "react-native-chart-kit";

interface WeighIn {
  id: string;
  value: string;
  date: string;
}

export default function HomeScreen() {
  const [weight, setWeight] = useState<string>('');
  const [history, setHistory] = useState<WeighIn[]>([
    // Adding some fake data so the graph shows up immediately!
    { id: '1', value: '205', date: '4/20' },
    { id: '2', value: '203', date: '4/22' },
    { id: '3', value: '200', date: '4/25' },
  ]);

  const saveWeight = () => {
    if (weight) {
      const newEntry: WeighIn = { 
        id: Date.now().toString(), 
        value: weight, 
        date: new Date().toLocaleDateString(undefined, {month: 'numeric', day: 'numeric'}) 
      };
      setHistory([...history, newEntry]); // Adds new weight to the end for the graph
      setWeight('');
    }
  };

  // This prepares the data for the Chart
  const chartData = {
    labels: history.slice(-5).map(i => i.date), // Only show last 5 dates
    datasets: [{ data: history.slice(-5).map(i => parseFloat(i.value)) }]
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ethan's Progress</Text>
      
      {history.length > 1 && (
        <LineChart
          data={chartData}
          width={Dimensions.get("window").width - 40}
          height={220}
          chartConfig={{
            backgroundColor: "#121212",
            backgroundGradientFrom: "#1e1e1e",
            backgroundGradientTo: "#1e1e1e",
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          bezier
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
      )}

      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input}
          placeholder="Enter weight (lbs)"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.button} onPress={saveWeight}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={[...history].reverse()} // Shows newest on top
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={styles.historyText}>{item.date}: {item.value} lbs</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', paddingTop: 60, paddingHorizontal: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 10, textAlign: 'center' },
  inputContainer: { flexDirection: 'row', marginVertical: 20 },
  input: { flex: 1, backgroundColor: '#2c2c2e', borderRadius: 12, padding: 15, fontSize: 18, color: '#fff' },
  button: { backgroundColor: '#007AFF', marginLeft: 10, paddingHorizontal: 20, borderRadius: 12, justifyContent: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  historyItem: { backgroundColor: '#1c1c1e', padding: 15, borderRadius: 12, marginBottom: 10 },
  historyText: { color: '#fff', fontSize: 16 },
});