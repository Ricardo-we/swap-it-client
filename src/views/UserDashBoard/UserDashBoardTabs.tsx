import { useState, useEffect, useContext } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
// VIEWS
import UserProductsControl from "./UserProductsControl";
import UserAccountSettings from "./UserAccountSettings";
import { AppContext } from "./../../App";
import Loader from "../../components/Loader";

function UserDashBoardTabs() {
  const { storedUser } = useContext<any>(AppContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<any>("user-settings");

  useEffect(() => {
    if (!storedUser.user || !storedUser.auth_token) navigate("/login");
  }, []);

  if (!storedUser.user || !storedUser.auth_token) return <Loader />;
  return (
    <>
      <NavBar />
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        defaultActiveKey="user-settings"
        id="uncontrolled-tab-example"
        className="mb-3 w-100"
      >
        <Tab eventKey="user-settings" title="User Settings">
          <UserAccountSettings />
        </Tab>
        <Tab eventKey="account-products" title="My items">
          <UserProductsControl />
        </Tab>
      </Tabs>
    </>
  );
}

export default UserDashBoardTabs;
