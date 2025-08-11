import {useEffect, useState} from "react";

export const UseEffectsTask = () => {
    const [showTimer, setShowTimer] = useState(false)

    useEffect(() => {
        console.log("[UseEffectsTask] effect (no deps) after every render");
        return () => console.log("[UseEffectsTask] cleanup (no deps) before next render");
    });


    useEffect(() => {
        console.log("[UseEffectsTask] mounted");
        return () => console.log("[UseEffectsTask] unmounted");
    }, []);



    return (
        <div>
            <h1>Use effect</h1>
            <button onClick={() => setShowTimer(!showTimer)}>Toggle Timer</button>
            {showTimer && <Timer/>}
        </div>

    )
};


const Timer = () => {
    const [now, setNow] = useState(() => new Date());
    const [running, setRunning] = useState(true);
    const [intervalMs, setIntervalMs] = useState(1000);

    useEffect(() => {
        console.log("[Timer] mounted");
        return () => console.log("[Timer] unmounted");
    }, []);

    useEffect(() => {
        console.log("[Timer] render effect (no deps)");
        return () => console.log("[Timer] cleanup before next render");
    });

    useEffect(() => {
        if (!running) {
            console.log("[Timer] paused");
            return;
        }

        console.log(`[Timer] start interval ${intervalMs}ms`);
        const id = setInterval(() => {
            setNow(new Date());
        }, intervalMs);

        return () => {
            console.log(`[Timer] clear interval ${intervalMs}ms`, id);
            clearInterval(id);
        };
    }, [running, intervalMs]);

    return (
        <div style={{ marginTop: 12 }}>
            <div>Current time: {now.toLocaleTimeString()}</div>

            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button onClick={() => setRunning(r => !r)}>
                    {running ? "Pause" : "Start"}
                </button>

                <label>
                    Interval (ms):
                    <input
                        type="number"
                        min={50}
                        step={50}
                        value={intervalMs}
                        onChange={(e) => setIntervalMs(Number(e.target.value) || 0)}
                    />
                </label>

                <button onClick={() => setIntervalMs(200)}>200ms</button>
                <button onClick={() => setIntervalMs(1000)}>1000ms</button>
                <button onClick={() => setIntervalMs(2000)}>5000ms</button>
            </div>
        </div>
    )
}