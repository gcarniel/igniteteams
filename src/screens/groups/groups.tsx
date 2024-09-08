import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Header } from '@components/header'
import { Container } from './styles'
import { Highlight } from '@components/highlight'
import { useCallback, useState } from 'react'
import { FlatList } from 'react-native'
import { GroupCard } from '@components/group-card'
import { EmptyList } from '@components/empty-list'
import { Button } from '@components/button'
import { getAllGroups } from '@storage/group/get-all-groups'

export function Groups() {
  const [groups, setGroups] = useState([])

  const navigation = useNavigation()

  const handleNewGroup = () => {
    navigation.navigate('new-group')
  }

  const handleOpenGroup = (group: string) => {
    navigation.navigate('players', { group })
  }

  const fetchGroups = async () => {
    try {
      const data = await getAllGroups()
      setGroups(data)
    } catch (error) {
      console.error(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups()
    }, []),
  )

  return (
    <Container>
      <Header />

      <Highlight title="Turmas" subtitle="Jogue com sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={
          <EmptyList message="Nenhuma turma encontrada, bora criar uma?" />
        }
      />

      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  )
}
