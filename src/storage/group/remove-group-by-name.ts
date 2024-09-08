import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION, PLAYER_COLLECTION } from '@storage/storage-config'
import { getAllGroups } from './get-all-groups'

export async function removeGroupByName(group: string) {
  const storedGroups = await getAllGroups()

  const newGroups = storedGroups.filter((g: string) => g !== group)

  await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(newGroups))

  await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${group}`)
}
