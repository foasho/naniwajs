import "./Locale";
import styles from "@/App.module.scss";
import { PlayerEditor } from "@/editor/ViewPort/PlayerEditor";
import { MainViewer } from "@/editor/ViewPort/MainViewer";
import { NinjaEditorContext, NinjaEditorManager } from "@/editor/NinjaEditorManager";
import { useState, useEffect, useContext, useRef, createContext } from "react";
import { MathUtils } from "three";
import { ContentsBrowser, ContentViewer } from "./Hierarchy/ContentViewer";
import { ScriptEditor } from "./ViewPort/ScriptEditor";
import { AiFillHome, AiFillSave, AiOutlineAppstore, AiOutlineCode, AiOutlineHighlight, AiOutlinePicture, AiOutlinePlus } from "react-icons/ai";
import { TerrainMaker } from "./ViewPort/TerrainMaker";
import { TerrainInspector } from "./Inspector/TerrainInspector";
import { MainViewInspector } from "./Inspector/MainViewInspector";
import { HierarchyTree } from "./Hierarchy/HierarchyTree";
import { BsPlay, BsStop } from "react-icons/bs";
import Swal from "sweetalert2";
import { showSelectNewObjectDialog } from "./Dialogs/SelectNewObjectDialog";
import { PlayerInspector } from "./Inspector/PlayerInspector";
import { ShaderEditor } from "./ViewPort/ShaderEditor";
import { DebugPlay } from "./ViewPort/DebugPlay";
import { UINavigation } from "./Hierarchy/UINavigation";
import { useTranslation } from "react-i18next";
import { NJCFile, saveNJCFile } from "@/core/utils/NinjaFileControl";
import { loadNJCFile } from "@/core/utils/NinjaFileControl";
import { BiEditAlt } from "react-icons/bi";
import { useSnapshot } from "valtio";
import { globalStore } from "./Store";
import { ScriptNavigation } from "./Hierarchy/ScriptNavigation";
import { ShaderNavigation } from "./Hierarchy/ShaderNavigation";
import { TextureNavigation } from "./Hierarchy/TextureNavigation";

/**
 * NinjaEngineメインコンポネント
 */
