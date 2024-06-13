import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from "./style";

export default function TaskList({ task, markTask, unmarkTask, removeTask }) {
  return (
    <View style={styles.taskList}>
      <View style={{ flex : 1 }}>
        <Text style={task?.done ? styles.taskDone : styles.taskToDo}>
          {task?.name}
        </Text>
      </View>
      {!task?.done ? (
        <TouchableOpacity
          style={styles.actionIcon}
          onPress={() => markTask(task)}
        >
          <Ionicons name='bag-check-outline' size={24} color='#fff' />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.actionIcon}
          onPress={() => unmarkTask(task)}
        >
          <Ionicons name='bag-remove-outline' size={24} color='#fff' />
        </TouchableOpacity>
      ) }

      <TouchableOpacity
          style={[styles.actionIcon, { backgroundColor: "darkred"}]}
          onPress={() => removeTask(task)}
        >
          <Ionicons name='trash-bin-outline' size={24} color='#fff' />
        </TouchableOpacity>
    </View>
  )
}