import { useState } from 'react'

import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { myStyles } from "./styles";

interface ISkillData {
  id: string;
  name: string;
  professor: string;
}

export function Dashboard() {
  const [newSkill, setNewSkill] = useState('')
  const [mySkills, setMySkills] = useState<ISkillData[]>([])
  const [newDisciplina, setDisciplina] = useState('')
  const [myDisciplina, setMyDisciplina] = useState<ISkillData[]>([])

  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill,
      professor: newDisciplina
    }
    setMySkills([...mySkills, data])
    setNewSkill('')
    setMyDisciplina([...myDisciplina, data])
    setDisciplina('')

    if ( newSkill == '' || newDisciplina == '') {
      alert ("preencher todos os campos")
    } else {
      setMyDisciplina([...myDisciplina, data])
      setDisciplina('')
      setMySkills([...mySkills, data])
      setNewSkill('')
    }
  }

  function handleRemoveSkill(id: string) {
    setMySkills(mySkills => mySkills.filter(skill =>
      skill.id !== id))
    setMyDisciplina(myDisciplina => myDisciplina.filter(skill =>
      skill.id !== id))
     
  }

  return (
    
    <View style={myStyles.container}>
      <Text style={myStyles.title}>Cadastro de disciplina </Text>

      <TextInput
        style={myStyles.input}
        value={newSkill}
        placeholder='NOME DA DSCIPLINA:'
        placeholderTextColor='#FFF'
        onChangeText={value => setNewSkill(value)}
      />

      <TextInput
        style={myStyles.input}
        value={newDisciplina}
        placeholder='NOME DO PROFESSOR:'
        placeholderTextColor='#FFF'
        onChangeText={value => setDisciplina(value)}
      />
      
      <TouchableOpacity
        style={myStyles.button}
        activeOpacity={0.7}
        onPress={handleAddNewSkill}
      >
        <Text style={myStyles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
      <Text style={[myStyles.title, { marginVertical: 10 }]}>
        cadastro de aulas 
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {
          mySkills.map(skill => (
            <TouchableOpacity
              key={skill.id}
              style={myStyles.button}
              onPress={() => handleRemoveSkill(skill.id)}
            >
              <Text
                style={myStyles.buttonText}
              > DISCIPLINA 
                {skill.name}
              </Text>
            </TouchableOpacity>
          ))
        }
        {
          myDisciplina.map(skill => (
            <TouchableOpacity
              key={skill.id}
              style={myStyles.button}
              onPress={() => handleRemoveSkill(skill.id)}
            >
              <Text
                style={myStyles.buttonText}
              > PROFESSOR : 
                {skill.professor}
              </Text>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </View>
  )
}