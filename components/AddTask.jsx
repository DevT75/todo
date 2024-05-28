import { useContext, useEffect, useState } from 'react'
// import Modal from 'react-modal'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { AiOutlineClose } from "react-icons/ai";
import { createTodo, fetchTodos } from '../lib/api';
import { useAuth } from '../context/AuthContext';

// const customStyles = {
//     content: {
//         top: '50%',
//         left: '50%',
//         right: 'auto',
//         bottom: 'auto',
//         marginRight: '-50%',
//         transform: 'translate(-50%, -50%)',
//         borderRadius: "20px",
//         width: "90%",
//         height: "55%",
//     },
// };

const AddTask = () => {
    const [isModelOpen, setIsModelOpen] = useState(false);
    const openModal = () => setIsModelOpen(true);
    const closeModal = () => setIsModelOpen(false);
    const afterModalOpen = () => console.log("Modal Open");
    const [title, setTitle] = useState('');
    const [desc,setDesc] = useState('');
    const { setTodos } = useAuth();
    const handleCreate = async (e)=>{
        e.preventDefault();
        console.log({title,desc});
        await createTodo({title:title,description:desc});
        const data = await fetchTodos();
        setTodos(data);
        setTitle('');
        setDesc('');
        closeModal();
    }
    return (
        <div className="flex flex-row justify-center items-center w-full h-full">
            <button className="w-1/2 bg-white text-black px-2 py-4 rounded-md font-semibold"
                onClick={openModal}
            >Add New Task</button>
            <Modal
                open={isModelOpen}
                onClose={closeModal}
                center
                // ariaHideApp={false}
                // style={customStyles}
            // centered
            // className={"flex justify-center items-center w-1/2 h-1/2 border"}
            >
                <div className='w-full h-full z-10 flex flex-col justify-start items-center gap-2 rounded-'>
                    <div className='flex flex-row justify-around w-full mb-8'>
                        <h1 className='font-semibold text-lg'>Add Task</h1>
                        {/* <button onClick={closeModal} className='-mr-14'><AiOutlineClose size={28}/></button> */}
                    </div>
                    <form className='flex flex-col justify-center items-center gap-2 w-full'
                        onSubmit={handleCreate}
                    >
                        <input type="text" placeholder="Title" className='p-4 w-full border focus:border-2 border-black'
                            onChange={(e)=>{setTitle(e.target.value)}}
                        />
                        <textarea type="textarea" placeholder="Description" className='p-4 w-full h-28 border focus:border-2 border-black'
                            onChange={(e)=>{setDesc(e.target.value)}}
                        />
                        <button type="submit" className='mt-6 w-1/2 bg-black text-white font-semibold hover:bg-white hover:border-2 hover:border-black hover:text-black rounded p-4'
                        >Add Task</button>
                    </form>
                </div>
            </Modal>
        </div>)
}

export default AddTask;