import React from 'react';
import type { User } from '../types';

interface StoriesProps {
    users: User[];
}

const Stories: React.FC<StoriesProps> = ({ users }) => {
    // Just show a few users for the stories rail
    const storyUsers = users.slice(0, 5);
    
    return (
        <div className="bg-white p-4 shadow-sm">
            <div className="flex space-x-4 overflow-x-auto pb-2 -mb-2">
                {storyUsers.map(user => (
                    <div key={user.id} className="flex-shrink-0 text-center w-20">
                        <div className="relative">
                           <img 
                            src={user.avatarUrl} 
                            alt={user.name}
                            className="w-16 h-16 rounded-full border-2 border-pink-500 p-0.5 object-cover mx-auto" 
                           />
                        </div>
                        <p className="text-xs mt-2 text-gray-600 truncate">{user.name.split(' ')[0]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stories;
