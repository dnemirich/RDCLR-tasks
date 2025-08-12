// import {BadList, GoodList} from "./ListOptimization.tsx";
// import {BadContextExample, GoodContextExample} from "./ContextOptimization.tsx";
// import {BadSlotsExample, GoodSlotsExample} from "./SlotOptimization.tsx";
import {BadFunctionUsageExample, GoodFunctionUsageExample} from "./FunctionInPropsOptimization.tsx";

export const OptimizationTask = () => {
    return (
        <div style={{display: "flex", flexDirection: "column", padding: "50px", gap: "20px"}}>
            {/*<div style={{display: "flex", justifyContent: "space-around"}}>*/}
            {/*    <BadList/>*/}
            {/*    <GoodList/>*/}
            {/*</div>*/}
            {/*<div style={{width: "100%", height: "2px", backgroundColor: 'black'}}></div>*/}
            {/*<div style={{display: "flex", justifyContent: "space-around"}}>*/}
            {/*    <BadContextExample/>*/}
            {/*    <GoodContextExample/>*/}
            {/*</div>*/}
            {/*<div style={{width: "100%", height: "2px", backgroundColor: 'black'}}></div>*/}
            {/*<div style={{display: "flex", justifyContent: "space-around"}}>*/}
            {/*    <BadSlotsExample/>*/}
            {/*    <GoodSlotsExample/>*/}
            {/*</div>*/}
            {/*<div style={{width: "100%", height: "2px", backgroundColor: 'black'}}></div>*/}
            <div style={{display: "flex", justifyContent: "space-around"}}>
                <BadFunctionUsageExample/>
                <GoodFunctionUsageExample/>
            </div>
        </div>
    )
}