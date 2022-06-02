import * as React from "react";
import "./Home.css";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import { Grid, ThemeProvider, Box } from "@mui/material";
import { theme } from "../../theme";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          ul: {
            margin: 0,
            padding: 0,
            listStyle: "none",
            backgroundColor: "white",
          },
        }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        className="homepage-header"
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h5" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            UET Management Platform
          </Typography>
          <Button href="/dashboard" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Đăng nhập
          </Button>
        </Toolbar>
      </AppBar>
      <Box>
        <Grid
          container
          spacing="2"
          alignItems="center"
          className="homepage-grid"
        >
          <Grid item xs={4}>
            <h1>Nền tảng cố vấn học tập</h1>
            <p>
              UET Management Platform là một nền tảng giúp cố vấn học tập quản
              lý sinh viên thuộc phạm vi quản lý của mình. Với việc xây dựng
              trên nền tảng công nghệ hiện đại, UMP mang lại cho các cố vấn học
              tập sự tiện lợi trong việc quản lý quá trình học tập của sinh
              viên.
              <p>
                <b>Demo Teacher Account:</b> neeoon - 07032001
              </p>
              <p>
                <b>Demo Student Account:</b> 19021341 - 07032001
              </p>
            </p>
            <Button
              href="/dashboard"
              variant="outlined"
              sx={{ marginTop: "7px" }}
            >
              Vào trang quản lý
            </Button>
          </Grid>
          <Grid item xs={8}>
            <img src="./image.png" alt="" className="homepage-img"></img>
          </Grid>
        </Grid>
      </Box>
      <Typography
        variant="body2"
        color="inherit"
        noWrap
        align="center"
        sx={{ flexGrow: 1 }}
      >
        Copyright 2021 UET Management Platform™
      </Typography>
    </ThemeProvider>
  );
}
