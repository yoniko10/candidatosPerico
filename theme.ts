import { extendTheme, theme} from "@chakra-ui/react"
export default extendTheme({
    colors: {
        primary: theme.colors["blue"],
        secondary: theme.colors["cyan"],
    },
    styles:{
        global:{
            body:{
                backgroundColor: "primary.900",
                social: "secondary.900"
            }
        }
    }
});