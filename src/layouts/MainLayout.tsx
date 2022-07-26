import { Outlet } from "react-router-dom";
import { Header } from "../components";

const MainLayout: React.FC = () => (
  <div className="App">
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  </div>
);

export default MainLayout;
