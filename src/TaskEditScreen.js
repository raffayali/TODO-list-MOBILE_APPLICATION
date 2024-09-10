import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';


const API_URL = 'http://your-ip:3000/tasks';

const TaskEditScreen = ({ route, navigation }) => {
  const { task } = route.params;
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [category, setCategory] = useState(task.category);
  const [dueDate, setDueDate] = useState(task.due_date);
  const [reminder, setReminder] = useState(task.reminder);

  const handleUpdate = async () => {
    try {
      await axios.put(API_URL, {
        id: task.id,
        title,
        description,
        category,
        due_date: dueDate,
        reminder,
      });
      navigation.goBack();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(API_URL, { data: { id: task.id } });
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <Text>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
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
      <Button title="Update Task" onPress={handleUpdate} />
      <Button title="Delete Task" onPress={handleDelete} color="red" />
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

export default TaskEditScreen;
