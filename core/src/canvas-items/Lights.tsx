import { NinjaEngineContext } from "../utils/NinjaEngineManager";
import { IObjectManagement } from "../utils/NinjaProps";
import { Environment, Sky, SpotLight, SpotLightShadow, Detailed } from "@react-three/drei"
import React, { useContext, useEffect, useState, useRef } from "react"
import { MathUtils } from "three";
import { ShaderMaterial } from "three";

const Light = (om: IObjectManagement) => {
  const ref = useRef<any>();
  let light = undefined;
  let color: string = (om.args.materialData && om.args.materialData.value) ? om.args.materialData.value : '#fadcb9';
  if (om.args.type == "spot") {
    light = (
      <>
        <SpotLight
          position={om.args.position ? om.args.position : [0, 0, 0]}
          angle={MathUtils.degToRad(45)}
          distance={om.args.distance ? om.args.distance : 25}
          intensity={om.args.intensity ? om.args.intensity : 25}
          castShadow
          color={color}
          volumetric={false}
          layers={om.layerNum}
          ref={ref}
        />
      </>
    )
  }
  else if (om.args.type == "point") {
    light = (
      <>
        <pointLight
          position={om.args.position ? om.args.position : [0, 0, 0]}
          intensity={om.args.intensity ? om.args.intensity : 0.5}
          distance={om.args.distance ? om.args.distance : 25}
          castShadow
          color={color}
          layers={om.layerNum}
          ref={ref}
        />
      </>
    )
  }
  else if (om.args.type == "ambient") {
    light = (
      <>
        <ambientLight
          intensity={om.args.intensity ? om.args.intensity : 0.5}
          color={color}
          layers={om.layerNum}
          ref={ref}
        />
      </>
    )
  }
  else if (om.args.type == "directional") {
    light = (
      <>
        <directionalLight
          castShadow
          position={om.args.position? om.args.position: [5, 5, 5]}
          color={color}
          layers={om.layerNum}
          ref={ref}
        />
      </>
    )
  }

  useEffect(() => {
    if (ref.current) {
      if (om.layerNum){
        ref.current.layers.set(om.layerNum);
      }
      if (om.args.position) ref.current.position.copy(om.args.position);
      if (om.args.rotation) ref.current.rotation.copy(om.args.rotation);
      if (om.args.scale) ref.current.scale.copy(om.args.scale);
      if (om.args.castShadow) ref.current.castShadow = om.args.castShadow;
      if (om.args.receiveShadow) ref.current.receiveShadow = om.args.receiveShadow;
      if (om.args.intensity) ref.current.intensity = om.args.intensity;
      if (om.args.distance) ref.current.distance = om.args.distance;
      if (om.args.angle) ref.current.angle = om.args.angle;
      if (om.args.penumbra) ref.current.penumbra = om.args.penumbra;
    }
  }, [light]);

  return (
    <>
      {light}
    </>
  )
}

export const Lights = () => {
  const engine = useContext(NinjaEngineContext);
  const [lights, setLights] = useState(engine.getLights());

  useEffect(() => {
    setLights(engine.getLights());
    const handleLightsChanged = () => {
      setLights(engine.getLights());
    }
    engine.onLightsChanged(handleLightsChanged);
    return () => {
      engine.offLightsChanged(handleLightsChanged);
    }
  }, [engine]);
  
  return (
    <>
      {lights.map((light, index) => {
        return <Light {...light} key={index} />
      })}
    </>
  )
}