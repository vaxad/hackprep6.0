import React from 'react';
import { View, StyleSheet } from 'react-native';
import ExpenseTracker from './components/expense-tracker';

export default function App() {
  return (
    <View style={styles.container}>
      <ExpenseTracker />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                  
    justifyContent: 'center', 
    alignItems: 'center',     
    width: '100%',            
    paddingTop: 50,
    backgroundColor: '#fff',  
    paddingHorizontal: 16,    
  },
});
