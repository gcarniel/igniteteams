/* eslint-disable camelcase */
import { ThemeProvider } from 'styled-components'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import theme from '@theme/index'
import { Loading } from '@components/loading'
import { StatusBar } from 'react-native'
import { Routes } from 'src/routes'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="default" translucent />
      {fontsLoaded ? <Routes /> : <Loading />}
    </ThemeProvider>
  )
}
