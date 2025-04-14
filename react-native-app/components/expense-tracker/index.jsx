import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { fetchAPI } from '../../lib/fetch-api';
import ExpenseTable from './expense-table';
import ExpenseForm from './form';
import { ExpenseProvider } from '../providers';

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);

  async function getExpenses() {
    const expenses = await fetchAPI({ url: '/expenses' });
    setExpenses(expenses || []);
  }

  useEffect(() => {
    void getExpenses();
  }, []);

  return (
    <ExpenseProvider value={{expenses, setExpenses}}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Expense Tracker</Text>
        <ExpenseForm/>
        <ExpenseTable />
      </ScrollView>
    </ExpenseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    minWidth: '100%',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
