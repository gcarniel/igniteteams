import AsyncStorage from '@react-native-async-storage/async-storage'
import { PLAYER_COLLECTION } from '@storage/storage-config'
import { PlayerStorageDTO } from 'src/interfaces/player-storage-dto'
import { getPlayersByGroup } from './get-players-by-group'
import { AppError } from '@utils/app-error'

export async function addPlayerByGroup(
  newPlayer: PlayerStorageDTO,
  group: string,
) {
  const players = await getPlayersByGroup(group)

  const playerAlreadyExists = players.some(
    (player) => player.name === newPlayer.name,
  )

  if (playerAlreadyExists) {
    throw new AppError('Já existe um jogador cadastrado com esse nome.')
  }

  await AsyncStorage.setItem(
    `${PLAYER_COLLECTION}-${group}`,
    JSON.stringify([...players, newPlayer]),
  )
}
