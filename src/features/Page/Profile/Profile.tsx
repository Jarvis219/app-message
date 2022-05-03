import React, { useState, useEffect } from 'react';
import { getUser } from 'utils/utils';
import { user } from 'models/zoom';

const Profile: React.FC = () => {
  const [user, setUser] = useState<user>({} as user);
  useEffect(() => {
    const { name, email, avatar } = (getUser() as unknown as { user: Object }).user as {
      name: string;
      email: string;
      avatar: string;
    };
    setUser({ name, email, avatar });
    return () => setUser({} as user);
  }, []);

  return (
    <div className="h-[100vh] ">
      <div className="bg-cover font-sans leading-normal tracking-wider text-gray-900 antialiased">
        <div className="mx-auto py-32 flex h-auto max-w-4xl flex-wrap items-center">
          <div id="profile" className="mx-6 w-full rounded-lg bg-gray-100 opacity-75 shadow-2xl ">
            <div className="p-4 text-center md:px-12 ">
              <div
                className="mx-auto z-20 -mt-16 block h-48 w-48 rounded-full bg-cover bg-center shadow-xl"
                style={{
                  backgroundImage: `url(${
                    user.avatar || 'https://source.unsplash.com/MP0IUfwrn0A'
                  })`,
                }}
              ></div>
              <h1 className="pt-8 text-3xl font-bold">{user?.name}</h1>
              <div className="mx-auto w-4/5 border-b-2 border-green-500 pt-3 opacity-25 "></div>

              <p className="flex items-center justify-center pt-2 text-xs text-gray-600 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="pl-3">Messenger Javis</span>
              </p>
              <p className="flex items-center justify-center pt-2 text-xs text-gray-600 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="pl-3">{user.email || 'Chưa cập nhật'}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
