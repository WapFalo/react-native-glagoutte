import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [sampleGoals, setGoal] = useState([
    "Faire les courses",
    "Aller à la salle de sport 3 fois par semaine",
    "Monter à plus de 5000m d'altitude",
    "Acheter mon premier appartement",
    "Perdre 5kgs",
    "Gagner en productivité",
    "Faire une mission en freelance",
    "Organiser un meetup autour de la tech",
    "Faire un triathlon",
  ]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleGoal=() =>{
    if (inputValue.trim() !== '') {
      setGoal(prevGoals => [...prevGoals, inputValue]);
      setInputValue('');
    }
  }

  const DeleteConfirmationModal = ({isVisible, handleDeleteGoal, onCancel}) => {
    return (
      <Modal visible={isVisible} transparent={true} animationType='fade' onRequestClose={onCancel}>
        <View style={styles.container}>
          <View style={styles.modal}>
            <Text style={styles.title}>Confirmer la suppression</Text>
            <Text style={styles.message}>Êtes vous sûr de vouloir supprimer cet objectif ?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleDeleteGoal} style={[styles.button, styles.deleteButton]}>
                <Text style={styles.buttonText}>Supprimer</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onCancel} style={[styles.button, styles.cancelButton]}>
                <Text style={styles.buttonText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  const handleDeleteGoal=(index) =>{
    setGoal(prevGoals => {
      const updatedGoals = [...prevGoals];
      updatedGoals.splice(index, 1);
      return updatedGoals;
    });
  }

  const Item = ({title}) => (
    <View style={styles.item}>
      {console.log("title:", title)}
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={() => DeleteConfirmationModal()}>
        <FontAwesome name='times-circle' size={20} color='red'/>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.list}>Ma liste d'objectifs:</Text>
          {sampleGoals.map((goals) => (
            <Text style={styles.item}>-{goals}</Text>
          ))} */}
      {/* <FlatList
      data={sampleGoals}
      renderItem={({goal, index}) => { return (
          <View style={styles.row}>
            <Text style={styles.item}>{goal}</Text>
            <TouchableOpacity onPress={() => handleDeleteGoal(index)}>
              <FontAwesome name='times-circle' size={20} color='red'/>
            </TouchableOpacity>
          </View>
  )}}
      keyExtractor={(goal, index) => index.toString()}
      /> */}
      <Text style={styles.bold}>Ma liste d'objectifs: </Text>
      <SafeAreaView style={styles.list}>
      <FlatList
        data={sampleGoals}
        renderItem={({item}) => <Item title={item} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
      <TextInput style={styles.textInput} value={inputValue} onChangeText={setInputValue} placeholder="Entrez votre objectif"/>
      <Button onPress={handleGoal} 
        title="Ajouter un objectif"/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  title: {
    color: '#f00',
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#FF0000',
  },
  cancelButton: {
    backgroundColor: '#CCCCCC',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  list: {
    fontWeight: 'bold',
    flexDirection: 'row',
    marginBottom: 10
  },
  item: {
    flex: 1,
    padding: 2,
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  textInput: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    justifyContent: 'center',
    marginBottom: 10,
  }
});
