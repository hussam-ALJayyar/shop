import { Typography } from "../../App.Styles";
import { useState } from "react";
import {
  NavbarContainer,
  InnerNav,
  NavBox,
  InputText,
  ButtonNav,
  SpanNav,
  Icon,
  SearchIconNav,
  StyledLink,
  StyledBox,
  StyledBoxForMobile,
  MobileMenu,
  CloseDiv,
} from "./NavBar.Styles";
import PersonIcon from "@material-ui/icons/Person";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../Redux/User/userActions";
import { MenuOutlined } from "@material-ui/icons";
import { useHistory } from "react-router";

export default function Navbar() {
  const Style = {
    fontSize: 25,
    color: "#FFF",
    fill: "#FFF",
    margin: "auto 0 10px 0",
  };
  const StyleBoxSerch = {
    background: "#FFF",
    borderRadius: 6,
    width: "33%",
    minWidth: 250,
  };
  const [value, setValue] = useState("");
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state);

  const handleOpenMenu = () => {
    setIsMenuOpened(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpened(false);
  };

  return (
    <>
      {isMenuOpened && (
        <MobileMenu>
          <CloseDiv color={"#242424"} as={"div"} onClick={handleCloseMenu}>
            x
          </CloseDiv>
          <StyledLink color={"#242424"} to={"/"}>
            <SpanNav color={"#242424"}>Pro</SpanNav>Shop
          </StyledLink>

          <Icon to={state.userDetails.user._id ? "/profile" : "/login"}>
            <PersonIcon style={Style} />
            {state.userDetails.user._id ? (
              <Typography fontSize={13} color={"#fff"}>
                Profile
              </Typography>
            ) : (
              <Typography fontSize={13} color={"#fff"}>
                Login / Sign up
              </Typography>
            )}
          </Icon>

          <Icon to={"/cart"}>
            <span>{state.cart.cart.length}</span>
            <ShoppingCartIcon
              style={{ ...Style, transform: "translate(0, -4px)" }}
            />
            <Typography
              fontSize={"13px"}
              color={"#fff"}
              style={{
                transform: "translate(0, -4px)",
              }}
            >
              Cart
            </Typography>
          </Icon>
          {state.userDetails.user._id && (
            <Icon
              style={{ marginTop: "auto" }}
              onClick={() => {
                dispatch(logoutAction());
                localStorage.removeItem("user");
              }}
            >
              <ExitToAppIcon style={Style} />
              <Typography fontSize={13} color={"#fff"}>
                Logout
              </Typography>
            </Icon>
          )}
        </MobileMenu>
      )}

      <NavbarContainer>
        <InnerNav>
          <NavBox>
            <StyledLink to={"/"}>
              <SpanNav>Pro</SpanNav>Shop
            </StyledLink>
          </NavBox>
          <NavBox style={StyleBoxSerch}>
            <InputText
              type="text"
              value={value}
              placeholder="Search"
              onChange={(e) => setValue(e.target.value)}
            />
            <ButtonNav 
            onClick={() => {
              history.push(`/search${value ? `?keyword=${value}` : ""}`);
            }}>
              <SearchIconNav />
              search
            </ButtonNav>
          </NavBox>
          <StyledBox>
            <Icon to={state.userDetails.user._id ? "/profile" : "/login"}>
              <PersonIcon style={Style} />
              {state.userDetails.user._id ? (
                <Typography fontSize={13} color={"#fff"}>
                  Profile
                </Typography>
              ) : (
                <Typography fontSize={13} color={"#fff"}>
                  Login / Sign up
                </Typography>
              )}
            </Icon>

            <Icon to={"/cart"}>
              <span>{state.cart.cart.length}</span>
              <ShoppingCartIcon
                style={{ ...Style, transform: "translate(0, -4px)" }}
              />
              <Typography
                fontSize={"13px"}
                color={"#fff"}
                style={{
                  transform: "translate(0, -4px)",
                }}
              >
                Cart
              </Typography>
            </Icon>
            {state.userDetails.user._id && (
              <Icon
                onClick={() => {
                  dispatch(logoutAction());
                  localStorage.removeItem("user");
                }}
              >
                <ExitToAppIcon style={Style} />
                <Typography fontSize={13} color={"#fff"}>
                  Logout
                </Typography>
              </Icon>
            )}
          </StyledBox>
          <StyledBoxForMobile>
            <MenuOutlined style={Style} onClick={handleOpenMenu} />
          </StyledBoxForMobile>
        </InnerNav>
      </NavbarContainer>
    </>
  );
}
