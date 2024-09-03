import { StyleSheet, Text, View } from 'react-native'
import { Container } from './styles'

export function Groups() {
  return (
    <>
      <View style={styles.container}>
        <Text>teste</Text>
      </View>

      <Container>
        <Text>teste</Text>
      </Container>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#098602',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
})
