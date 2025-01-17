import { memo, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BsBox, BsLightbulbFill, BsPersonFill } from "react-icons/bs";
import { MdTerrain } from "react-icons/md";
import { IObjectManagement } from "@ninjagl/core";
import Swal from "sweetalert2";
import { useSnapshot } from "valtio";

import { editorStore } from "@/editor/Store/Store";
import { useNinjaEditor } from "@/hooks/useNinjaEditor";

const _HierarchyTree = () => {
  const { oms, getOMById, onOMsChanged, offOMsChanged } = useNinjaEditor();
  const [trees, setTrees] = useState<IObjectManagement[]>([]);
  const state = useSnapshot(editorStore);
  const id = state.currentId;
  const [selectOM, setSelectOM] = useState<IObjectManagement | null>(null);

  const { t } = useTranslation();

  useEffect(() => {
    const update = () => {
      if (oms.current !== trees) {
        setTrees(oms.current);
      }
    };
    update();
    onOMsChanged(update);
    return () => {
      offOMsChanged(update);
    };
  }, []);

  useEffect(() => {
    if (id) {
      const om = getOMById(id);
      if (om) {
        setSelectOM(om);
      }
    }
  }, [id]);

  return (
    <>
      <div>
        <div className='select-none pl-[10px] text-sm font-bold text-white'>{t("objects")}</div>
        <div className='m-0 h-[25vh] min-h-[100px] overflow-y-auto overflow-x-hidden rounded-sm border-1 border-[#6e6b6b] p-2'>
          {trees.map((om, idx) => {
            return <TreeItem om={om} index={idx} key={idx} />;
          })}
        </div>
      </div>
    </>
  );
};

interface ITreeItem {
  index: number;
  om: IObjectManagement;
}
const TreeItem = (prop: ITreeItem) => {
  const { currentId, hiddenList } = useSnapshot(editorStore);
  const ref = useRef<HTMLDivElement>(null);
  const { setName, setVisible } = useNinjaEditor();
  const [visible, setLocalVisible] = useState<boolean>(true);
  const { om } = prop;
  const id = om.id;
  let lineStyle = "text-white bg-[#797272]";
  if (prop.index % 2 !== 0) {
    lineStyle = "text-gray-300 bg-[#4b4848]";
  }
  let className = `text-xs py-0.5 px-1.25 items-center ${lineStyle}`;
  if (currentId === id) {
    className += " border border-[1.5px] border-[#43D9D9]";
  }
  let typeIcon = <BsBox />; // デフォルトObject型
  if (prop.om.type == "landscape") {
    typeIcon = <MdTerrain />;
  } else if (prop.om.type == "light") {
    typeIcon = <BsLightbulbFill />;
  } else if (prop.om.type == "avatar") {
    typeIcon = <BsPersonFill />;
  }

  let visibleIcon = <AiFillEye />;
  if (!visible) {
    visibleIcon = <AiFillEyeInvisible />;
  }

  /**
   * 名前を変更
   */
  const changeName = async () => {
    Swal.fire({
      title: "名前の変更",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "変更",
      showLoaderOnConfirm: true,
      preConfirm: async (inputStr) => {
        //バリデーションを入れたりしても良い
        if (inputStr.length == 0) {
          return Swal.showValidationMessage("1文字以上いれてね");
        }
        return inputStr;
      },
      allowOutsideClick: function () {
        return !Swal.isLoading();
      },
    }).then((result) => {
      if (result.value) {
        setName(id, result.value);
      }
    });
  };

  /**
   * 表示非表示切り替え
   */
  const changeVisible = () => {
    const changeVisible = !visible;
    if (!changeVisible) {
      hiddenList.includes(id) ? null : editorStore.hiddenList.push(id);
    } else {
      const index = hiddenList.indexOf(id);
      if (index !== -1) {
        editorStore.hiddenList.splice(index, 1);
      }
    }
    setVisible(id, !visible);
    setLocalVisible(!visible);
  };

  /**
   * 選択/非選択を切り替える
   */
  const onSelectObject = () => {
    editorStore.currentId = prop.om.id;
    if (prop.om.type == "landscape") {
      editorStore.setMode(
        new Set(["landscape"])
      );
    }
  };

  return (
    <>
      <div className={className} ref={ref}>
        <div className='inline-block pr-0.5 align-middle text-sm'>{typeIcon}</div>
        <div
          className='inline-block cursor-pointer select-none pl-0.5'
          onClick={onSelectObject}
          onDoubleClick={changeName}
        >
          {prop.om.name}
        </div>
        <div className='float-right inline-block cursor-pointer align-middle text-sm' onClick={() => changeVisible()}>
          {visibleIcon}
        </div>
      </div>
    </>
  );
};

export const HierarchyTree = memo(_HierarchyTree);
