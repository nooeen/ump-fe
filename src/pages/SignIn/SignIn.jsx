import * as React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider, Typography } from "@mui/material";
import { theme } from "../../theme"

export default function SignIn() {
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios
      .post(`http://localhost:3001/api/login`, {
        username: data.get("username"),
        password: data.get("password"),
      })
      .then((res) => {
        if (res.status === 200) {
          history.push("/dashboard");
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.log("Đăng nhập thất bại!");
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Đăng nhập
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Đăng nhập vào UET Management Platform
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="Tên đăng nhập"
              margin="normal"
              name="username"
              id="username"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Mật khẩu"
              margin="normal"
              name="password"
              type="password"
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Đăng nhập
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
