import { IObjectManagement } from "@/core/utils/NinjaProps"
import { Sky } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useContext, useState } from "react"
import { NinjaEditorContext } from "../../NinjaEditorManager";


export const MySky = () => {
    const editor = useContext(NinjaEditorContext);
    const [sky, setSky] = useState<IObjectManagement>();
    useFrame((_, delta) => {
        if (sky != editor.getSky()){
            setSky(editor.getSky());
        }
    });
    return (<>
        {sky &&
            <Sky
                distance={450000}
                sunPosition={[0, 1, 0]}
                inclination={0}
                azimuth={0}
            />
        }
        </>
    )
}