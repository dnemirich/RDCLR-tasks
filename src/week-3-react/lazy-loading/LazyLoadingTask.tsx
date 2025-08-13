import s from './LazyLoadingTask.module.css'
import {type ComponentType, lazy, Suspense, useState} from "react";

const Component = () => {
    return (
        <div>
            Lazy component
            <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        </div>
    )
}

const LazyComponent = lazy(() =>
    new Promise<{default: ComponentType}>((resolve) => {
        setTimeout(() => resolve({default: Component}), 2000)
    })
)

export const LazyLoadingTask = () => {
    const [isShowed, setIsShowed] = useState(false);

    return (
        <div className={s.container}>
            <h1>Lazy loading demo</h1>
            <button  className={s.btn} onClick={() => setIsShowed(prevState => !prevState)}>Show component</button>
            {
                isShowed && <Suspense fallback={<Loader/>}>
                    <LazyComponent/>
                </Suspense>
            }
        </div>
    )
}

function Loader() {
    return (
        <div className={s.loaderWrapper}>
            <span className={s.loader} />
            <span>Loading</span>
        </div>
    )
}