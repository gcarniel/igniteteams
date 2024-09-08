import { TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components/native'
import { ButtonProps } from './button'

export const Container = styled(TouchableOpacity)<ButtonProps>`
  flex: 1;

  min-height: 56px;
  max-height: 56px;

  border-radius: 6px;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme, variant }) =>
    variant === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};

  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.WHITE};
  `}
`
