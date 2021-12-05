import * as React from "react";
import { useHistory } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { ThemeProvider, Typography } from "@mui/material";
import { theme } from "../../theme";
import AuthService from "../../services/auth.service";

export default function SignIn() {
  const [fail, setFail] = React.useState(false);

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    AuthService.login(data.get("username"), data.get("password"))
      .then((res) => {
        if (res.status === 200) {
          history.push("/dashboard");
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        setFail(true);
      });
  };

  

  const toHome = () => {
    const path = "/";
    history.push(path);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "95vh" }}
      >
        <Grid item xs={3}>
          <Box>
            <Container maxWidth="sm">
              {fail ? (
                <Alert severity="error">
                  Đăng nhập thất bại, hãy kiểm tra lại thông tin!
                </Alert>
              ) : null}
              <form onSubmit={handleSubmit}>
                <Box sx={{ my: 3 }}>
                  <Typography color="textPrimary" variant="h4">
                    Đăng nhập
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
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
                  <Button
                    color="secondary"
                    fullWidth
                    size="large"
                    onClick={toHome}
                    variant="contained"
                    sx={{marginTop: '5px'}}
                  >
                    Quay về trang chủ
                  </Button>
                </Box>
              </form>
            </Container>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
