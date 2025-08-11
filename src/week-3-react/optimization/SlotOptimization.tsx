import {memo, type ReactNode, useState} from "react";
import { useRenderCount } from "./utils";
import * as React from "react";


const BadCard = ({ title, footerText }: { title: string; footerText: string }) => {
    useRenderCount("BadCard");
    return (
        <div style={{ border: "1px solid gray", padding: "8px", margin: "8px" }}>
            <Title title={title} />
            <StaticText />
            <Footer text={footerText} />
        </div>
    );
};

const Title = ({ title }: { title: string }) => {
    useRenderCount("BadCard Title");
    return <h3>{title}</h3>;
};

const StaticText = () => {
    useRenderCount("BadCard StaticText");
    return <div>Static text</div>;
};

const Footer = ({ text }: { text: string }) => {
    useRenderCount("BadCard Footer");
    return <div>{text}</div>;
};

export const BadSlotsExample = () => {
    const [count, setCount] = useState(0);
    useRenderCount("BadSlotsExample");

    return (
        <div>
            <BadCard title="Card title" footerText={`Clicked ${count} times`} />
            <button onClick={() => setCount(count + 1)}>Click</button>
        </div>
    );
};

// ------------------------------------------------------------

const GoodCard = React.memo(({ title, staticText, footer }: { title: ReactNode; staticText: ReactNode; footer: ReactNode }) => {
    useRenderCount("GoodCard");
    return (
        <div style={{ border: "1px solid gray", padding: "8px", margin: "8px" }}>
            <div>{title}</div>
            <div>{staticText}</div>
            <div>{footer}</div>
        </div>
    );
});

const GoodTitle = memo(({ title }: { title: string }) => {
    useRenderCount("GoodCard Title");
    return <h3>{title}</h3>;
});

const GoodStaticText = memo(() => {
    useRenderCount("GoodCard StaticText");
    return <div>Static text</div>;
});

const GoodFooter = ({ text }: { text: string }) => {
    useRenderCount("GoodCard Footer");
    return <div>{text}</div>;
};

export const GoodSlotsExample = () => {
    const [count, setCount] = useState(0);
    useRenderCount("GoodSlotsExample");

    return (
        <div>
            <GoodCard staticText={<GoodStaticText/>} title={<GoodTitle title={"Card title"}/>} footer={<GoodFooter text={`Clicked ${count} times`}/>} />
            <button onClick={() => setCount(count + 1)}>Click</button>
        </div>
    );
};


