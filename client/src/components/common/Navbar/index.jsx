import {
  AppBar,
  Container,
  styled,
  Box,
  Button,
  Stack,
  IconButton,
  Menu,
} from "@mui/material";
import React, { useContext } from "react";
import mypic from "@/images/Logo/Vector.png";
import Image from "next/image";
import Link from "next/link";
import WebButton from "../BtnButton/WebButton";
import BtnButton from "../BtnButton/BtnButton";
import MetaMaskLogin from "@/components/core/MetaMaskLogin";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Context } from "@/Context";
import { useRouter } from "next/router";
import axios from "axios";

const Nav = styled(Box)({
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  display: "flex",
  background: "#fff",
  padding: "20px 0",
});
const NavItem = styled(Button)({
  fontSize: "15px",
  marginRight: "2px",
  textTransform: "capitalize",
  color: "inherit",
});

const Navbar = () => {
  const { state, dispatch } = useContext(Context);
  // const [anchorEl, setAnchorEl] =

  const router = useRouter();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = async () => {
    dispatch({
      type: "LOGOUT",
    });
    window, localStorage.removeItem("user");
    await axios({
      method: "GET",
      url: `/api/logout`,
    })
      .then((response) => {
        console.log(response.data.message);
        const { data } = response.data;
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });

    router.push("/login");
  };

  return (
    <>
      <AppBar position="fixed" color="transparent" elevation={0}>
        <Nav>
          <Container>
            <Stack
              direction={"row"}
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Stack
                direction={"row"}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image src={mypic} alt="Logo" width="50" />
                <NavItem sx={{ marginLeft: 2 }}>
                  <Link href="/">Home</Link>
                </NavItem>
                <NavItem>About</NavItem>
                <NavItem>Contact</NavItem>
              </Stack>

              {state.user !== null ? (
                <div>
                  <Button onClick={() => logout()} variant="contained">
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                    Logout
                  </Button>

                  {/* <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                  </Menu> */}
                </div>
              ) : (
                <Link href="login">
                  <Button variant="contained">Login</Button>
                </Link>
              )}
            </Stack>
          </Container>
        </Nav>
      </AppBar>
    </>
  );
};

export default Navbar;
