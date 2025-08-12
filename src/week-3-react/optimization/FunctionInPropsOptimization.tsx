import {useRenderCount} from "./utils.tsx";
import * as React from "react";
import {useCallback, useState} from "react";

const BadChild = ({onClick}: { onClick: () => void }) => {
    useRenderCount("BadChild component");
    return (<div>
        <p>Child component</p>
        <button onClick={onClick}>Add user</button>
    </div>)
}

export const BadFunctionUsageExample = () => {
    useRenderCount("BadFunctionUsageExample");

    const [count, setCount] = useState(0);
    const [users, setUsers] = useState(['Kate', 'Mike', 'Jake'])

    const handleClick = () => {
        setUsers([...users, `User ${Math.random()}`])
    }

    return (
        <div>
            <BadChild onClick={handleClick}/>
            <button onClick={() => setCount(count + 1)}>Click</button>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>{user}</li>
                ))}
            </ul>
        </div>
    )

}


// --------------------------------------------


const GoodChild = React.memo(({onClick}: { onClick: () => void }) => {
    useRenderCount("GoodChild component");
    return (<div>
        <p>Child component</p>
        <button onClick={onClick}>Add user</button>
    </div>)
})

export const GoodFunctionUsageExample = () => {
    useRenderCount("GoodFunctionUsageExample");

    const [count, setCount] = useState(0);
    const [users, setUsers] = useState(['Kate', 'Mike', 'Jake'])

    const handleClick = useCallback(() => {
        setUsers([...users, `User ${Math.random()}`])
    }, [users])

    return (
        <div>
            <GoodChild onClick={handleClick}/>
            <button onClick={() => setCount(count + 1)}>Click</button>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>{user}</li>
                ))}
            </ul>
        </div>
    )
}