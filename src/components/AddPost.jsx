import React from 'react';
import {host} from "../config";
import {Link, Redirect} from 'react-router-dom'
import SunEditor, {buttonList} from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

export class AddPost extends React.Component{
    constructor() {
        super();
        this.state = {
            titleInfo: '',
            titleValue: '',
            authorValue: '',
            date: '',
            redirect: false
        }
        this.sunEditor = React.createRef();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
    }
    handleImageUpload(targetImgElement, index, state, imageInfo, remainingFilesCount){
        console.log(targetImgElement, index, state, imageInfo, remainingFilesCount)
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if(name === 'titleValue'){
            const formData = new FormData();
            formData.append('title',target.value);
            console.log(fetch(host+'getTitles',{
                method:'POST',
                body: formData
            }).then(response=>response.json())
                .then(result=> {
                    console.log(result.title === target.value)
                    if(result.title === target.value) this.setState({
                        titleInfo: '<span style="color:red">Статья с таким заголовком уже существует</span>'
                    });
                    else this.setState({
                        titleInfo: ''
                    });
                }))
        }
        this.setState({
            [name]: value
        });
    }
    render() {
        document.title = 'Добавить пост';
        const { redirect } = this.state;
        if (redirect){
            return <Redirect to='/'/>;
        }
        return <div>
            <Link to="/">На главную</Link>
            <div className="my-3">
                <input onChange={this.handleInputChange} value={this.state.titleValue} name="titleValue" type="text" className="form-control" placeholder="Заголовок"/>
                <p dangerouslySetInnerHTML={{__html: this.state.titleInfo}}/>
            </div>
            <SunEditor
                ref={this.sunEditor}
                onImageUpload={this.handleImageUpload}
                height="500"
                setOptions={{
                    buttonList: [["undo", "redo"], ["bold", "underline", "italic", "strike", "subscript", "superscript"], ["removeFormat"], ["outdent", "indent"], ["fullScreen", "showBlocks", "codeView"], ["preview", "print"],["link", "image"]]
                }}/>
            <div className="my-3">
                <input onChange={this.handleInputChange} value={this.state.authorValue} name="authorValue" type="text" className="form-control" placeholder="Автор"/>
            </div>
            <button onClick={()=>{
                const formData = new FormData();
                const content = this.sunEditor.current.editor.core.getContents();
                const authorValue = this.state.authorValue;
                const titleValue = this.state.titleValue;
                if (content==='' || authorValue==='' || titleValue===''){
                    alert("Не все поля зполнены!");
                    return;
                }else if(this.state.titleInfo !== ''){
                    alert("Заголовк должен быть уникальным!");
                    return;
                }
                formData.append('EditorValue',content);
                formData.append('author',authorValue);
                formData.append('title',titleValue);
                fetch(host+'addPost',{
                    method: 'POST',
                    body: formData
                }).then(response=>response.json())
                    .then(result=>{
                        this.setState({ redirect: true });
                    })
            }} className="btn btn-primary">Сохранить</button>
        </div>
    }
}
