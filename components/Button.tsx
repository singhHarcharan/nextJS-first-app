"use client"
import axios from 'axios';
// By default, Next.js pages are server-side rendered (SSR) components.
// To make a page client-side rendered (CSR), you need to add the "use client" directive at the top of the page.

// you can say, so where ever we are using something that needs user interaction or something that server doesn't understand,
// we need to make it client side. i.e. (useState, useEffect, onClick etc.)

// For example, if we are using a button and i had to do something on click 'onClick', we need to make it client side component.

import { useRouter } from 'next/navigation'
import { signup } from '@/app/serverActions/user'

export default function Button({label, username, password}: {label: string, username: string, password: string}) {
    const router = useRouter();
    async function handler() {
        console.log("Button clicked...")
        // try {
        //     const response = await axios.post(`http://localhost:3000/api/user/${label=="Sign Up"?"signup":"signin"}`, {
        //         username: username, 
        //         password: password
        //     });
        //     console.log("Response after signing up is ", response)
        // } catch(e) {
        //     console.error(e);
        //     console.log("Unable to signup")
        // }
        const response = await signup(username, password);
        console.log("Response after signing up is ", response)
        router.push('/')
    }
    return <button onClick={handler} type="button" className="cursor-pointer mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
        {label}
    </button>
}