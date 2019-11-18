import { ViewStyle, TextStyle, ImageStyle} from "react-native"
import { color, spacing } from "../../theme"

const FULL: ViewStyle = { flex: 1, backgroundColor: "#291c3a" }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: "Montserrat",
}
const BOLD: TextStyle = { fontWeight: "bold" }
const KEYBOARD_AVOID: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
  marginHorizontal: spacing[4]
}
const AUTHLOGO: ImageStyle = {
  alignSelf: "center",
  marginVertical: spacing[5],
  maxWidth: "100%",
  aspectRatio: 12,
}
const AUTH: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#A3498B",
}
const AUTH_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const AUTHOR: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#291c3a",
}
const AUTHOR_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 10,
  letterSpacing: 2,
}
const FOOTER_CONTENT: ViewStyle = {
  backgroundColor: "#291c3a",
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}
const INPUT_TEXT: TextStyle = {
  ...TEXT,
  color: color.palette.black,
}
const LOVE_WRAPPER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "center",
}
const LOVE: TextStyle = {
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
}
const HEART: ImageStyle = {
  marginHorizontal: spacing[2],
  width: 10,
  height: 10,
  resizeMode: "contain",
}
export default {
    INPUT_TEXT,
    FOOTER_CONTENT,
    AUTHOR_TEXT,
    AUTHOR,
    AUTHLOGO,
    AUTH,
    AUTH_TEXT,
    KEYBOARD_AVOID,
    BOLD,
    TEXT,
    FULL,
    CONTAINER,
    color,
    spacing,
    LOVE_WRAPPER,
    LOVE,
    HEART
}