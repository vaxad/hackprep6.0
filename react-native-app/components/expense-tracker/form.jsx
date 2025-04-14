import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { fetchAPI } from '../../lib/fetch-api';
import useExpenseContext from '../providers';

const EMPTY_EXPENSE = {
  title: '',
  amount: ''
};

export default function ExpenseForm() {
  const { setExpenses } = useExpenseContext()
  const [formData, setFormData] = useState(EMPTY_EXPENSE);

  const onChangeField = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  const onSubmitForm = async () => {
    const { title, amount } = formData;
    console.log({ title, amount });
    if (!title || !amount) {
      Alert.alert('Validation Error', 'Please enter valid expense details.');
      return;
    }

    const expense = {
      title,
      amount: parseFloat(amount)
    };

    const response = await fetchAPI({
      url: '/expenses',
      method: 'POST',
      body: expense
    });

    console.log({response})

    if (!response) {
      Alert.alert('Error', 'Failed to add expense');
      return;
    }

    setExpenses((prevExpenses) => [...prevExpenses, response]);
    setFormData(EMPTY_EXPENSE);
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Expense Name"
        value={formData.title}
        onChangeText={(value) => onChangeField('title', value)}
        placeholderTextColor="#ccc"
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={formData.amount}
        onChangeText={(value) => onChangeField('amount', value)}
        placeholderTextColor="#ccc"
      />
      <TouchableOpacity style={styles.button} onPress={onSubmitForm}>
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flexDirection: 'column',
    marginVertical: 10,
    gap: 10,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1c1c1c',
    borderRadius: 8,
    width: '100%',
    color: 'white',
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#4ade80',
    borderRadius: 8,
    width: "100%",
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#000',
  },
});
