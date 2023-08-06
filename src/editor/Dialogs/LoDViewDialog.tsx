
import styles from "@/App.module.scss";
import { Suspense, useState } from "react";
import ReactDOM from "react-dom/client";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { basename, dirname, extname } from "path";
import { useTranslation } from "react-i18next";

const Model = ({ url, position }) => {
  const gltf: any = useGLTF(url);
  return (
    <primitive object={gltf.scene} position={position} />
  )
}


interface IResponse {
  filePath: string;
  response: () => void;
}
const LoDViewDialog = (prop: IResponse) => {

  const handleClickOutside = (event) => {
    if (event.target.classList.contains(styles.lodViewDialog)) {
      prop.response();
    }
  };

  const filePath = prop.filePath.replace("//", "/");
  const ext = extname(filePath);
  const fileName = basename(filePath).split(".")[0];
  const dirName = dirname(filePath);
  const lowPath = `${dirName}/${fileName}-low${ext}`.replace("//", "/");
  const midPath = `${dirName}/${fileName}-mid${ext}`.replace("//", "/");
  const { t } = useTranslation();

  return (
    <div
      className={styles.lodViewDialog}
      onClick={handleClickOutside}
    >
      <div className={styles.dialog}>
        <div className={styles.title}>
          {t("lodCheckTitle")}
        </div>
        <div className={styles.view}>
          <Suspense fallback={<span>loading...</span>}>
            <Canvas>
              <Model url={filePath} position={[-0.3, -1, 0]} />
              <Model url={midPath} position={[0, -1, 0]} />
              <Model url={lowPath} position={[0.3, -1, 0]} />
              <OrbitControls/>
              <Environment preset="dawn" background blur={0.7} />
            </Canvas>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

/**
 * 新しいオブジェクトの選択ダイアログ表示
 * @returns 
 */
export const showLoDViewDialog = async (filePath: string) => {
  return new Promise((resolve) => {
    const dialogContainer = document.getElementById("myDialog") as HTMLElement;
    const root = ReactDOM.createRoot(dialogContainer);
    const handleDialogClose = () => {
      root.unmount();
      resolve(null);
    };

    root.render(
      <LoDViewDialog response={handleDialogClose} filePath={filePath} />
    )
  });
};