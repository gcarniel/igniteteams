import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '@storage/storage-config'
import { getAllGroups } from './get-all-groups'
import { AppError } from '@utils/app-error'

export async function createGroup(newGroup: string) {
  const storedGroups = await getAllGroups()

  const groupAlreadyExists = storedGroups.includes(newGroup.trim())

  if (groupAlreadyExists) {
    throw new AppError('Já existe uma turma cadastrada com esse nome.')
  }

  const storage = JSON.stringify([...storedGroups, newGroup])
  await AsyncStorage.setItem(GROUP_COLLECTION, storage)
}
