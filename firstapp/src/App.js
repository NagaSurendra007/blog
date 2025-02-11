import NavBar from "./NavBar"
import './App.css'  
import {BrowserRouter,Routes,Route } from "react-router-dom"
import AboutPage from "./pages/AboutPage";
import ArticlePage from "./pages/ArticlePage";
import ArticlesListPage from "./pages/ArticlesListPage";
import HomePage from "./pages/HomePage";
import NotfoundPage from "./pages/NotfoundPage";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/CreateAccountPage";

function App(){
    return(
     <BrowserRouter>
        <div className = "App">
            <h1>First React Page</h1>
            <NavBar></NavBar>
            <div id ="page-body">           
        <Routes>
              <Route path ="/" element = {<HomePage/>}></Route>
             <Route path ="/About" element = {<AboutPage/>}></Route>
             <Route path ="/Articles/:articleId" element = {<ArticlePage/>}></Route>
             <Route path ="/Articles" element = {<ArticlesListPage/>}></Route>
             <Route path ="*" element = {<NotfoundPage/>}></Route>
             <Route path ="/login" element = {<LoginPage/>}></Route>
             <Route path ="/register" element = {<Signup/>}></Route>

           
        </Routes>
            </div>
        </div>
    </BrowserRouter>

    );
}

export default App;
