"use client"

import * as THREE from "three"
import {BakeShadows, OrbitControls, PerspectiveCamera, Stats} from '@react-three/drei'
import {Canvas, useFrame, useLoader} from "@react-three/fiber";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import React, {useEffect, useRef} from "react";
import {AnimationMixer, Mesh} from "three";
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'
import { easing } from 'maath'
const BG = () => {
    const renderer = new THREE.WebGLRenderer();
    const gltf = useLoader(GLTFLoader, "/models/muse_the_dark_side/scene.gltf")
    const mesh = useRef<Mesh>(null!);
    useEffect(() => {
        gltf.scene.traverse((object:any) => {
            gltf.scene.position.set(-2,10, 10)
            gltf.scene.rotation.set(0.1,-1.5,0.7)
            object.castShadow = true;
            object.reciveShadow = true;
            object.material?object.material.envMapIntensity=20:null;
            object.material?object.material.transparent=true:null;
            object.material?object.material.format = THREE.RGBAFormat:null;
        })
        const mixer = new AnimationMixer(gltf.scene);
        const clip = gltf.animations[0]
        const action = mixer.clipAction(clip)

        const clock = new THREE.Clock();
        function animate() {
            if(mixer)
                mixer.update(clock.getDelta());
        }
        renderer.setAnimationLoop(animate);
        action.play()
    }, [gltf]);
    return (
        <mesh ref={mesh} castShadow receiveShadow>
            <primitive object={gltf.scene} />
        </mesh>
    )
}
const BackgroundTablePageComponent = ({ ...props }) => {
    return (
        <div className="fixed w-full h-full top-0 left-0 z-[-1]">
            <Canvas shadows dpr={[1, 1.5]} camera={{ position: [-1,15,15], fov: 45, near: 1, far: 40 }}>
                <pointLight position={[-2, 25, 10]} />
                <color attach="background" args={['#000']} />
                <hemisphereLight name="Default Ambient Light" intensity={0.2} color="#fff" />
                <BG/>
                <EffectComposer disableNormalPass>
                    <Bloom luminanceThreshold={0} mipmapBlur luminanceSmoothing={0.0} intensity={6} />
                    <DepthOfField target={[0, 0, 1]} focalLength={0.3} bokehScale={1} height={700} />
                </EffectComposer>
                {/*ts-ignore*/}
                <CameraRig />
                {/* Small helper that freezes the shadows for better performance */}
                <BakeShadows />
            </Canvas>
        </div>
    )
}
const CameraRig = () => {
    useFrame((state, delta) => {
        easing.damp3(state.camera.position, [-1 + (state.pointer.x * state.viewport.width) / 3, (1 + state.pointer.y) / 2, 5.5], 0.5, delta)
        state.camera.lookAt(-1,15,15)
    })
    return <></>
}
export default BackgroundTablePageComponent;