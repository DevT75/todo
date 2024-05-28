import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
    const { handleLogin } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleLogin( username, password );
        const user = {
            username : username,
            password : password
        }
        sessionStorage.setItem('user', JSON.stringify(user));
    };

    return (
        <div className='w-1/4 py-16 flex flex-col justify-between items-center p-8 rounded-md backdrop-blur-sm bg-white/15 gap-4 border'>
            <h1 className='text-white mb-6 text-2xl'>Welcome User!!</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-8 w-full justify-center items-center'>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className='px-4 py-4 rounded-md w-full'
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='px-4 py-4 rounded-md w-full'
                />
                <button type="submit" className='bg-black text-white px-4 py-4 rounded-md hover:bg-white hover:text-black hover:font-semibold w-3/4'>Login</button>
            </form>
        </div>

    );
};

export default LoginForm;