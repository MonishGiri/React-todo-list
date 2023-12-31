import React, { useEffect, useState } from 'react'
import './style.css'

//get data from local storage

const getLocalData = () =>{
    const lists = localStorage.getItem("mytodolist");

    if(lists){
        return JSON.parse(lists);
    }
    else{
        return [];
    }
}

const Todo = () => {
    const [inputdata, setInputData] = useState();
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, settoggleButton] = useState(false);

    // add items function

    const addItem = () =>{
        if(!inputdata){
            alert('plz fill the data');
        }else if(inputdata && toggleButton){
            setItems(
                items.map((curElem) =>{
                    if(curElem.id === isEditItem){
                        return {...curElem, name:inputdata}
                    }
                    return curElem;
                })
            );
            
            setInputData("");
            setIsEditItem(null);
            settoggleButton(false);
        }
        else{
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputdata
            }
            setItems([...items, myNewInputData])
            setInputData("");
        }
    };

    // delete items
    const deleteItem = (index) =>{
        const updatedItems = items.filter((curElem) =>{
            return curElem.id !== index;
        })
        setItems(updatedItems )
    };

    // remove all the elements
    const removeAll = () =>{
        setItems([]);
    };

    // add to local storage

    useEffect(() =>{
        localStorage.setItem("mytodolist",JSON.stringify(items))
    },[items])

    // edit items

    const editItem = (index) =>{
        const item_todo_edited = items.find((curElem) => {
            return curElem.id === index;
        })
        setInputData(item_todo_edited.name);
        setIsEditItem(index);
        settoggleButton(true);
    };

  return (
    <>
        <div className="main-div">
            <div className="child-div">
                <figure>
                    <img src="./images/logo.jpg" alt="todologo" />
                    <figcaption>Add Your List Here ✌ </figcaption>
                </figure>

                <div className="addItems">
                    <input type="text" placeholder='✍ Add Items' className='form-control'
                    value={inputdata}
                    onChange={(event) => setInputData(event.target.value)}
                    />
                    {toggleButton ? <i className="far fa-edit edit-btn" onClick={addItem}></i> : 
                    <i className="fa fa-plus add-btn" onClick={addItem}></i>}
                    
                </div>

                    {/* show our items */}
                    <div className="showItems">
                        {items.map((curElem) =>{
                            return(
                                <div className="eachItem" key={curElem.id}>
                            <h3>{curElem.name}</h3>
                            <div className="todo-btn">
                            <i className="far fa-edit edit-btn" onClick={() => editItem(curElem.id)}></i>
                            <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id)}></i>
                            </div>
                        </div>
                            )
                        })}
                        
                    </div>

                    {/* remove all buttons */}
                <div className="showItems">
                    <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}> <span> CHECK LIST </span>  
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Todo