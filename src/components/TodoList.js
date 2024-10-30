import {useState} from 'react';


const TodoList = () => {
   
    const [list, setList] = useState([]);
    const [message, setMessage] = useState({
        text : "",
        id : ""
    });

    const [editingItem, setEditingItem] = useState({
        id : "",
        isEditing: false
    });

    const handleChange = (e) => {
        setMessage({
            ...message,
            text : e.target.value
        })
        
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const newObj = {
            text : message.text,
            id: new Date().getTime().toString()
        }
        setList([...list,newObj]);
        setMessage({
            text : '',
            id : ''
        });
    }
    const handleDelete = (id)=> {
        const newTodos = list.filter((eachItem)=> eachItem.id !== id);
        setList(newTodos);
    }
    const changeEditState = (id) => {
        setEditingItem({
            ...editingItem,
            id : id,
            isEditing: true
        })
        
        const editData = list.find((eachItem)=> eachItem.id === id);
        
        setMessage(editData);
    }
    const handleEdit = (e) => {
        e.preventDefault();
        const newTodo = list.map((eachItem)=>{
            if(eachItem.id === editingItem.id){
                return {
                    text:message.text,
                    id: editingItem.id
                }
            }else{
                return eachItem
            }
        }) 
        setList(newTodo)
        setMessage({
            text:"",
            id:""
        })
        setEditingItem({
            id: "",
            isEditing: false
        })
    }
    return(
       <div className='main-container'>
         <h1>Todo List Lohit</h1>
         <div>
            <form>
                <input type="text" placeholder='Eg: Be Happy' onChange={handleChange} value={message.text} className='txt'/>
                {
                    editingItem.isEditing ? <input type="submit" value="Edit" onClick={handleEdit} className='btn' /> : <input type="submit" value="Add" onClick={handleSubmit} className='btn'/>
                }
                
            </form>
            
           
            <ul className='list'>
                {
                    
                       list.length === 0 ? <h2>Start Writing</h2> : list.map((eachItem)=>{
                            const {text, id} = eachItem;
                        return(
                            <li key={id} className='item' >
                                <span>{text}</span>
                                <div className='btn-flex'>
                                <button onClick={()=>changeEditState(id)}>Edit</button>
                                <button onClick={()=>handleDelete(id)}>Delete</button>
                                </div>
                            </li>
                            
                        )
                    })
                    
                }
                </ul>
            
         </div>
       </div>
    )
};

export default TodoList;