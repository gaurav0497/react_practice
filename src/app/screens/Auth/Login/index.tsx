import React, { useState } from 'react';
import { Container } from '@mui/material';
import GlassCard from '../../../common/GlassCord';
import { Stack } from '@mui/material';
import { Typography, TextField, Link } from '@mui/material';
import { Box } from '@mui/material';
import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import BgImage from '../../../../assets/background.png';
import constants from '../../../../constants';
import { useDispatch } from 'react-redux';
const RoundedTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    borderColor: "grey.300",
  },
});
// eslint-disable-next-line
const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
const Login: React.FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState({ value: "", error: false, msg: "" });
  const [password, setPassword] = useState({
    value: "",
    error: false,
    msg: "",
  });

  const [loading, setLoading] = useState(false);
  const onSubmit = (e: any) => {
    e.preventDefault();
    if (email.value === "") {
      setEmail({
        ...email,
        error: true,
        msg: "Email is required!",
      });
    }
    if (password.value === "") {
      setPassword({
        ...password,
        error: true,
        msg: "Password is required!",
      });
    }
    if (
      email.error ||
      password.error ||
      password.value === "" ||
      email.value === ""
    ) {
      return false;
    }

    setLoading(true);
    dispatch({
      type: constants("auth").sagas.login,
      payload: {
        data: {
          email: email.value, // unique
          password: password.value,
          login_type: "email",
        },
        showLoading: (bool: boolean) => setLoading(bool),
        // showMsg: (msg: string) => toast.warn(msg),
        // navToScreen: navToDashboard,
      },
    });
  };

  const onForgotPassword = (e: any) => {
    e.preventDefault();
    console.log("Forgot password");
  };

  return (
    <>
      <Box
        sx={{
          p: { xs: 1, sm: 2, md: 4, lg: 6, xl: 8 },
          height: "100vh",
          width: "100vw",
          background: `url(${BgImage})`,
          backgroundSize: "100vw 100vh",
        }}
      >
        <Container sx={{ height: "100%", p: { xs: 1, sm: 4, md: 6 } }}>
          <GlassCard
            elevation={24}
            sx={{
              p: { xs: 3, sm: 4, md: 6 },
              borderRadius: 12,
              width: { xs: "100%", sm: 300, md: 450, lg: 500 },
              margin: "auto",
            }}
          >
            <Stack component="form" spacing={{ xs: 2, md: 4 }} onSubmit={onSubmit}>
              <Typography
                variant="h4"
                sx={{ mb: 2, fontWeight: "bold", opacity: 0.66 }}
              >
                Login ..
              </Typography>
              <RoundedTextField
                value={email.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  let text = e.target.value.trim();
                  let obj = { ...email };
                  if (emailRegx.test(text) === true) {
                    obj = { value: text, error: false, msg: "" };
                  } else if (text.length === 0) {
                    obj = { value: text, error: true, msg: "" };
                  } else {
                    obj = {
                      value: text,
                      error: true,
                      msg: "Please enter valid email",
                    };
                  }
                  setEmail(obj);
                }}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="email"
                required
                helperText={email.msg}
                error={email.error}
              />
              <RoundedTextField
                value={password.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  let obj;
                  if (e.target.value.trim().length < 5 && e.target.value.length) {
                    obj = {
                      value: e.target.value.trim(),
                      error: true,
                      msg: "Password is not valid",
                    };
                  } else if (e.target.value.trim().length === 0) {
                    obj = {
                      value: e.target.value.trim().length,
                      error: true,
                      msg: "",
                    };
                  } else {
                    obj = {
                      value: e.target.value.trim(),
                      error: false,
                      msg: "",
                    };
                  }
                  setPassword(obj);
                }}
                id="outlined-basic2"
                label="Password"
                variant="outlined"
                type="password"
                sx={{ borderRadius: 16 }}
                required
                helperText={password.msg}
                error={password.error}
              />
              <Stack direction="row">
                <Box sx={{ flexGrow: 1 }} />
                <Link
                  component="button"
                  onClick={onForgotPassword}
                  href="#"
                  variant="body2"
                  underline="hover"
                  textAlign="right"
                  sx={{ width: "fit-content", ml: "auto" }}
                >
                  Forgot password?
                </Link>
              </Stack>
              <LoadingButton
                loading={loading}
                disabled={loading}
                type="submit"
                sx={{
                  py: { xs: 1, md: 1.5 },
                  borderRadius: 6,
                  color: "white",
                  background:
                    "linear-gradient(281.22deg, #233459 -53.72%, #1C81CA 163.52%)",
                }}
                variant="contained"
              >
                Login
              </LoadingButton>
            </Stack>
            <div style={{ textAlign: "center", marginTop: "1rem" }}>Or</div>
            <Stack sx={{
              py: { xs: 1, md: 1.5 },
              flexDirection: "row",
              justifyContent: "space-evenly"
            }}>
              <Link href="#"><GoogleIcon fontSize="large" /></Link>
              <Link href="#"><FacebookIcon fontSize='large' /></Link>
              <Link href="#"><GitHubIcon fontSize='large' /></Link>
            </Stack>
          </GlassCard>
        </Container>
      </Box>
    </>
  );
}

export default Login;
