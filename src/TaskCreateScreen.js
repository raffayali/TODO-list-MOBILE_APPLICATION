import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const API_URL = 'http://your-ip:3000/tasks';

const TaskCreateScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Work');
  const [dueDate, setDueDate] = useState('');
  const [reminder, setReminder] = useState('');

  const handleSubmit = async () => {
    if (!title || !description || !dueDate || !reminder) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return;
    }

    try {
      await axios.post(API_URL, {
        title,
        description,
        category,
        due_date: dueDate,
        reminder,
      });
      Alert.alert('Success', 'Task created successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error creating task:', error);
      Alert.alert('Error', 'Failed to create task');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter task title"
      />
      <Text>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter task description"
      />
      <Text>Category:</Text>
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Work" value="Work" />
        <Picker.Item label="Personal" value="Personal" />
        <Picker.Item label="Others" value="Others" />
      </Picker>
      <Text>Due Date:</Text>
      <TextInput
        style={styles.input}
        value={dueDate}
        onChangeText={setDueDate}
        placeholder="YYYY-MM-DD"
      />
      <Text>Reminder:</Text>
      <TextInput
        style={styles.input}
        value={reminder}
        onChangeText={setReminder}
        placeholder="HH:MM"
      />
      <Button title="Save Task" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 5,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default TaskCreateScreen;
