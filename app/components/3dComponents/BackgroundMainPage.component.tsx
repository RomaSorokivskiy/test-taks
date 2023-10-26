"use client"

import * as THREE from "three"
import {OrbitControls, PerspectiveCamera} from '@react-three/drei'
import {Canvas, useLoader} from "@react-three/fiber";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {useEffect, useRef} from "react";
import {AnimationMixer, Mesh} from "three";
const BG = () => {
    const renderer = new THREE.WebGLRenderer();
    const gltf = useLoader(GLTFLoader, "/models/lost_robot/scene.gltf")
    const mesh = useRef<Mesh>(null!);
    gltf.scene.traverse((object:any) => {
        gltf.scene.position.set(0,-40, 0)
        object.castShadow = true;
        object.reciveShadow = true;
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
const BackgroundMainPageComponent = ({ ...props }) => {

    return (
        <div className="absolute w-full h-full top-0 left-0 z-[-1]">
            <Canvas shadows>
                <color attach="background" args={['#ffffff']} />
                <ambientLight intensity={0.5}/>
                <spotLight intensity={0.6} position={[4, 4, 4]} angle={0.5} penumbra={1} />
                <PerspectiveCamera makeDefault fov={50}  position={[0,50,100]}/>
                <hemisphereLight name="Default Ambient Light" intensity={1} color="#fff" />
                <OrbitControls
                    target={[0,0,0]}
                    enablePan={false}
                    minAzimuthAngle={-0.01}
                    maxAzimuthAngle={0.01}
                    minPolarAngle={1}
                    maxPolarAngle={-1}
                    enableZoom={false}
                />
                <BG/>
            </Canvas>
        </div>
    )
}
export default BackgroundMainPageComponent;