export const NinjaEditor = () => {
  const state = useSnapshot(globalStore);
  const editor = useContext(NinjaEditorContext);
  const [projectName, setProjectName] = useState<string>();
  const [viewSelect, setViewSelect] = useState<"mainview" | "debugplay" | "terrainmaker" | "playereditor" | "scripteditor" | "shadereditor">("mainview");
  const [selectSubNav, setSelectSubNav] = useState<"ui" | "shader" | "script" | "texture">("ui");
  const [showFileMenu, setShowFileMenu] = useState<boolean>(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [projectFiles, setProjectFiles] = useState<{name: string; path: string}[]>([]);
  const [scriptPath, setScriptPath] = useState<string>();
  const { t, i18n } = useTranslation();

  const changeView = (viewType: "mainview" |"debugplay" | "terrainmaker" | "playereditor" | "scripteditor" | "shadereditor") => {
    if (viewSelect !== viewType) {
      globalStore.init();
      setViewSelect(viewType);
      if (viewType == "scripteditor"){
        setSelectSubNav("script");
      }
      else if (viewType == "shadereditor"){
        setSelectSubNav("shader");
      }
    }
  }

  /**
   * 新しいオブジェクトを追加する
   */
  const onClickNewObject = async () => {
    const data = await showSelectNewObjectDialog();
    if (data.type == "light"){
      editor.setOM(
        {
          id: MathUtils.generateUUID(),
          name: `*${data.value}`,
          type: "light",
          args: {
            type: data.value,
            castShadow: true,
            receiveShadow: false,
          },
          physics: "none",
          visibleType: "auto",
        }
      )
    }
    else if (data.type == "sky"){
      editor.setOM(
        {
          id: MathUtils.generateUUID(),
          name: `*${data.value}`,
          type: "sky",
          args: {
            type: data.value
          },
          physics: "none",
          visibleType: "auto",
        }
      )
    }
    else if (data.type == "sound"){
      // editor.setObjectManagement(
      //   {
      //     id: generateUUID(),
      //     name: `*${data.value}`,
      //     type: "sound",
      //     args: {
      //       type: data.value
      //     },
      //     physics: "none",
      //     visibleType: "auto",
      //   }
      // )
    }
    else if (data.type == "three"){
      editor.setOM(
        {
          id: MathUtils.generateUUID(),
          name: `*${data.value}`,
          type: "three",
          args: {
            type: data.value
          },
          physics: "none",
          visibleType: "auto",
        }
      );
    }
    else if (data.type == "camera"){
      editor.setOM(
        {
          id: MathUtils.generateUUID(),
          name: `*${data.value}`,
          type: "camera",
          args: {
            type: data.value
          },
          physics: "none",
          visibleType: "auto",
        }
      )
    }
    else if (data.type == "fog"){
      editor.setOM(
        {
          id: MathUtils.generateUUID(),
          name: `*${data.value}`,
          type: "fog",
          args: {
            type: data.value
          },
          physics: "none",
          visibleType: "auto",
        }
      )
    }
  }

  /**
   * 言語選択
   */
  const onClickSelectLang = () => {
    if (i18n.language == "ja"){
      i18n.changeLanguage("en");
    }
    else if (i18n.language == "en"){
      i18n.changeLanguage("ja");
    }
  }

  /**
   * テンプレート選択
   */
  const onClickSelectTemplate = () => {
    Swal.fire(
      t("attention").toString(), 
      t("templatePrepare").toString()
    );
  }

  /**
   * プレイモードと編集モードの切り替え
   */
  const onPlayStop = () => {
    if (viewSelect == "debugplay"){
      setViewSelect("mainview");
    }
    else {
      setViewSelect("debugplay");
    }
  }

  /**
   * JSScriptで特定のスクリプトを開く
   */
  const changeScriptEditor = () => {
    setViewSelect("scripteditor");
    setSelectSubNav("script");
  }

  /**
   * プロジェクト名を保存
   */
  const changeProjectName = () => {
    Swal.fire({
      title: t("changeProjectName").toString(),
      input: 'text',
      showCancelButton: true,
      confirmButtonText: t("change").toString(),
      showLoaderOnConfirm: true,
      preConfirm: async (inputStr) => {
        if (inputStr.length === 0) {
          return Swal.showValidationMessage(t("leastInput"));
        }
        return inputStr;
      },
      allowOutsideClick: function () {
        return !Swal.isLoading();
      }
    }).then((result) => {
      if (result.value) {
        setProjectName(result.value);
      }
    });
  };
  

  /**
   * プロジェクト全体を保存
   * ビルド処理
   */
  const onSave = () => {
    const njcFile = new NJCFile();
    editor.getOMs().map((om) => {
      njcFile.addOM({...om});
    });
    editor.getUMs().map((um) => {
      njcFile.addUM({...um});
    });
    editor.getSMs().map((sm) => {
      njcFile.addSM({...sm});
    });
    if (!projectName){
      Swal.fire({
        title: t("inputProjectName").toString(),
        input: 'text',
        showCancelButton: true,
        confirmButtonText: t("change").toString(),
        showLoaderOnConfirm: true,
        preConfirm: async (inputStr: string) => {
          //バリデーションを入れたりしても良い
          if (inputStr.length == 0) {
            return Swal.showValidationMessage(t("leastInput"));
          }
          return inputStr;
        },
        allowOutsideClick: function () {
          return !Swal.isLoading();
        }
      }).then((result) => {
        if (result.value) {
          setProjectName(result.value);
          saveNJCFile(njcFile, `${result.value}.njc`);
        }
      });
    }
    else {
      saveNJCFile(njcFile, `${projectName}.njc`);
    }
  }

  /**
   * ファイルメニューを開く
   */
  const openFileMenu = () => {
    setShowFileMenu(!showFileMenu);
  }
  const handleFileMenuLeave = () => {
    setShowFileMenu(false);
  };
  const handleRecentProjectsHover = () => {
    setShowSubMenu(true);
  };
  const handleSubMenuMouseLeave = () => {
    setShowSubMenu(false);
  };

  const openProject = async () => {
    const input: HTMLInputElement = document.createElement('input');
    input.type = 'file';
    input.accept = '.njc'; // NJCの拡張子を指定
    input.onchange = async (event) => {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      if (files && files.length > 0){
        const file = (target.files as FileList)[0];
        const njcFile = await loadNJCFile(file);
        console.log("### ロードしたnjcFileを確認 ###");
        console.log(njcFile);
        editor.setNJCFile(njcFile);
      }
    };
    input.click();
  }
  

  return (
    <>
      <div className={styles.editor}>
        <div className={styles.appBar}>
          <ul className={styles.nav}>
            <li className={`${styles.navItem} ${styles.left}`}>
              <a onClick={() => openFileMenu()}>{t("file")}</a>
            </li>
            <li className={`${styles.navItem} ${styles.left}`}>
              <a onClick={() => onClickSelectLang()}>{t("lang")}</a>
            </li>
            <li className={`${styles.navItem} ${styles.left}`}>
              <a onClick={() => window.open("https://github.com/foasho/NinjaGL", "_blank")}>
                Github
              </a>
            </li>
            <li className={`${styles.navItem} ${styles.left}`}>
              <a onClick={() => onClickSelectTemplate()}>{t("template")}</a>
            </li>
            <li className={`${styles.navCenter}`}>
              <a className={styles.item}>
                NinjaGL
              </a>
              <a className={styles.projectName} onClick={() => {changeProjectName()}}>
                {projectName? projectName: <><BiEditAlt/>{t("nontitle")}</>}
              </a>
            </li>
            <li className={`${styles.navItem} ${styles.right}`}>
              <a className={styles.save} onClick={() => onSave()}>
                <span className={styles.icon}>
                  <AiFillSave />
                </span>
                Save
              </a>
            </li>
            <li className={`${styles.navItem} ${styles.right}`}>
              <a className={styles.play} onClick={() => onPlayStop()}>
                <span className={styles.icon}>
                  {viewSelect == "debugplay"? <><BsStop /></>: <><BsPlay /></>}
                </span>
                  {viewSelect == "debugplay"? <>Stop</>: <>Play</>}
                
              </a>
            </li>
          </ul>
          {showFileMenu &&
          <div className={styles.filemenu}>
            <ul onMouseLeave={() => handleFileMenuLeave()}>
              <li><a>{t("newProject")}</a></li>
              <li><a onClick={() => openProject()}>{t("open")}</a></li>
              <li onMouseEnter={() => handleRecentProjectsHover()} onMouseLeave={() => handleSubMenuMouseLeave()}>
                <a>{t("recentProjects")}</a>
                {showSubMenu &&
                <ul className={styles.subMenu} onMouseLeave={() => handleSubMenuMouseLeave()}>
                  {projectFiles.map((pf => {
                    return (
                      <li>
                        <a>{pf.name}</a>
                        <a>{pf.path}</a>
                      </li>
                    )
                  }))}
                  {projectFiles.length == 0 && 
                    <li>
                      <a>{t("noRecentData")}</a>
                    </li>
                  }
                </ul>
                }
              </li>
              <li><a>{t("help")}</a></li>
            </ul>
          </div>
          }
        </div>
        <div className={styles.mainContents}>
          <div className={styles.hierarchy}>
            <div className={styles.hierarchyArea}>
              <div className={styles.hierarchyTree}>
                <HierarchyTree />
              </div>
            </div>
            <div className={styles.subNavArea}>
              <div className={styles.subSelect}>
                <div className={`${styles.navItem} ${selectSubNav == "ui" && styles.active}`} onClick={() => setSelectSubNav("ui")}>
                  <span className={styles.icon}>
                    <AiOutlineAppstore />
                  </span>
                </div>
                <div className={`${styles.navItem} ${selectSubNav == "script" && styles.active}`} onClick={() => setSelectSubNav("script")}>
                  <span className={styles.icon}>
                    <AiOutlineCode />
                  </span>
                </div>
                <div className={`${styles.navItem} ${selectSubNav == "shader" && styles.active}`} onClick={() => setSelectSubNav("shader")}>
                  <span className={styles.icon}>
                    <AiOutlineHighlight />
                  </span>
                </div>
                <div className={`${styles.navItem} ${selectSubNav == "texture" && styles.active}`} onClick={() => setSelectSubNav("texture")}>
                  <span className={styles.icon}>
                    <AiOutlinePicture />
                  </span>
                </div>
              </div>
              <div className={styles.subNav}>
                {selectSubNav == "ui" &&
                  <UINavigation />
                }
                {selectSubNav == "script" &&
                  <ScriptNavigation/>
                }
                {selectSubNav == "shader" &&
                  <ShaderNavigation/>
                }
                {selectSubNav == "texture" &&
                  <TextureNavigation/>
                }
              </div>
            </div>
            <div className={styles.contentsbrowser}>
              <ContentsBrowser changeScriptEditor={changeScriptEditor} />
            </div>
            <div className={styles.createObj} onClick={() => onClickNewObject()}>
              <div className={styles.title}>
                <span className={styles.icon}>
                  <AiOutlinePlus />
                </span>
                <span className={styles.name}>
                  {t("newObject")}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.contents}>
            <div className={styles.viewselect}>
              <div className={styles.select}>
                <a
                  onClick={() => changeView("mainview")}
                  style={viewSelect == "mainview" ? { background: '#fff', color: "#838383" } : {}}
                >
                  {t("mainView")}
                </a>
                <a
                  onClick={() => changeView("debugplay")}
                  style={viewSelect == "debugplay" ? { background: '#fff', color: "#838383" } : {}}
                >
                  {t("debugPlay")}
                </a>
                <a
                  onClick={() => changeView("terrainmaker")}
                  style={viewSelect == "terrainmaker" ? { background: '#fff', color: "#838383" } : {}}
                >
                  {t("terrainMaker")}
                </a>
                <a
                  onClick={() => changeView("playereditor")}
                  style={viewSelect == "playereditor" ? { background: '#fff', color: "#838383" } : {}}
                >
                 {t("playerEditor")}
                </a>
                <a
                  onClick={() => changeView("scripteditor")}
                  style={viewSelect == "scripteditor" ? { background: '#fff', color: "#838383" } : {}}
                >
                  {t("scriptEditor")}
                </a>
                <a
                  onClick={() => changeView("shadereditor")}
                  style={viewSelect == "shadereditor" ? { background: '#fff', color: "#838383" } : {}}
                >
                  {t("shaderEditor")}
                </a>
              </div>
            </div>
            <div className={styles.viewport}>
              {viewSelect == "mainview" &&
               <>
                <MainViewer />
               </>
              }
              {viewSelect == "debugplay" &&
                <>
                  <DebugPlay />
                </>
              }
              {viewSelect == "terrainmaker" &&
                <>
                  <TerrainMaker />
                </>
              }
              {viewSelect == "playereditor" &&
                <>
                  <PlayerEditor />
                </>
              }
              {viewSelect == "scripteditor" &&
                <>
                  <ScriptEditor />
                </>
              }
              {viewSelect == "shadereditor" &&
                <>
                  <ShaderEditor />
                </>
              }
            </div>

          </div>
          <div 
            className={styles.inspector}
            style={{
              display: ((viewSelect == "mainview" && state.currentId))?"block": "none",
            }}
          >
            {(viewSelect == "mainview") &&
              <>
                <MainViewInspector />
              </>
            }
            {viewSelect == "scripteditor" &&
              <>
              </>
            }
            {viewSelect == "terrainmaker" &&
              <>
                <TerrainInspector />
              </>
            }
            {viewSelect == "playereditor" &&
              <>
                <PlayerInspector/>
              </>
            }
          </div>
        </div>
        <div className={styles.userScript}>

        </div>
        <div id="myDialog"></div>
      </div>
    </>
  )
}