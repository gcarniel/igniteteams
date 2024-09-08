import { Header } from '@components/header'
import { Highlight } from '@components/highlight'
import { Container, Content, Icon } from './styles'
import { Button } from '@components/button'
import { Input } from '@components/input'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { createGroup } from '@storage/group/create-group'
import { AppError } from '@utils/app-error'
import { Alert } from 'react-native'

export function NewGroup() {
  const [group, setGroup] = useState('')
  const navigation = useNavigation()

  const handleNewGroup = async () => {
    try {
      await createGroup(group)
      navigation.navigate('players', { group })
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Turma já existe', error.message)
      } else {
        Alert.alert('Não foi possível criar a turma')
        console.error(error)
      }
    }
  }
  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title="Turmas"
          subtitle="Cria uma turma para adicionar as pessoas"
        />

        <Input
          placeholder="Nome da turma"
          value={group}
          onChangeText={setGroup}
        />

        <Button
          title="Criar nova turma"
          style={{ marginTop: 20 }}
          onPress={handleNewGroup}
          disabled={group.trim().length === 0}
        />
      </Content>
    </Container>
  )
}
