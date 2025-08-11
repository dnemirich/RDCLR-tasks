import * as React from "react";
import {useRenderCount} from "./utils.tsx";
import {useMemo, useState} from "react";

const BadListItem = ({ item }: { item: string }) => {
    useRenderCount(`Bad item: ${item}`);
    return <li>{item}</li>;
};

export const BadList = () => {
    const [count, setCount] = useState(0);
    useRenderCount('Bad list')


    const items = Array.from({length: 10}, (_, i) => `Element ${i + 1}`);

    return (
        <div>
            <h2>Bad list</h2>
            <button onClick={() => setCount(count + 1)}>Click {count}</button>
            <ul>
                {items.map((item) => (
                    <BadListItem item={item} key={Math.random()}/>
                ))}
            </ul>
        </div>
    );
}

// -----------------------------------------------

const ListItem = React.memo(({item}: { item: string }) => {
    useRenderCount(`Good item: ${item}`)
    return <li>{item}</li>
})

export const GoodList = () => {
    const [count, setCount] = useState(0);
    useRenderCount('Good list')

    const items = useMemo(() => (Array.from({length: 10}, (_, i) => `Element ${i + 1}`)
        ),
        []
    )

    return (
        <div>
            <h2>Good list</h2>
            <button onClick={() => setCount(count + 1)}>Click {count}</button>
            <ul>
                {items.map((item, index) => (
                    <ListItem item={item} key={index}/>
                ))}
            </ul>
        </div>
    );
}