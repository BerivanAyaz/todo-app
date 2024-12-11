import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Layout, Menu, Button } from "antd";
import { RiLoginBoxLine, RiLogoutBoxRLine, RiUserAddLine } from "react-icons/ri";
import { reset, logout } from "../features/auth/authSlice";

const { Header } = Layout;

const HeaderComponent = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <Header style={{ position: "fixed", width: "100%", zIndex: 1 }}>
      <div className="logo" style={{ display: "flex", alignItems: "center" }}>
        {/* Logo Image */}
        <img 
          src="/logo.png" 
          alt="Logo" 
          style={{ height: "40px", marginRight: "10px" }} 
        />
        <Link to={user ? "/" : "/login"} style={{ color: "white", fontSize: "20px", fontWeight: 600 }}>
          <span style={{ fontWeight: 800 }}>My</span> To Do's
        </Link>
      </div>
      <Menu theme="dark" mode="horizontal" style={{ float: "right" }}>
        {user ? (
          <Menu.Item key="logout" onClick={handlerLogout}>
            <Button icon={<RiLogoutBoxRLine />} type="primary" style={{ backgroundColor: "none", borderColor: "none" }}>
              Logout
            </Button>
          </Menu.Item>
        ) : (
          <>
            <Menu.Item key="login">
              <Link to="/login">
                <RiLoginBoxLine /> Login
              </Link>
            </Menu.Item>
            <Menu.Item key="register">
              <Link to="/register">
                <RiUserAddLine /> Register
              </Link>
            </Menu.Item>
          </>
        )}
      </Menu>
    </Header>
  );
};

export default HeaderComponent;
