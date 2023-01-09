import {createTheme} from "@mui/material";



export const theme = createTheme({
    breakpoints: {

        values: {
            mobile: 0,
            tablet: 856,
            desktop: 1039,
            fullsize: 1536
        },
    },
    typography: {
        fontFamily: "Comic Sans MS"
    }
});

