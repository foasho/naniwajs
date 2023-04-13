import { NinjaEngine, NinjaEngineContext } from "@/core/NinjaEngineManager";
import { NinjaCanvas } from "@/core/NinjaCanvas";
import { useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { NinjaEditorContext } from "../NinjaEditorManager";
import { SkeletonUtils } from "three-stdlib";
import { clone as SkeletonUtilsClone } from "three/examples/jsm/utils/SkeletonUtils";
import { NJCFile } from "@/core/utils/NinjaFileControl";
import { IConfigParams } from "@/core/utils/NinjaProps";

/**
* OMとUIから一時的なJSONデータを生成し、
* NinjaEngineを実行する
*/
export const DebugPlay = () => {
  const editor = useContext(NinjaEditorContext);
  const [engine, setEngine] = useState<NinjaEngine>();
  const { t } = useTranslation();
  useEffect(() => {
    // EditorからOMを取得してJSON化する
    const oms = [...editor.getOMs()];
    oms.map((om) => {
      const _om = { ...om };
      if (om.type == "avatar") {
        const target = SkeletonUtils.clone(_om.object);
        target.animations = om.animations;
        _om.object = target;
      }
      return _om;
    });
    const ums = [...editor.getUMs()];
    const tms = [...editor.getTMs()];
    const sms = [...editor.getSMs()];
    const config = editor.config;
    // Configパラメータを設定する
    const _config: IConfigParams = {
      ...config,
      isDebug: true,
    }
    const _engine = new NinjaEngine();
    const njcFile = new NJCFile();
    njcFile.setConfig(_config);
    njcFile.setOMs(oms);
    njcFile.setUMs(ums);
    njcFile.setTMs(tms);
    njcFile.setSMs(sms);
    _engine.setNJCFile(njcFile);

    // エンジンにセット
    setEngine(_engine);

    return () => {
      
    }
  }, []);

  return (
    <>
      <div id="Ninjaviewer" style={{ height: "100%" }}>
        {engine &&
          <NinjaEngineContext.Provider value={engine}>
            <NinjaCanvas />
          </NinjaEngineContext.Provider>
        }
      </div>
    </>
  )
}