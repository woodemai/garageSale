'use client';
import React from 'react';
import {signOut} from "next-auth/react";

const Main = () => {
    return (
        <div>
            Welcome from main!
            <button onClick={() => signOut()}>Log out</button>
        </div>
    );
};

export default Main;