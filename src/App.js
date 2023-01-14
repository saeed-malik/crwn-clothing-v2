import Home from "./routes/home/home.components";
import { Routes, Route } from 'react-router-dom';
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./components/authentication/authentication.component";

const Shop = () => {
   return (<h1>Bismillah</h1>)
}

const App = () => {
   return (
      <Routes>
         <Route path="/" element= {<Navigation />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="auth" element={<Authentication />} />
         </Route>
      </Routes>
   )
};

export default App;