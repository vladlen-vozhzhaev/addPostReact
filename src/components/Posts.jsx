import React from 'react';
import {Link} from "react-router-dom";
import {host} from "../config";
function Tr(props){
    return  <tr>
        <th scope="row">{props.index}</th>
        <td><Link to={"/post/"+props.id}>{props.title}</Link></td>
        <td>{props.author}</td>
        <td>{props.date}</td>
    </tr>
}
export class Posts extends React.Component{
    constructor() {
        super();
        this.state = {
            posts: []
        }
    }
    componentDidMount() {
        document.title = 'Главная';
        fetch(host+'getPosts')
            .then(
            response=>response.json())
                .then(result=>{
                    this.setState({
                        posts: result.map((item,i)=><Tr key={i} index={i+1} date={item.date} id={item.id} title={item.title} author={item.author}/>)
                    });
                });
    }
    render() {

        return <div>
            <Link to="add-post" className="btn btn-primary">Добавить запись</Link>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Заголовок</th>
                    <th scope="col">Автор</th>
                    <th scope="col">Дата добавления</th>
                </tr>
                </thead>
                <tbody>
                    {this.state.posts}
                </tbody>
            </table>
        </div>
    }

}
