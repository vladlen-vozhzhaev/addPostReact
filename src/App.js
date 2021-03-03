import logo from './logo.svg';
import './App.css';
import  {Route,BrowserRouter} from "react-router-dom";
import {Posts} from "./components/Posts";
import {AddPost} from "./components/AddPost";
import {Post} from "./components/Post";



function App() {
  return (
      <div className="container mt-5">
        <BrowserRouter>
          <Route exact path="/" render={()=><Posts/>}/>
          <Route path="/add-post" render={()=><AddPost/>}/>
          <Route path="/post/:id" render={(props)=><Post {...props}/>}/>
        </BrowserRouter>
      </div>
  );
}

export default App;
