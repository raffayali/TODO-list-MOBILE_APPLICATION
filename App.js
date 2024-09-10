import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskListScreen from './src/TaskListScreen';
import TaskCreateScreen from './src/TaskCreateScreen';
import TaskEditScreen from './src/TaskEditScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#f4511e' }, 
          headerTintColor: '#fff', 
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="TaskList"
          component={TaskListScreen}
          options={{ title: 'Task List' }} 
        />
        <Stack.Screen
          name="TaskCreate"
          component={TaskCreateScreen}
          options={{ title: 'Create Task' }} 
        />
        <Stack.Screen
          name="TaskEdit"
          component={TaskEditScreen}
          options={{ title: 'Edit Task' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
