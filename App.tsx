/* eslint-disable camelcase */
import { Groups } from '@screens/groups'
import { ThemeProvider } from 'styled-components'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import theme from '@theme/index'
import { Loading } from '@components/loading'
import { StatusBar } from 'react-native'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="default" translucent />
      {fontsLoaded ? <Groups /> : <Loading />}
    </ThemeProvider>
  )
}
