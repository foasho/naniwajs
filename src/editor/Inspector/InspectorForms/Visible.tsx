import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { useSnapshot } from "valtio";

import { editorStore } from "@/editor/Store/Store";
import { useNinjaEditor } from "@/hooks/useNinjaEditor";
import { normalStyles } from "@/utils/styles";

type VisibleType = "none" | "auto" | "force";
type VisibleTypeOption = { value: VisibleType; label: string };

export const Visible = () => {
  const state = useSnapshot(editorStore);
  const id = state.currentId;
  const editor = useNinjaEditor();
  const { t } = useTranslation();
  const om = editor.getOMById(id);
  const [visibleType, setVisibleType] = useState<VisibleTypeOption>(
    om?.args.visibleType
      ? { value: om.args.visibleType, label: om.args.visibleType }
      : { value: "auto", label: t("autoScaling") },
  );
  const [distance, setDistance] = useState(25);

  // 描画種別の選択肢
  const visibleTypeOptions: VisibleTypeOption[] = [
    { value: "auto", label: t("autoScaling") },
    { value: "force", label: t("visibleForce") },
    { value: "none", label: t("visibleNone") },
  ];

  useEffect(() => {
    if (om) {
      if (om.args.visibleType !== undefined) {
        const visibleType = visibleTypeOptions.find((option) => option.value == om.args.visibleType);
        if (visibleType) setVisibleType(visibleType);
      }
    }
  }, [om, visibleTypeOptions]);

  /**
   * 描画種別の変更
   */
  const changeVisibleType = (selectVisibleType) => {
    if (id) editor.setVisibleType(id, selectVisibleType.value);
    setVisibleType(selectVisibleType);
  };

  /**
   * オート表示の場合のみ設定可
   */
  const changeDistance = (e) => {
    if (id) editor.setArg(id, "distance", Number(e.target.value));
    setDistance(Number(e.target.value));
  };

  return (
    <div className='mt-2'>
      <div>
        <div className='inline-block p-2 text-sm font-bold'>{t("visibleType")}</div>
        <div>
          <Select
            options={visibleTypeOptions}
            value={visibleType}
            onChange={(select) => changeVisibleType(select)}
            styles={normalStyles}
          />
        </div>
      </div>
      {/** オート表示の場合のみ設定可 */}
      {visibleType && visibleType.value == "auto" && (
        <div className='mb-4 mt-2'>
          <div>
            {t("visibleDistance")}
            <span className='pl-2'>{distance}</span>
          </div>
          <div>
            <input type='range' min={0} value={distance} max={150} step={1} onChange={changeDistance} />
          </div>
        </div>
      )}
    </div>
  );
};
