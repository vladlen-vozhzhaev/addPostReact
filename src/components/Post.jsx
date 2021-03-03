import React from 'react';
import {host} from "../config";
import {Link} from "react-router-dom";

export class Post extends React.Component{
    constructor() {
        super();
        this.state = {
            title: '',
            author: '',
            content: ''
        }
    }
    componentDidMount() {
        const formData = new FormData();
        formData.append("postId",this.props.match.params.id);
        fetch(host+"getPost",{
            method: 'POST',
            body: formData
        }).then(response=>response.json())
            .then(result=>{
                this.setState({
                    title: result.title,
                    author: result.author,
                    content: result.content
                });
                document.title = result.title;
            })
    }

    render() {
        return <div>
            <Link to="/">На главную</Link>
            <h1>{this.state.title}</h1>
            <h3>Автор: {this.state.author}</h3>
            <div dangerouslySetInnerHTML={{__html: this.state.content}}/>
        </div>
    }
}
