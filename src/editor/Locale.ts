import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      lang: "Lang(EN)",
      template: "Templates",
      mainView: "MainView",
      debugPlay: "DebugPlay",
      terrainMaker: "TerrainMaker",
      playerEditor: "PlayerEditor",
      scriptEditor: "ScriptEditor",
      shaderEditor: "ShaderEditor",
      objects: "Objects",
      uiNavigator: "UI-Navigator",
      contentsBrowser: "ContentsBrowser",
      position: "Position",
      rotation: "Rotation",
      scale: "Scale",
      newObject: "Create Object",
      materialConfig: "Material",
      type: "Type",
      color: "Color",
      completeSave: "Saved!",
      confirmSave: "Save?",
      filename: "FileName",
      size: "Size",
      tooLarge: "Value too large",
      inputFileName: "Input FileName",
      leastInput: "Please enter at least 1 character",
      change: "Change",
      mode: "Mode",
      view: "View",
      edit: "Edit",
      brushType: "BrushType",
      brushNormal: "Sculpt",
      brushFlat: "Flat",
      brushPaint: "Paint",
      wireFrame: "WireFrame",
      brushStrength: "Brush Strength",
      brushRange: "Brush Range",
      resolution: "Resolution",
      updateTerrain: "Update Terrain Size",
      saveTerrain: "Save Terrain",
      isPhysics: "Use Physics",
      isLoD: "Use LoD",
      checkLoD: "Confirm LoD Model",
      changeName: "Change Name",
      nonNameUI: "Untitled UI",
      nonNameObject: "Untitled Object",
      nonNameLight: "Untitled Light",
      nonNameSky: "Untitled Sky",
      nonNameScript: "Untitled ScriptFile",
      nonNameShader: "Untitled ShadarFile",
      select: "Select",
      lift: "Lift",
      uploadGLTF: "Select avatar model or \
              Drag and drop any GLTF \
              please upload",
      errorDebugPlay: "Please set the minimum avatar and terrain.",
      animations: "Animations",
      motionSelect: "Motion Select",
      idle: "Idle",
      walk: "Walk",
      run: "Run",
      jump: "Jump",
      action: "Action",
      addAction: "Add Action",
      saveAvatar: "Save Avatar",
      lodCheckTitle: "Confirmation of LoD model",
      addSelectObject: "Add Select Object",
      light: "Light",
      sky: "Sky",
      audio: "Audio",
      object3d: "3D\nObject",
      ui: "UI",
      blueSky: "Blue Sky",
      box: "Box",
      sphere: "Sphere",
      plane: "Plane",
      cylinder: "Cylinder",
      capsule: "Capsule",
      nowLoading: "Now Loading...",
      castshadow: "CastShadow",
      receiveshadow: "ReceiveShadow",
      attention: "Attention",
      templatePrepare: "The game template is currently being prepared.",
      visibleType: "VisibleType",
      autoScaling: "AutoScaling",
      visibleNone: "None",
      visibleForce: "Force",
      helper: "HelperLine",
      file: "File",
      newProject: "New Project",
      open: "Open...",
      recentProjects: "Recent Projects",
      help: "Help",
      noRecentData: "None...",
      nontitle: "NonTitle",
      changeProjectName: "Change Project Name",
      inputProjectName: "Input Project Name",
      touchController: "Touch Controller",
      aabb: "AABB",
      along: "Along Shape",
    }
  },
  ja: {
    translation: {
      lang: "言語(JP)",
      template: "テンプレート",
      mainView: "メインビュー",
      debugPlay: "デバッグプレイ",
      terrainMaker: "地形メーカー",
      playerEditor: "プレイヤーエディタ",
      scriptEditor: "スクリプトエディタ",
      shaderEditor: "シェーダエディタ",
      objects: "オブジェクト一覧",
      uiNavigator: "UIナビゲータ",
      contentsBrowser: "コンテンツブラウザ",
      position: "位置",
      rotation: "回転",
      scale: "スケール",
      newObject: "新しいオブジェクト",
      materialConfig: "マテリアル設定",
      type: "種別",
      color: "色",
      completeSave: "保存しました!",
      confirmSave: "保存しますか？",
      filename: "ファイル名",
      size: "サイズ",
      tooLarge: "値が大きすぎます",
      inputFileName: "ファイル名を入れてください",
      leastInput: "最低1文字以上いれてください",
      change: "変更",
      mode: "モード",
      view: "表示",
      edit: "編集",
      brushType: "ブラシ種別",
      brushNormal: "通常",
      brushFlat: "平坦化",
      brushPaint: "ペイント",
      wireFrame: "ワイヤーフレーム",
      brushStrength: "ブラシの強さ",
      brushRange: "ブラシの範囲",
      resolution: "解像度",
      updateTerrain: "地形サイズの更新",
      saveTerrain: "地形モデルの保存",
      isPhysics: "物理判定の有無",
      isLoD: "LoD対応の有無",
      checkLoD: "LoDモデルの確認",
      changeName: "名前の変更",
      nonNameUI: "名称未設定UI",
      nonNameObject: "名称未設定オブジェクト",
      nonNameLight: "名称未設定ライト",
      nonNameSky: "名称未設定 空",
      nonNameScript: "* 名称未設定スクリプト",
      nonNameShader: "* 名称未設定シェーダ",
      select: "選択",
      lift: "解除",
      uploadGLTF: "アバターモデルの選択もしくは\
        ドラッグ＆ドロップで任意のGLTFを\
        アップロードしてください",
      errorDebugPlay: "最低限アバターと地形をセットしてください。",
      animations: "アニメーション一覧",
      motionSelect: "モーションの割り当て",
      idle: "静止時",
      walk: "歩く",
      run: "走る",
      jump: "ジャンプ",
      action: "アクション",
      addAction: "アクションの追加",
      saveAvatar: "アバターを保存",
      lodCheckTitle: "LoD化されたモデルの確認",
      addSelectObject: "追加するオブジェクト選択",
      light: "光源",
      sky: "空",
      audio: "音源",
      object3d: "3D\nオブジェクト",
      ui: "UI",
      blueSky: "青空",
      uploadAudio: "音源をアップロード\
        もしくは、\
        コンテンツブラウザから\
        ドラッグ＆ドロップ",
      box: "立方体",
      sphere: "球体",
      plane: "平面",
      cylinder: "円柱",
      capsule: "カプセル",
      nowLoading: "ロード中...",
      castshadow: "CastShadow",
      receiveshadow: "ReceiveShadow",
      attention: "注意",
      templatePrepare: "現在ゲームテンプレート準備中",
      visibleType: "描画種別",
      autoScaling: "オートスケール",
      visibleNone: "表示しない",
      visibleForce: "強制表示",
      helper: "補助線",
      file: "ファイル",
      newProject: "新しいプロジェクト",
      open: "開く...",
      recentProjects: "最近開いたプロジェクト",
      help: "ヘルプ",
      noRecentData: "No Data",
      nontitle: "名称未設定",
      changeProjectName: "プロジェクト名を変更",
      inputProjectName: "プロジェクト名を入力",
      touchController: "タッチコントローラ",
      aabb: "AABB",
      along: "形状に沿う",
    }
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: "ja",
  keySeparator: false,
  interpolation: {
    escapeValue: false
  }
});

export default i18n;