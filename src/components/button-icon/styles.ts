import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'
import { ButtonIconVariant } from './button-icon'

interface ButtonProps {
  variant: ButtonIconVariant
}

export const Container = styled(TouchableOpacity)<ButtonProps>`
  height: 56px;
  width: 56px;

  justify-content: center;
  align-items: center;

  margin-left: 12px;

  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`

export const Icon = styled(MaterialIcons).attrs<ButtonProps>(
  ({ theme, variant }) => ({
    size: 24,
    color:
      variant === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK,
  }),
)``
