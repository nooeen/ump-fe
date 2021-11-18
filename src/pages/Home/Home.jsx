import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../theme";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            UMP Management Platform
          </Typography>
          <Button href="/login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Đăng nhập
          </Button>
        </Toolbar>
      </AppBar>
      
    </ThemeProvider>
  );
}
