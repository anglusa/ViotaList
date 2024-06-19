import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { styles } from './style';
import TaskList from '../../components/ItemList';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const [textInput, setTextInput] = useState('');
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    getTasksFromDevice();
  }, [])
  useEffect(() => {
    saveTaskToDevice();
  }, [tasks])


  const saveTaskToDevice = async () => {
    try {
      const taskJson = JSON.stringify(tasks);
      await AsyncStorage.setItem('ViotaList', taskJson);
    } catch (error) {
      console.log(`Erro: ${error}`);
    }
  }

  const getTasksFromDevice = async () => {
    try {
      const tasksX = await AsyncStorage.getItem('ViotaList');
      if (tasksX != null) {
        setTasks(JSON.parse(tasksX));
      }
    } catch (error) {
      console.log(`Erro: ${error}`);
    }
  }

  const addTask = () => {
    //console.log(textInput);
    if (textInput == '') {
      Alert.alert(
        'Ocorreu um problema :(',
        'Por favor, informe o nome da tarefa');
    } else {
      const newTask = {
        id: Math.random(),
        name: textInput,
        done: false
      };
      setTasks([...tasks, newTask]);
      setTextInput('');
    }
  }

  const markTaskDone = taskId => {
    const newTasks = tasks.map((task) => {
      if (task.id == taskId) {
        return { ...task, done: true }
      }
      return task;
    });
    setTasks(newTasks);
  }

  const unmarkTaskDone = taskId => {
    const newTasks = tasks.map((task) => {
      if (task.id == taskId) {
        return { ...task, done: false }
      }
      return task;
    });
    setTasks(newTasks);
  }

  const removeTask = taskId => {
    Alert.alert('Excluir tarefa?',
      'Confirma a exclusão desta tarefa?',
      [
        {
          text: 'Sim', onPress: () => {
            const newTasks = tasks.filter(task => task.id != taskId);
            setTasks(newTasks);
          }
        },
        {
          text: 'Cancelar', style: 'cancel'
        }
      ]
    )
  }

  const removeAll = () => {
    Alert.alert(
      "Limpar Lista?",
      "Confirma a exclusão de todas as tarefas de sua lista?",
      [{
        text: 'Sim',
        onPress: () => { setTasks([]) }
      }, {
        text: 'Cancelar',
        style: 'cancel',
      }]
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/background.jpg')}
        resizeMode='cover'
        style={{ flex: 1, justifyContent: 'flex-start' }}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Lista de Tarefas</Text>
          <View>
            <Ionicons name="trash" size={32} color="#fff" onPress={removeAll} />
          </View>
        </View>

        {/* Lista de Tarefas */}
        <FlatList
          contentContainerStyle={{ padding: 20, paddingBottom: 100, color: '#fff' }}
          data={tasks}
          renderItem={({ task }) =>
            <TaskList
              task={task}
              markTask={markTaskDone}
              unmarkTask={unmarkTaskDone}
              removeTask={removeTask}
            />
          }
        />

        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput
              color="#fff"
              fontSize={18}
              placeholderTextColor="#aeaeae"
              placeholder="Digite o nome da tarefa..."
              value={textInput}
              onChangeText={(text) => setTextInput(text)}
            />
          </View>
          <TouchableOpacity style={styles.iconContainer} onPress={addTask}>
            <Ionicons name="add" size={36} color="#fff" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}