/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
// import { useState } from "react";
// import AddTask from "./AddTask";
// import Todo from "./Todo";
// export default ()=>{
//     const [todos,setTodos] = useState([1,2,3]);
//     return (
//         <div className="text-center my-5 flex flex-col gap-4">
//         <h1 className="text-2xl font-bold">TODO LIST APP</h1>
//         {
//           todos.map((todo,key)=><Todo key = {key}/>)
//         }
//         <AddTask/>
//       </div>
//     )
// }

import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import TodoList from '../components/TodoList';
import { useRouter } from 'next/router';
import AddTask from './AddTask';

const Home = () => {
  const { user, handleLogout } = useAuth();
  const router = useRouter();
  useEffect(() => {
    const token = sessionStorage.getItem('access_token');
    if (!token) {
      router.push('/login');
    }
  });


  return (
    <div className='relative w-full h-screen flex flex-col py-20 px-5 md:px-20 justify-between items-center gap-1'>
      {/* <h1>TODO List</h1> */}
      <div className='w-full'>
        <AddTask />
      </div>
      <div className='w-full h-full p-2'>
        <TodoList />
      </div>

    </div>
  );
};

export default Home;
