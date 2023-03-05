import { NaniwaEngine, NaniwaEngineContext } from "@/engine/core/NaniwaEngineManager";
import { InitNaniwa } from "@/engine/core/NaniwaInit";
import { INaniwaProps } from "@/engine/core/NaniwaProps";
import { useEffect, useState } from "react";
import { NaniwaCanvas } from "./NaniwaCanvas";
import { NaniwaUI } from "./NaniwaUI";

export interface INaniwaJSProps {
    jsonPath?: string;
    canvasHeight?: any;
    canvasWidth?: any; 
}

export const NaniwaJS = (props: INaniwaJSProps) => {
    const [engine, setEngine] = useState<NaniwaEngine>();
    useEffect(() => {
        const _engine = new NaniwaEngine();
        if (props.jsonPath && props.jsonPath.length > 3){
            _engine.setJson(props.jsonPath);
        }
        setEngine(_engine);
        return () => {
            // if (engine){
            //     engine.allClear();
            //     setEngine(null);
            // }
        }
    }, []);

    return (
        <>
            <div style={{ height: "100vh" }}>
                {engine &&
                    <NaniwaEngineContext.Provider value={engine}>
                        <NaniwaCanvas/>
                    </NaniwaEngineContext.Provider>
                }
            </div>
        </>
    )
}