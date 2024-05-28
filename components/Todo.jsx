/* eslint-disable import/no-anonymous-default-export */

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { fetchTodos, updateTodo } from '../lib/api';
// eslint-disable-next-line react/display-name
export default ({ title, desc, isCompleted, id, onDelete, onEdit, setTodos }) => {

    const [isModelOpen, setIsModelOpen] = useState(false);
    const toggleModal = () => setIsModelOpen(!isModelOpen);
    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedDesc, setUpdatedDesc] = useState(desc);
    const [updateDue, setUpdateDue] = useState(isCompleted);

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log({ updatedTitle, updatedDesc });
        await updateTodo(id, { title: updatedTitle, description: updatedDesc, completed: updateDue });
        const data = await fetchTodos();
        setTodos(data);
        toggleModal();
    }
    return (
        <div className="relative flex flex-col justify-between items-center border shadow p-4 md:w-[250px] md:h-[250px] rounded-lg bg-white
            w-full h-[100px]">
            <div className="absolute top-1 left-1 flex-1">
                {
                    isCompleted ? (
                        <div className="w-auto h-6 bg-green-500 rounded-md px-2 flex items-center text-sm text-white font-semibold">Done</div>
                    ) : (
                        <div className="w-auto h-6 bg-red-500 rounded-md px-2 flex items-center text-sm text-white font-semibold">Pending</div>
                    )
                }
            </div>
            <div className='flex flex-auto flex-row md:flex-col justify-between items-center w-full'>
                <div className="flex-auto gap-4 flex-col justify-between items-center text-white w-3/4 md:w-full flex-1">
                    <div className=" text-lg md:text-2xl font-medium mt-4 text-black w-full justify-center flex items-center"><span className='text-ellipsis w-full overflow-hidden whitespace-nowrap'>{title}</span></div>
                    <div className="md:block mb-2 text-black h-full w-full hidden"><p className="text-ellipsis w-full overflow-hidden whitespace-nowrap">{desc}</p></div>
                </div>
                <div className="flex flex-auto gap-4 md:gap-4 md:-mb-8 w-1/4 md:w-full justify-end md:justify-center items-center">
                    <button className=" bg-green-500 text-white py-2 md:py-2.5 rounded-md font-semibold" onClick={toggleModal}>
                        <div className="md:hidden px-2">
                            <AiOutlineEdit size={28} />
                        </div>

                        {/* Text for medium and larger screens */}
                        <div className="hidden md:block px-2">
                            {isCompleted ? <AiOutlineEdit size={28} /> : "Mark Done"}
                        </div>
                    </button>
                    <Modal
                        open={isModelOpen}
                        onClose={toggleModal}
                        center
                    >
                        <div className='w-full h-full z-10 flex flex-col justify-start items-center gap-2 rounded-'>
                            <div className='flex flex-row justify-around w-full mb-8'>
                                <h1 className='font-semibold text-lg'>Add Task</h1>
                                {/* <button onClick={closeModal} className='-mr-14'><AiOutlineClose size={28}/></button> */}
                            </div>
                            <form className='flex flex-col justify-center items-center gap-2 w-full'
                                onSubmit={handleUpdate}
                            >
                                <input type="text" placeholder="Title" className='p-4 w-full border focus:border-2 border-black'
                                    onChange={(e) => { setUpdatedTitle(e.target.value) }}
                                    value={updatedTitle}
                                />
                                <textarea type="textarea" placeholder="Description" className='p-4 w-full h-28 border focus:border-2 border-black'
                                    onChange={(e) => { setUpdatedDesc(e.target.value) }}
                                    value={updatedDesc}
                                />
                                <input type='checkbox' onChange={(e) => { setUpdateDue(e.target.checked) }} />
                                <button type="submit" className='mt-6 w-1/2 bg-black text-white font-semibold hover:bg-white hover:border-2 hover:border-black hover:text-black rounded p-4'
                                >Update Task</button>
                            </form>
                        </div>
                    </Modal>
                    <button className=" bg-red-500 text-white p-2 rounded-md font-semibold flex justify-center items-center" onClick={() => onDelete(id)}><AiOutlineDelete size={28} /></button>
                </div>
            </div>
        </div>
    );
}