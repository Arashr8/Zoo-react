import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './layout.scss'
import Header from "./Header";
import Home from "../home/Home";
import AnimalPage from "../animalPage/animalPage";

const Layout = () => {
    return (
        <div className={"layout"}>
            <Header/>
            <BrowserRouter>
                <Switch>
                    <Route path={"/:animalId"} component={AnimalPage}/>
                    <Route path={"/"} component={Home}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default Layout;
