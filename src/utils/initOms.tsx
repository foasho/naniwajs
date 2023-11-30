import { IObjectManagement } from "@ninjagl/core";
import { Euler, MathUtils, Vector3 } from "three";

export const initThirdPersonTemplate = (): IObjectManagement[] => {
  return [
    {
      id: MathUtils.generateUUID(),
      name: 'player',
      type: 'avatar',
      args: {
        type: 'avatar',
        url: '/models/ybot.glb',
        position: new Vector3(0, 0, 0),
        castShadow: true,
        animationLoop: true,
      },
      physics: false,
      phyType: "capsule",
      visibleType: "force",
      visible: true,
    },
    {
      id: MathUtils.generateUUID(),
      name: 'box01',
      type: 'three',
      args: {
        type: 'box',
        position: new Vector3(-5, 0.5, 5),
        scale: new Vector3(1, 1, 1),
        materialData: {
          type: 'standard',
          value: '#4785FF',
        },
        castShadow: true,
        receiveShadow: true,
      },
      physics: true,
      phyType: 'box',
      visibleType: 'auto',
      visible: true,
    },
    {
      id: MathUtils.generateUUID(),
      name: 'wall01',
      type: 'three',
      args: {
        type: 'box',
        position: new Vector3(0, 2, 16),
        scale: new Vector3(32, 4, 0.2),
        materialData: {
          type: 'standard',
          value: '#111212',
        },
        castShadow: true,
        receiveShadow: true,
      },
      physics: true,
      phyType: 'box',
      visibleType: 'auto',
      visible: true,
    },
    {
      id: MathUtils.generateUUID(),
      name: 'Directional1',
      type: 'light',
      args: {
        type: 'directional',
        position: new Vector3(14, 7, 8),
        materialData: {
          type: 'standard',
          value: '#e3dfcc',
        },
        intensity: 1,
        castShadow: true,
      },
      physics: false,
      phyType: 'box',
      visibleType: 'auto',
      visible: true,
    },
    {
      id: MathUtils.generateUUID(),
      name: 'Spot1',
      type: 'light',
      args: {
        type: 'spot',
        position: new Vector3(-6, 10, -22),
        materialData: {
          type: 'standard',
          value: '#FDF1D9',
        },
        intensity: 1,
        castShadow: true,
        receiveShadow: true,
      },
      physics: false,
      phyType: 'box',
      visibleType: 'auto',
      visible: true,
    },
    {
      id: MathUtils.generateUUID(),
      name: 'floor',
      type: 'three',
      args: {
        type: 'plane',
        position: new Vector3(0, 0, 0),
        rotation: new Euler(-Math.PI / 2, 0, 0),
        scale: new Vector3(32, 32, 32),
        materialData: {
          type: 'reflection',
          value: '#111212',
        },
        castShadow: true,
        receiveShadow: true,
      },
      physics: true,
      phyType: 'box',
      visibleType: 'auto',
      visible: true,
    },
    {
      id: MathUtils.generateUUID(),
      name: 'Environment',
      type: 'environment',
      args: {
        preset: 'sunset',
        blur: 0.7,
        background: true,
      },
      physics: false,
      phyType: 'box',
      visibleType: 'auto',
      visible: true,
    },
    {
      id: MathUtils.generateUUID(),
      name: '*LF (rect)',
      type: 'lightformer',
      args: {
        form: 'rect',
        color: '#ffeb38',
        intensity: 1,
        position: new Vector3(-5, 5, -5),
        scale: new Vector3(3, 3, 3),
        lookAt: new Vector3(0, 0, 0),
        isFloat: true,
      },
      physics: false,
      phyType: 'box',
      visibleType: 'auto',
      visible: true,
    },
    {
      id: MathUtils.generateUUID(),
      name: '*LF (ring)',
      type: 'lightformer',
      args: {
        form: 'ring',
        color: '#e60b0b',
        intensity: 10,
        position: new Vector3(10, 5, 10),
        scale: new Vector3(3, 3, 3),
        lookAt: new Vector3(0, 0, 0),
        isFloat: true,
      },
      physics: false,
      phyType: 'box',
      visibleType: 'auto',
      visible: true,
    }
  ];
}