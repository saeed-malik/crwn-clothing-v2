import Directory from "../../components/directory/directory.component";
import { Outlet } from "react-router-dom";
import { ReactComponent as CrownLogo } from "../../assets/MyLogo.svg";

const Home = () => {
   return (
    <div>
      <Outlet />
      <Directory />
      <div className="logo">
        <CrownLogo />
      </div>
    </div>
  )
};

export default Home;
