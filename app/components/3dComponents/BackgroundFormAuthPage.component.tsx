"use client"

import * as THREE from "three"
import {OrbitControls, PerspectiveCamera} from '@react-three/drei'
import {Canvas, useLoader} from "@react-three/fiber";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {useEffect, useRef} from "react";
import {AnimationMixer, Mesh} from "three";

const BG = () => {
    const renderer = new THREE.WebGLRenderer();
    const gltf = useLoader(GLTFLoader, "/models/portal_night_version/scene.gltf")
    const mesh = useRef<Mesh>(null!);
    gltf.scene.traverse((object:any) => {
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(0,-100,0)
        gltf.scene.rotation.set(0,1.5,0)
        object.castShadow = true;
        object.reciveShadow = true;
        object.receiveShadow = true;
        object.material?object.material.alphaHash = true:null;
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
    return (
        <mesh ref={mesh}>
            <primitive object={gltf.scene} />
        </mesh>
    )
}
const BackgroundFormAuthPageComponent = () => {
    return (
        <div className="w-[700px] top-0 left-0 z-[-1]">
            <Canvas className="rounded-tl-2xl rounded-bl-2xl" shadows>
                <ambientLight intensity={1}/>
                <spotLight intensity={1} position={[150,320,210]} angle={0.5} penumbra={1} />
                <PerspectiveCamera makeDefault fov={90} position={[0,70,80]}/>
                <hemisphereLight name="Default Ambient Light" intensity={1} color="#fff" />
                <OrbitControls
                    target={[0,0,0]}
                    enablePan={false}
                    minAzimuthAngle={-0.01}
                    maxAzimuthAngle={0.01}
                    minPolarAngle={1.25}
                    maxPolarAngle={-1}
                    enableZoom={false}
                />
                <BG/>
            </Canvas>
        </div>
    )
}
export default BackgroundFormAuthPageComponent