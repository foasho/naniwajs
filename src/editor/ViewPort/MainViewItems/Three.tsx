import { useEffect, useRef, useState } from "react";
import { IObjectManagement } from "@ninjagl/core";
import { MeshReflectorMaterial, useHelper } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { BoxHelper, Color, Mesh } from "three";
import { useSnapshot } from "valtio";

import { EnableClickTrigger } from "@/commons/functional";
import { editorStore } from "@/editor/Store/Store";
import { useNinjaEditor } from "@/hooks/useNinjaEditor";

export const ThreeObjects = () => {
  const { oms, onOMsChanged, offOMsChanged } = useNinjaEditor();
  const [threeOMs, setThreeOMs] = useState<IObjectManagement[]>([]);
  useEffect(() => {
    const update = () => {
      const _oms = oms.current.filter((om) => om.type == "three");
      setThreeOMs(_oms);
    };
    update();
    onOMsChanged(update);
    return () => {
      offOMsChanged(update);
    };
  }, []);
  return (
    <>
      {threeOMs.map((om) => {
        return <ThreeObject om={om} key={om.id} />;
      })}
    </>
  );
};

interface IThreeObject {
  om: IObjectManagement;
}
const ThreeObject = (props: IThreeObject) => {
  const { om } = props;
  const { camera } = useThree();
  const state = useSnapshot(editorStore);
  const ref = useRef<Mesh>(null);
  const { onOMIdChanged, offOMIdChanged, pivotRef } = useNinjaEditor();
  const [helper, setHelper] = useState<boolean>(false);
  const id = props.om.id;
  const [material, setMaterial] = useState<any>();
  // const matRef = useRef<any>();
  let geometry;
  if (om.args.type == "plane") {
    geometry = <planeGeometry />;
  } else if (om.args.type == "sphere") {
    geometry = <sphereGeometry />;
  } else if (om.args.type == "box") {
    geometry = <boxGeometry />;
  } else if (om.args.type == "cylinder") {
    geometry = <cylinderGeometry />;
  } else if (om.args.type == "capsule") {
    geometry = <capsuleGeometry />;
  }

  useEffect(() => {
    const init = () => {
      if (ref.current) {
        if (om.args.position) {
          ref.current.position.copy(om.args.position);
        }
        if (om.args.rotation) {
          ref.current.rotation.copy(om.args.rotation);
        }
        if (om.args.scale) {
          ref.current.scale.copy(om.args.scale);
        }
        let _material;
        if (om.args.materialData) {
          const color = om.args.materialData.value ? new Color(om.args.materialData.value) : new Color(0xffffff);
          if (om.args.materialData.type == "standard") {
            _material = <meshStandardMaterial color={color} />;
          } else if (om.args.materialData.type == "phong") {
            _material = <meshPhongMaterial color={color} />;
          } else if (om.args.materialData.type == "toon") {
            _material = <meshToonMaterial color={color} />;
          } else if (om.args.materialData.type == "reflection") {
            _material = <MeshReflectorMaterial mirror={0} color={color} />;
            // issue: https://github.com/pmndrs/drei/issues/1663
            // _material = (<meshStandardMaterial color={color} />);
          }
        }
        if (_material) setMaterial(_material);
        if (om.args.helper !== undefined) setHelper(om.args.helper);
        if (om.args.castShadow !== undefined) {
          ref.current.castShadow = om.args.castShadow;
        }
        if (om.args.receiveShadow !== undefined) {
          ref.current.receiveShadow = om.args.receiveShadow;
        }
        ref.current.visible = om.visible;
      }
    };
    init();
    onOMIdChanged(id, init);
    return () => {
      offOMIdChanged(id, init);
    };
  }, []);

  // @ts-ignore
  useHelper(state.currentId == id && helper && ref, BoxHelper);

  return (
    <>
      {geometry && (
        <mesh
          ref={ref}
          castShadow={true}
          receiveShadow={true}
          onClick={(e) => {
            if (!state.currentId) e.stopPropagation();
            if (EnableClickTrigger(camera.position.clone(), ref.current!) && state.currentId !== id) {
              pivotRef.current = ref.current;
              editorStore.currentId = id;
            }
          }}
          onPointerMissed={(e) => {
            if (e.type === "click" && state.currentId == id) {
              editorStore.init(e)
              e.preventDefault();
            }
          }}
        >
          {geometry}
          {material}
        </mesh>
      )}
    </>
  );
};
