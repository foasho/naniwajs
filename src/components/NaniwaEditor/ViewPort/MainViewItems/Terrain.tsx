import { Environment, OrbitControls, PivotControls, Sky } from "@react-three/drei";
import { Box3, Euler, LineBasicMaterial, LineSegments, Matrix4, Mesh, Object3D, Quaternion, Raycaster, Vector2, Vector3, WireframeGeometry } from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useState, useEffect, useContext, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { NaniwaEditorContext } from "../../NaniwaEditorManager";
import { IObjectManagement } from "@/engine/core/NaniwaProps";
import { EffectComposer, Selection, Select, Outline } from "@react-three/postprocessing";

/**
 * 地形データの選択
 */
export const Terrain = () => {
  const editor = useContext(NaniwaEditorContext);
  const [terrain, setTerrain] = useState<IObjectManagement>(null);
  const object = terrain? terrain.object: null;
  const id = terrain? terrain.id: null;
  const [enabled, setEnabled] = useState<boolean>(true)
  const [helper, setHelper] = useState<boolean>(true)
  const onClick = (e, value: boolean) => {
    setEnabled(value);
    if (value) {
      editor.selectObject(id);
    }
    else {
      editor.unSelectObject(id);
    }
  }

  const lineSegs = [];
  if (object){
    object.traverse((node) => {
      if (node instanceof Mesh) {
        // nodeの回転率を戻す
        node.updateMatrix();
        node.geometry.applyMatrix4(node.matrix);
        node.quaternion.copy(new Quaternion().setFromEuler(node.rotation));
        node.rotation.set(0, 0, 0);
        const wire = new WireframeGeometry(node.geometry);
        const colorMat = new LineBasicMaterial({ color: editor.wireFrameColor });
        const lineSeg = new LineSegments(wire, colorMat);
        lineSegs.push(lineSeg);
      }
    });
  }

  useEffect(() => {
    setTerrain(editor.getTerrain());
  });

  useFrame((_, delta) => {
    if (terrain != editor.getTerrain()){
      setTerrain(editor.getTerrain());
    }
  });

  return (
    <>
      {object &&
        <Selection>
          <EffectComposer enabled={enabled} autoClear={false}>
            <Outline visibleEdgeColor={0x00ff00} hiddenEdgeColor={0x00ff00} edgeStrength={1000} />
          </EffectComposer>
          <Select enabled>
            <primitive
              object={object}
              onClick={(e) => {
                onClick(e, true)
              }}
              onPointerMissed={(e) => {
                onClick(e, false)
              }}
            />
          </Select>
        </Selection>
      }
      {helper &&
        <>
          {lineSegs.map((lineSeg) => {
            return <primitive object={lineSeg} />
          })}
        </>
      }
    </>
  )
}