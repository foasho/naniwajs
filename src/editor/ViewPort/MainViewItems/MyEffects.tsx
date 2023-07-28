
import React, { useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Bloom, SSR, LUT, EffectComposer } from "@react-three/postprocessing";
import { IObjectManagement } from '@ninjagl/core';
import { LUTCubeLoader } from 'postprocessing';
import { CubeTextureLoader, Texture } from 'three';
import { useNinjaEditor } from '@/hooks/useNinjaEditor';

export const MyEffects = () => {
  const { oms } = useNinjaEditor();
  const effects = useMemo(() => {
    return oms.filter((om) => {
      return om.type == "effect";
    });
  }, [oms]); 

  return (
    <>
      {effects.length > 0 && 
      <>
        <EffectComposer disableNormalPass>
          {effects.map((om) => {
            return <MyEffect om={om} key={om.id} />
          })}
        </EffectComposer>
      </>
      } 
    </>
  )
}


const MyEffect = ({ om }: { om: IObjectManagement }) => {
  const [renderCount, setRenderCount] = useState(0);
  const editor = useNinjaEditor();
  const [texture, setTexture] = useState(null);
  const id = om.id;

  useEffect(() => {
    if (om.args.type === "lut" && om.args.texture) {
      const loader = new LUTCubeLoader();
      loader.load(om.args.texture, (loadedTexture) => {
        setTexture(loadedTexture);
      });
    } else {
      setTexture(null);
    }
    const handleIdChanged = () => {
      setRenderCount(renderCount + 1);
    }
    editor.onOMIdChanged(id, handleIdChanged);
    return () => {
      editor.offOMIdChanged(id, handleIdChanged);
    }
  }, [om, renderCount]);

  const effect = useMemo(() => {
    if (om.args.type === "bloom") {
      return (
        <Bloom
          luminanceThreshold={om.args.luminanceThreshold}
          mipmapBlur={om.args.mipmapBlur}
          luminanceSmoothing={om.args.luminanceSmoothing}
          intensity={om.args.intensity}
        />
      );
    } else if (om.args.type === "ssr") {
      return (
        <SSR
          {...om.args}
        />
      );
    } else if (om.args.type === "lut" && texture) {
      return <LUT lut={texture as Texture} />;
    }
  }, [om, texture, renderCount]);

  return <>{effect}</>;
};
