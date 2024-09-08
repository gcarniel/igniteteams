import { getPlayersByGroup } from './get-players-by-group'

export async function getPlayersByGroupAndTeam(group: string, team: string) {
  const players = await getPlayersByGroup(group)

  return players.filter((player) => player.team === team)
}
