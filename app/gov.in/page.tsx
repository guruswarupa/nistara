'use client';
import { useState } from 'react';

const GovPage: React.FC = () => {
    const [enteredPassword, setEnteredPassword] = useState('');
    const [authorized, setAuthorized] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = () => {
        const correctPassword = process.env.NEXT_PUBLIC_VIP_PASS;
        if (enteredPassword === correctPassword) {
            setAuthorized(true);
            setError(null);
        } else {
            setError('Invalid password');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
            {!authorized ? (
                <div className="w-full max-w-sm p-8 bg-gray-800 rounded-lg shadow-lg">
                    <h1 className="mb-6 text-2xl font-bold text-center">Authentication</h1>
                    <div className="space-y-4">
                        <input
                            className="w-full px-4 py-2 text-gray-900 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            type="password"
                            placeholder="Enter password"
                            value={enteredPassword}
                            onChange={(e) => setEnteredPassword(e.target.value)}
                        />
                        <button
                            className="w-full py-2 font-bold text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </div>
                </div>
            ) : (
                <p className="text-2xl font-semibold">Welcome! You are now logged in.</p>
            )}
        </div>
    );
};

export default GovPage;
