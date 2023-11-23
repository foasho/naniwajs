import {
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  PerspectiveCamera as DPerspectiveCamera,
  Preload,
  Text,
} from '@react-three/drei';
import { AnimationMixer, Euler, Mesh, Object3D, Vector3, MathUtils, PerspectiveCamera, Color } from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useState, useEffect, useContext, useRef, useLayoutEffect, Suspense } from 'react';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { MyLights } from './MainViewItems/Lights';
import { StaticObjects } from './MainViewItems/Objects';
import { Terrain } from './MainViewItems/Terrain';
import { Avatar } from './MainViewItems/Player';
import { MySky } from './MainViewItems/Sky';
import { MdVideogameAsset, MdVideogameAssetOff } from 'react-icons/md';
import { TiSpanner } from 'react-icons/ti';
import { ImEarth } from 'react-icons/im';
import { ThreeObjects } from './MainViewItems/Three';
import { Perf } from 'r3f-perf';
import { gltfLoader } from '@ninjagl/core';
import { AiFillCamera, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { UICanvas } from './MainViewUIs/UICanvas';
import { isNumber } from '@/commons/functional';
import Swal from 'sweetalert2';
import { Cameras } from './MainViewItems/Cameras';
import { FogComponent } from './MainViewItems/Fog';
import { useSnapshot } from 'valtio';
import { globalConfigStore, globalContentStore, globalStore } from '../Store/Store';
import { useSession } from 'next-auth/react';
import { MyEnviroment } from './MainViewItems/MyEnvironment';
import { MyTexts } from './MainViewItems/MyTexts';
import { MyEffects } from './MainViewItems/MyEffects';
import { EDeviceType, useInputControl } from '@/hooks/useInputControl';
import { useNinjaEditor } from '@/hooks/useNinjaEditor';
import { useTranslation } from 'react-i18next';
import { CameraPreview } from '../Inspector/CamraPreview';

export const MainViewer = () => {
  const configState = useSnapshot(globalConfigStore);
  const [renderCount, setRenderCount] = useState(0);
  const loadingRef = useRef<HTMLDivElement>(null);
  const contentsState = useSnapshot(globalContentStore);
  const [isHovered, setIsHovered] = useState(false);
  const [isConfHovered, setIsConfHovered] = useState(false);
  const cameraSpeedRef = useRef<HTMLInputElement>();
  const [cameraSpeed, setCameraSpeed] = useState<number>(1);
  const cameraFarRef = useRef<HTMLInputElement>(null);
  const [cameraFar, setCameraFar] = useState<number>(1000);
  const worldSizeRef = useRef<HTMLInputElement>(null);
  const [worldSize, setWorldSize] = useState<number>(64);
  const worldGridSizeRef = useRef<HTMLInputElement>(null);
  const [worldGridSize, setWorldGridSize] = useState<number>(8);
  const [uiGridNum, setUIGridNum] = useState<8 | 16 | 24 | 32>(8);
  const { getAvatarOM, removeOM, addOM, onNJCChanged, offNJCChanged } = useNinjaEditor();
  // 水平グリッド
  const [isGrid, setIsGrid] = useState<boolean>(false);
  const [isWorldHelper, setIsWorldHelper] = useState<boolean>(true);
  const [isGizmo, setIsGizmo] = useState<boolean>(true);
  const [showCanvas, setShowCanvas] = useState<boolean>(true);
  const [showUI, setShowUI] = useState<boolean>(false);
  const { data: session } = useSession();

  /**
   * Editorの設定に同期
   */

  /**
   * シーンへの直接ドラッグ＆ドロップ時
   * @param e
   */
  const handleDrop = async (e) => {
    e.preventDefault();
    // const loader = new GLTFLoader()
    //       .setCrossOrigin('anonymous')
    //       .setDRACOLoader( DRACO_LOADER )
    //       .setMeshoptDecoder( MeshoptDecoder );
    if (!contentsState.currentUrl) {
      /**
       * ここは、一度アセットに落として、表示する必要がある
       */
      if (session) {
        // Upload
        // Swal.fire({
        //   title: "Now Developing...",
        //   icon: "info",
        //   confirmButtonText: "OK",
        // });
        return;
      } else {
        // ログインしてください
        Swal.fire({
          title: 'ログインしてください',
          icon: 'info',
          confirmButtonText: 'OK',
        });
        return;
      }
    } else {
      const type = contentsState.currentType;
      if (type == 'gltf' || type == 'ter' || type == 'avt') {
        if (loadingRef.current) {
          loadingRef.current.style.display = 'block';
        }
        const filePath = contentsState.currentUrl;
        gltfLoader.load(
          filePath,
          async (gltf) => {
            const scene = gltf.scene || (gltf.scenes[0] as Object3D);
            const userData: { [key: string]: any } = {};
            scene.traverse((node: Mesh) => {
              if (node.userData) {
                Object.keys(node.userData).map((key) => {
                  userData[key] = node.userData[key];
                });
              }
              if ((node as Mesh).isMesh) {
                if (node.geometry) {
                  node.castShadow = true;
                  node.receiveShadow = true;
                }
              }
            });
            if (type == 'gltf') {
              if (userData.type && userData.type == 'avatar') {
                // すでにアバターがある場合には、削除する
                const oldAvatar = getAvatarOM();
                if (oldAvatar) {
                  removeOM(oldAvatar.id);
                }
                // Objectからアニメーション取得
                let animations = scene.animations;
                if (animations.length === 0) {
                  animations = gltf.animations;
                }
                let offsetParams;
                if (userData.offsetParams) {
                  if (userData.offsetParams.tp) {
                    userData.offsetParams.tp.offset = new Vector3().copy(userData.offsetParams.tp.offset);
                    userData.offsetParams.tp.lookAt = new Vector3().copy(userData.offsetParams.tp.lookAt);
                  }
                  if (userData.offsetParams.fp) {
                    userData.offsetParams.fp.offset = new Vector3().copy(userData.offsetParams.fp.offset);
                    userData.offsetParams.fp.lookAt = new Vector3().copy(userData.offsetParams.fp.lookAt);
                  }
                  offsetParams = userData.offsetParams;
                }
                // Animationがあればセットする
                addOM({
                  id: MathUtils.generateUUID(),
                  name: '*Avatar',
                  filePath: filePath,
                  type: 'avatar',
                  physics: false,
                  phyType: 'box',
                  visibleType: 'force',
                  visible: true,
                  args: {
                    animMapper: userData.animMapper ? userData.animMapper : null,
                    offsetParams: offsetParams,
                    defaultMode: userData.defaultMode ? userData.defaultMode : 'tp',
                  },
                  object: scene,
                  animations: animations,
                  mixer: animations.length > 0 ? new AnimationMixer(scene) : undefined,
                });
              } else {
                // Animationがあればセットする
                addOM({
                  id: MathUtils.generateUUID(),
                  filePath: filePath,
                  name: '*Object',
                  type: 'object',
                  physics: false,
                  phyType: 'box',
                  visibleType: 'auto',
                  visible: true,
                  args: {
                    position: new Vector3(0, 0, 0),
                    rotation: new Euler(0, 0, 0),
                  },
                  object: scene,
                  animations: gltf.animations,
                  mixer: gltf.animations.length > 0 ? new AnimationMixer(scene) : undefined,
                });
              }
            }
            if (type == 'ter') {
              // 地形データは、強制的に表示
              addOM({
                id: MathUtils.generateUUID(),
                filePath: filePath,
                name: '*Terrain',
                type: 'terrain',
                physics: false,
                phyType: 'along',
                visibleType: 'force',
                visible: true,
                args: {},
                object: scene,
              });
            }
            if (loadingRef.current) {
              loadingRef.current.style.display = 'none';
            }
          },
          (xhr) => {},
          async (err) => {
            console.log('モデル読み込みエラ―');
            console.log(err);
            if (loadingRef.current) {
              loadingRef.current.style.display = 'none';
            }
          },
        );
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // ブラウザのデフォルト動作をキャンセルする
  };

  /**
   * NJCの変更を検知して、再レンダリングする
   */
  useEffect(() => {
    const init = () => {
      setRenderCount(renderCount + 1);
    };
    onNJCChanged(init);
    return () => {
      offNJCChanged(init);
    };
  }, []);

  const { t } = useTranslation();

  return (
    <div className='h-full relative bg-[#e2e2e2]'>
      <Canvas
        key={renderCount}
        gl={{
          alpha: configState.alpha,
          logarithmicDepthBuffer: configState.logarithmicDepthBuffer,
          antialias: configState.antialias,
        }}
        style={{ display: showCanvas ? 'block' : 'none' }}
        id='mainviewcanvas'
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        shadows
      >
        <Suspense fallback={null}>
          <MyLights />
          <StaticObjects />
          <Terrain />
          <Avatar />
          <MySky />
          <ThreeObjects />
          <Cameras />
          <FogComponent />
          <MyEnviroment />
          <MyTexts />
          <MyEffects />
          <SystemHelper
            isGizmo={isGizmo}
            cameraFar={cameraFar}
            cameraSpeed={cameraSpeed}
            worldSize={worldSize}
            isGrid={isGrid}
            isWorldHelper={isWorldHelper}
            worldGridSize={worldGridSize}
          />
          <Preload all />
        </Suspense>
      </Canvas>
      <div
        className='bg-white bg-opacity-50 absolute z-50 w-full h-full top-0'
        style={{ display: showUI ? 'block' : 'none' }}
      >
        <UICanvas gridNum={uiGridNum} />
      </div>
      {/** CameraPreview */}
      <CameraPreview />
      {/** コントロール層 */}
      <div className='absolute z-50 top-10 left-2.5'>
        <a
          className='text-white cursor-pointer px-1.5 py-1 mr-1 bg-[#222] rounded-md relative'
          onMouseLeave={() => setIsHovered(false)}
          onMouseOver={() => setIsHovered(true)}
        >
          <ImEarth className='inline' />
          {isHovered && (
            <div className='block absolute z-10 top-full left-0 bg-primary rounded-md shadow-md p-3 w-48'>
              <div className='mb-3'>
                <label className='block'>
                  <input type='checkbox' checked={isGrid} onChange={() => setIsGrid(!isGrid)} />
                  水平グリッド線
                </label>
                <label className='block'>
                  <input type='checkbox' checked={isWorldHelper} onChange={() => setIsWorldHelper(!isWorldHelper)} />
                  ワールド補助線
                </label>
                <label className='block'>
                  <input type='checkbox' checked={isGizmo} onChange={() => setIsGizmo(!isGizmo)} />
                  Gizmo
                </label>
              </div>
              <div className='grid grid-cols-2 gap-1 mb-3'>
                <label>
                  視野(far)
                  <input
                    type='text'
                    ref={cameraFarRef}
                    placeholder={cameraFar.toString()}
                    onKeyDown={(e: any) => {
                      if (e.key == 'Enter' && cameraFarRef.current) {
                        if (isNumber(cameraFarRef.current.value)) {
                          const val = Number(cameraFarRef.current.value);
                          if (val <= 4096) {
                            setCameraFar(val);
                          } else {
                            Swal.fire({
                              title: 'エラー',
                              text: '4096以下の値を入力してください',
                              icon: 'error',
                            });
                          }
                        }
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          )}
        </a>
        <a
          className='text-white cursor-pointer px-1.5 py-1 mr-1 bg-[#222] rounded-md relative'
          onMouseLeave={() => setIsConfHovered(false)}
          onMouseOver={() => setIsConfHovered(true)}
        >
          <TiSpanner className='inline' />
          {isConfHovered && (
            <div className='block absolute z-10 top-full left-0 bg-primary rounded-md shadow-md p-3 min-w-[200px]'>
              <div>
                <span className='mb-2 mr-3'>{t('physics')}</span>
                <input
                  type='checkbox'
                  className='inline'
                  checked={configState.physics}
                  onChange={(e) => {
                    globalConfigStore.autoScale = e.target.checked;
                  }}
                />
              </div>
            </div>
          )}
        </a>
        <a
          onClick={() => {
            if (cameraSpeed > 7) {
              setCameraSpeed(1);
            } else {
              setCameraSpeed(cameraSpeed + 1);
            }
          }}
          className='text-white cursor-pointer px-1.5 py-1 mr-1 bg-[#222] rounded-md relative select-none'
        >
          <AiFillCamera className='inline' />
          <span className='text-sm align-top'>{cameraSpeed}</span>
        </a>
        <a
          className='text-white cursor-pointer px-1.5 py-1 mr-1 bg-[#222] rounded-md'
          onClick={() => setShowCanvas(!showCanvas)}
        >
          {showCanvas ? <AiFillEye className='inline' /> : <AiFillEyeInvisible className='inline' />}
        </a>
        <a
          className='text-white cursor-pointer px-1.5 py-1 mr-1 bg-[#222] rounded-md'
          onClick={() => setShowUI(!showUI)}
        >
          {showUI ? <MdVideogameAsset className='inline' /> : <MdVideogameAssetOff className='inline' />}
        </a>
        {showUI && (
          <>
            <a
              onClick={() => {
                if (uiGridNum == 8) {
                  setUIGridNum(16);
                } else if (uiGridNum == 16) {
                  setUIGridNum(24);
                } else if (uiGridNum == 24) {
                  setUIGridNum(32);
                } else if (uiGridNum == 32) {
                  setUIGridNum(8);
                }
              }}
              className='text-lg ml-0.5 text-white cursor-pointer px-2.5 py-1 mr-1.25 bg-[#222] rounded-md'
            >
              {uiGridNum}
            </a>
          </>
        )}
      </div>
      <div
        ref={loadingRef}
        style={{
          display: 'none',
          background: '#12121266',
          height: '100%',
          width: '100%',
          top: 0,
          left: 0,
          position: 'absolute',
          zIndex: 1000000,
        }}
      >
        <div
          style={{
            color: '#fff',
            fontWeight: 'bold',
            position: 'absolute',
            width: '100%',
            textAlign: 'center',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          Loading...
        </div>
      </div>
    </div>
  );
};

/**
 * 補助機能
 */
interface ISysytemHelper {
  worldGridSize: number;
  cameraFar: number;
  cameraSpeed: number;
  isGrid: boolean;
  isWorldHelper: boolean;
  worldSize: number;
  isGizmo: boolean;
}
const SystemHelper = (props: ISysytemHelper) => {
  const [minimal, setMinimal] = useState(true);
  const gridHelperSize = 4096;
  const divisions = props.worldGridSize;
  const cellSize = props.worldSize / divisions;
  const numberElements: any[] = [];
  const numberPlanes: any[] = [];

  const getCenterPosFromLayer = (layer: number, yPos: number, worldSize: number, layerGrid: number): Vector3 => {
    const layerXLen = worldSize / layerGrid;
    const layerZLen = worldSize / layerGrid;
    const cx = worldSize / 2;
    const cz = worldSize / 2;
    const c = Math.ceil(layer / layerGrid);
    let r = layer % layerGrid;
    if (r === 0) r = layerGrid;
    const absPosX = (layerGrid - r) * layerXLen;
    const absPosZ = (c - 1) * layerZLen;
    const worldXZ = [absPosX - cx + layerXLen / 2, -absPosZ + cz - layerZLen / 2];
    return new Vector3(worldXZ[0], yPos, worldXZ[1]);
  };

  if (props.isWorldHelper) {
    for (let i = 0; i < divisions; i++) {
      for (let j = 0; j < divisions; j++) {
        const number = i * divisions + j + 1;
        const textPosition = getCenterPosFromLayer(number, -0.01, props.worldSize, divisions);
        const planePosition = new Vector3().addVectors(textPosition, new Vector3(0, -0.01, 0));
        const isEven = (i + j) % 2 === 0;
        const color1 = isEven ? new Color(0x808080) : new Color(0xd3d3d3);
        const color2 = isEven ? new Color(0xd3d3d3) : new Color(0x808080);
        numberElements.push(
          <Text
            key={number}
            fontSize={cellSize * 0.25}
            position={textPosition}
            rotation={[Math.PI / 2, Math.PI, 0]}
            color={color1}
          >
            {number}
          </Text>,
        );
        numberPlanes.push(
          <mesh key={number} position={planePosition} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[cellSize, cellSize]} />
            <meshBasicMaterial color={color2} transparent={true} opacity={0.3} />
          </mesh>,
        );
      }
    }
  }

  return (
    <>
      <CameraControl cameraSpeed={props.cameraSpeed} cameraFar={props.cameraFar} />
      {props.isGrid && <gridHelper args={[gridHelperSize, gridHelperSize]} />}
      {props.isGizmo && (
        <GizmoHelper alignment='top-right' margin={[75, 75]}>
          <GizmoViewport labelColor='white' axisHeadScale={1} />
        </GizmoHelper>
      )}
      <Perf
        position={'bottom-right'}
        style={{ position: 'absolute' }}
        minimal={minimal}
        onClick={() => setMinimal(!minimal)}
      />
      <>
        {numberElements}
        {numberPlanes}
      </>
    </>
  );
};

/**
 * WASDカメラ視点移動
 * ※Fキーで任意のオブジェクトにフォーカスする
 * 補助操作
 */
interface ICameraControl {
  cameraFar: number;
  cameraSpeed: number;
  enable?: boolean;
}
export const CameraControl = (props: ICameraControl) => {
  const state = useSnapshot(globalStore);
  const contentState = useSnapshot(globalContentStore);
  const editor = useNinjaEditor();
  const ref = useRef<OrbitControlsImpl>(null);
  const cameraRef = useRef<PerspectiveCamera>(null);
  const { gl, camera } = useThree();
  const { input } = useInputControl({ device: EDeviceType.Desktop });
  // Fキーが押された瞬間にカメラをフォーカスするためのフラグ
  const [focusOnObject, setFocusOnObject] = useState(false);

  useLayoutEffect(() => {
    if (cameraRef && cameraRef.current) {
      const initCameraPosition = new Vector3().copy(contentState.cameraPosition);
      cameraRef.current.position.copy(initCameraPosition.clone());
      cameraRef.current.lookAt(0, 0, 0);
      camera.position.copy(initCameraPosition.clone());
      camera.lookAt(0, 0, 0);
      targetFocusCamera('', initCameraPosition);
    }
  }, []);

  useEffect(() => {
    if (cameraRef && cameraRef.current) {
      camera.far = props.cameraFar;
      cameraRef.current.far = camera.far;
    }
  }, [props.cameraFar]);

  /**
   * 選択中のオブジェクトにカメラをフォーカスする
   * @param id
   */
  const targetFocusCamera = (id: string, p: Vector3 | null = null) => {
    const position = p ? p : editor.getPosition(id);
    if (position) {
      const target = new Vector3().copy(position.clone());

      // ターゲットからカメラまでの距離を設定
      const distance = 5;

      // ターゲットの前方向ベクトルをカメラの現在の位置から計算
      const forwardDirection = new Vector3().subVectors(target, cameraRef.current!.position).normalize();
      forwardDirection.negate(); // ターゲットの背後方向を取得

      // ターゲットの上方向ベクトルを取得
      const upDirection = new Vector3(0, 1, 0);

      // ターゲットの右方向ベクトルを取得
      const rightDirection = new Vector3();
      rightDirection.crossVectors(upDirection, forwardDirection).normalize();

      // カメラの上方向ベクトル、右方向ベクトル、背後方向ベクトルに距離をかける
      upDirection.multiplyScalar(distance);
      rightDirection.multiplyScalar(distance);
      forwardDirection.multiplyScalar(distance);

      // ターゲットに上方向ベクトル、右方向ベクトル、背後方向ベクトルを加算して、フォーカス位置を計算
      const focusPosition = new Vector3().addVectors(target, upDirection).add(rightDirection).add(forwardDirection);

      cameraRef.current!.position.copy(focusPosition);
      cameraRef.current!.lookAt(target);
      if (ref && ref.current) {
        ref.current.target.copy(target);
      }
    }
  };

  const calculateNewTarget = (camera: PerspectiveCamera, distance: number) => {
    const direction = new Vector3();
    camera.getWorldDirection(direction);
    const newPosition = new Vector3().addVectors(camera.position, direction.multiplyScalar(distance));
    return newPosition;
  };

  useFrame((_, delta) => {
    // Fキーが押された瞬間の検出
    if (input.pressedKeys.includes('KeyF') && !focusOnObject) {
      setFocusOnObject(true);
    } else if (!input.pressedKeys.includes('KeyF') && focusOnObject) {
      setFocusOnObject(false);
    }

    // Fキーが押された瞬間にstate.currentIdにフォーカスする
    if (focusOnObject && state.currentId) {
      targetFocusCamera(state.currentId);
    }
    if (input.dash && (input.forward || input.backward || input.right || input.left)) {
      const st = props.cameraSpeed * delta * 10;
      const cameraDirection = new Vector3();
      cameraRef.current!.getWorldDirection(cameraDirection);
      const cameraPosition = cameraRef.current!.position.clone();

      if (input.forward) {
        cameraPosition.add(cameraDirection.clone().multiplyScalar(st));
      }
      if (input.backward) {
        cameraPosition.sub(cameraDirection.clone().multiplyScalar(st));
      }
      if (input.right) {
        const cameraRight = new Vector3();
        cameraRight.crossVectors(cameraDirection, cameraRef.current!.up).normalize();
        cameraPosition.add(cameraRight.multiplyScalar(st));
      }
      if (input.left) {
        const cameraLeft = new Vector3();
        cameraLeft.crossVectors(cameraDirection, cameraRef.current!.up).normalize();
        cameraPosition.sub(cameraLeft.multiplyScalar(st));
      }
      globalContentStore.cameraPosition.copy(cameraPosition.clone());
      cameraRef.current!.position.copy(cameraPosition);
      ref.current!.target.copy(cameraPosition.add(cameraDirection));
    } else if (ref.current && cameraRef.current) {
      cameraRef.current.position.copy(ref.current.object.position);
      cameraRef.current.rotation.copy(ref.current.object.rotation);
      cameraRef.current.lookAt(ref.current.target);
    }

    if (ref.current && cameraRef.current) {
      // // 新しいターゲット位置を計算して更新します
      const distance = props.cameraSpeed * 10; // カメラとターゲットの一定距離を指定
      const newTarget = calculateNewTarget(cameraRef.current, distance);
      ref.current.target.copy(newTarget);
    }
  });

  return (
    <>
      <DPerspectiveCamera makeDefault ref={cameraRef} />
      <OrbitControls
        ref={ref}
        args={[cameraRef.current!, gl.domElement]}
        camera={cameraRef.current!}
        makeDefault={true}
      />
    </>
  );
};
