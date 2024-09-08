import { Alert, FlatList, TextInput } from 'react-native'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Container, Form, HeaderList, NumberOfPlayers } from './styles'

import { Header } from '@components/header'
import { Highlight } from '@components/highlight'
import { ButtonIcon } from '@components/button-icon'
import { Input } from '@components/input'
import { Filters } from '@components/flters'
import { PlayerCard } from '@components/player-card'
import { EmptyList } from '@components/empty-list'
import { Button } from '@components/button'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AppError } from '@utils/app-error'
import { addPlayerByGroup } from '@storage/players/add-player'
import { getPlayersByGroupAndTeam } from '@storage/players/get-players-by-group-and-team'
import { PlayerStorageDTO } from 'src/interfaces/player-storage-dto'
import { removePlayerByGroup } from '@storage/players/remove-player-by-group'
import { removeGroupByName } from '@storage/group/remove-group-by-name'
import { Loading } from '@components/loading'

type Params = {
  group: string
}

export function Players() {
  const route = useRoute()
  const navigation = useNavigation()

  const { group } = route.params as Params

  const [isLoading, setIsLoading] = useState(true)
  const [activeTeam, setActiveTeam] = useState('Time 1')
  const [playerName, setPlayerName] = useState('')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const inputRef = useRef<TextInput>(null)

  const handleAddPlayer = async () => {
    try {
      await addPlayerByGroup({ name: playerName, team: activeTeam }, group)

      inputRef.current?.blur()

      setPlayerName('')
      await fetchPlayersByTeam()
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Jogador já existe', error.message)
      } else {
        Alert.alert('Não foi possível adicionar jogador')
        console.error(error)
      }
    }
  }

  const fetchPlayersByTeam = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await getPlayersByGroupAndTeam(group, activeTeam)
      setPlayers(data)
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Erro ao buscar jogadores', error.message)
      } else {
        Alert.alert('Erro aqui')
        console.error(error)
      }
    } finally {
      setIsLoading(false)
    }
  }, [group, activeTeam])

  const handleRemovePlayer = async (player: string) => {
    try {
      await removePlayerByGroup(player, group)
      await fetchPlayersByTeam()
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Erro ao remover o jogador', error.message)
      } else {
        Alert.alert('Erro aqui')
        console.error(error)
      }
    }
  }

  const handleRemoveGroup = () => {
    Alert.alert('Remover turma', 'Tem certeza que deseja remover essa turma?', [
      { text: 'Não', style: 'cancel' },
      {
        text: 'Sim',
        onPress: async () => removeGroup(),
      },
    ])
  }

  const removeGroup = async () => {
    try {
      await removeGroupByName(group)
      navigation.navigate('groups')
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Erro ao remover a turma', error.message)
      } else {
        Alert.alert('Erro aqui')
        console.error(error)
      }
    }
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [activeTeam, fetchPlayersByTeam])

  return (
    <Container>
      <Header showBackButton />
      <Highlight title={group} subtitle="Adicione a galera e separe os times" />

      <Form>
        <Input
          inputRef={inputRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          value={playerName}
          onChangeText={setPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />

        <ButtonIcon
          icon="add"
          onPress={handleAddPlayer}
          disabled={!playerName}
        />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time 1', 'Time 2']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filters
              title={item}
              isActive={item === activeTeam}
              onPress={() => setActiveTeam(item)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handleRemovePlayer(item.name)}
            />
          )}
          ListEmptyComponent={() => (
            <EmptyList message="Não há pessoas nesse time" />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 },
          ]}
        />
      )}

      <Button
        title="Remover Turma"
        variant="SECONDARY"
        onPress={handleRemoveGroup}
      />
    </Container>
  )
}
