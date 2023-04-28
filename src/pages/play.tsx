import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Canvas } from "@react-three/fiber";
// import { NinjaGL } from "@ninjagl/core";
// import dynamic from 'next/dynamic';

// const DynamicNinjaGL = dynamic(() => import('@ninjagl/core').then((mod) => mod.NinjaGL), {
//   ssr: false,
// });


const BuildPlay = () => {
  const router = useRouter();
  const [decodedNjcPath, setDecodedNjcPath] = useState<string | null>(null);

  useEffect(() => {
    if (router.query.njcPath) {
      const decodedPath = decodeURIComponent(router.query.njcPath as string);
      setDecodedNjcPath(decodedPath);
    }
  }, [router.query]);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {decodedNjcPath ? (
        //  <DynamicNinjaGL njcPath={decodedNjcPath} />
        // <NinjaGL njcPath={decodedNjcPath} />
        <Canvas>
          <mesh>
            <boxGeometry />
            <meshStandardMaterial color="hotpink" />
          </mesh>
          <directionalLight/>
          <spotLight/>
        </Canvas>
      ) : (
        <p>Not Found NjcPath</p>
      )}
    </div>
  );
};
export default BuildPlay;
