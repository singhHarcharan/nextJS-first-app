"use client"
// By default, Next.js pages are server-side rendered (SSR) components.
// To make a page client-side rendered (CSR), you need to add the "use client" directive at the top of the page.

// you can say, so where ever we are using something that needs user interaction or something that server doesn't understand,
// we need to make it client side. i.e. (useState, useEffect, onClick etc.)

// For example, if we are using a button and i had to do something on click 'onClick', we need to make it client side component.

export default function Button() {

    function handler() {
        console.log("Button clicked...")
    }
    return <button onClick={handler} type="button" className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
        Sign in
    </button>
}