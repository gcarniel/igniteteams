import AsyncStorage from '@react-native-async-storage/async-storage'
import { getPlayersByGroup } from './get-players-by-group'
import { PLAYER_COLLECTION } from '@storage/storage-config'

export async function removePlayerByGroup(player: string, group: string) {
  const players = await getPlayersByGroup(group)

  const newPlayers = players.filter((p) => p.name !== player)

  await AsyncStorage.setItem(
    `${PLAYER_COLLECTION}-${group}`,
    JSON.stringify(newPlayers),
  )
}
