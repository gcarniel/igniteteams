import { useNavigation } from '@react-navigation/native'
import { BackButton, BackIcon, Container, Logo } from './styles'

import logo from '@assets/logo.png'

interface HeaderProps {
  showBackButton?: boolean
}

export function Header({ showBackButton = false }: HeaderProps) {
  const navigation = useNavigation()
  const handleBack = () => {
    navigation.navigate('groups')
  }

  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={handleBack}>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={logo} />
    </Container>
  )
}
