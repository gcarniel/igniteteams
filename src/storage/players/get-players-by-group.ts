import AsyncStorage from '@react-native-async-storage/async-storage'
import { PLAYER_COLLECTION } from '@storage/storage-config'
import { PlayerStorageDTO } from 'src/interfaces/player-storage-dto'

export async function getPlayersByGroup(group: string) {
  const data = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`)

  const players: PlayerStorageDTO[] = data ? JSON.parse(data) : []

  return players
}
