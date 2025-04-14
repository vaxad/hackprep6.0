import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, SafeAreaView } from 'react-native';
import { fetchAPI } from '../../lib/fetch-api';
import useExpenseContext from '../providers';

export default function ExpenseTable() {
  const { expenses, setExpenses } = useExpenseContext();
  
  const deleteExpense = async (expense) => {
    const response = await fetchAPI({
      url: `/expenses/${expense._id}`,
      method: 'DELETE',
    });

    if (!response) {
      Alert.alert('Error', 'Failed to delete expense');
      return;
    }

    setExpenses((prevExpenses) => prevExpenses.filter((e) => e._id !== expense._id));
  };

  const totalAmount = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.title}</Text>
      <Text style={styles.cell}>${item.amount}</Text>
      <TouchableOpacity onPress={() => deleteExpense(item)}>
        <Text style={[styles.cell, styles.deleteButton]}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.row, styles.header]}>
        <Text style={styles.cell}>Name</Text>
        <Text style={styles.cell}>Amount</Text>
        <Text style={styles.cell}>Action</Text>
      </View>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />

      <View style={styles.totalRow}>
        <Text style={styles.totalText}>Total: ${totalAmount.toFixed(2)}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
  },
  cell: {
    flex: 1,
    textAlign: 'left',
  },
  deleteButton: {
    color: 'red',
  },
  totalRow: {
    marginTop: 16,
    alignItems: 'flex-end',
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
