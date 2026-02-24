
import { useState } from "react"

const localstorageKey = 'example'

export const ClientSideComponent = () => {
    const [count, setCount] = useState(Number(localStorage.getItem(localstorageKey)) | 0)

    const changeValue = () => {
        const newValue = count + 1
        setCount(newValue)
        localStorage.setItem(localstorageKey, String(newValue))
    }

    return (
        <div>
            <h1 className="text-white">Client Side Component</h1>
            <p className="text-white">This component is rendered on the client side and can have interactivity.</p>
            <p className="text-white">Count: {count}</p>
            <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:scale-105 transition-transform duration-150" onClick={changeValue}
            >Increment</button>
        </div >
    )
}