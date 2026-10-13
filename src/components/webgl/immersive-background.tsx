"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type SceneSignals = {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  progress: React.MutableRefObject<number>;
  velocity: React.MutableRefObject<number>;
  chapter: React.MutableRefObject<number>;
  reducedMotion: boolean;
  compact: boolean;
};

const chapters = [
  { id: "top", number: "00", label: "System overview" },
  { id: "about", number: "01", label: "Design intent" },
  { id: "skills", number: "02", label: "Capability map" },
  { id: "projects", number: "03", label: "Selected systems" },
  { id: "experience", number: "04", label: "Engineering journey" },
  { id: "education", number: "05", label: "Foundations" },
  { id: "impact", number: "06", label: "Milestones" },
  { id: "articles", number: "07", label: "Field notes" },
  { id: "contact", number: "08", label: "Open channel" },
] as const;

const modules = [
  { id: "client", position: [-2.75, 1.45, 0.05], scale: [1.45, 0.16, 0.86], color: "#2563eb" },
  { id: "gateway", position: [0, 1.45, -0.25], scale: [1.25, 0.16, 0.78], color: "#0284c7" },
  { id: "inference", position: [2.75, 1.45, -0.55], scale: [1.55, 0.18, 0.9], color: "#7c3aed" },
  { id: "telemetry", position: [-2.75, -1.45, -0.45], scale: [1.25, 0.14, 0.72], color: "#0ea5e9" },
  { id: "data", position: [0, -1.45, -0.15], scale: [1.35, 0.18, 0.84], color: "#2563eb" },
  { id: "deploy", position: [2.75, -1.45, -0.8], scale: [1.35, 0.15, 0.76], color: "#6366f1" },
] as const;

const links = [
  [-2.75, 1.45, 0.05, 0, 1.45, -0.25],
  [0, 1.45, -0.25, 2.75, 1.45, -0.55],
  [0, 1.45, -0.25, 0, -1.45, -0.15],
  [2.75, 1.45, -0.55, 2.75, -1.45, -0.8],
  [0, -1.45, -0.15, -2.75, -1.45, -0.45],
  [-2.75, -1.45, -0.45, -2.75, 1.45, 0.05],
] as const;

function CameraRig({ pointer, progress, velocity, chapter, reducedMotion, compact }: SceneSignals) {
  const smoothed = useRef(0);
  const focus = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const camera = state.camera;
    smoothed.current = THREE.MathUtils.damp(smoothed.current, progress.current, reducedMotion ? 20 : 2.35, delta);
    const p = smoothed.current;
    const px = reducedMotion || compact ? 0 : pointer.current.x;
    const py = reducedMotion || compact ? 0 : pointer.current.y;
    const orbit = p * Math.PI * 2.35;
    const chapterBias = (chapter.current - 4) * 0.08;
    const speedPush = reducedMotion ? 0 : Math.min(Math.abs(velocity.current), 1) * 0.28;
    const targetX = compact ? 0.95 : Math.cos(orbit) * 2.15 + chapterBias + px * 0.34;
    const targetY = compact ? 0.18 : 0.28 + Math.sin(orbit * 0.72) * 0.72 + py * 0.22;
    const targetZ = (compact ? 11.7 : 9.8) - Math.sin(p * Math.PI * 3) * 1.05 - speedPush;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 2.8, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 2.8, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 2.8, delta);
    focus.set(compact ? 1.1 : Math.sin(orbit * 0.55) * 0.7, Math.cos(orbit) * 0.14, -0.55);
    camera.lookAt(focus);
  });

  return null;
}

function Chip({ position, color, scale = [0.55, 0.08, 0.34] }: { position: [number, number, number]; color: string; scale?: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh scale={scale}>
        <boxGeometry />
        <meshStandardMaterial color="#dbeafe" emissive={color} emissiveIntensity={0.14} metalness={0.5} roughness={0.24} />
      </mesh>
      <lineSegments scale={[scale[0] * 1.02, scale[1] * 1.2, scale[2] * 1.02]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
        <lineBasicMaterial color={color} transparent opacity={0.82} />
      </lineSegments>
    </group>
  );
}

function RuntimeCore({ progress, velocity, reducedMotion, compact }: SceneSignals) {
  const root = useRef<THREE.Group>(null);
  const pulse = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!root.current || !pulse.current) return;
    const p = progress.current;
    const time = reducedMotion ? 0 : state.clock.elapsedTime;
    const kinetic = reducedMotion ? 0 : Math.min(Math.abs(velocity.current), 1);
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, -0.3 + p * 1.18, 2.6, delta);
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, -0.13 + Math.sin(p * Math.PI * 2) * 0.08, 3, delta);
    root.current.position.x = THREE.MathUtils.damp(root.current.position.x, compact ? 1.2 : Math.cos(p * Math.PI * 2) * 1.65, 2.6, delta);
    root.current.position.y = THREE.MathUtils.damp(root.current.position.y, compact ? 0.1 : Math.sin(p * Math.PI * 2.6) * 0.58, 2.6, delta);
    pulse.current.scale.setScalar(0.82 + (reducedMotion ? 0 : Math.sin(time * 2.2) * 0.035) + kinetic * 0.06);
  });

  return (
    <group ref={root} position={[compact ? 1.3 : 2.45, 0, 0]} scale={compact ? 0.66 : 0.88}>
      <mesh position={[0, -0.14, 0]} scale={[2.25, 0.12, 1.55]}>
        <boxGeometry />
        <meshStandardMaterial color="#94a3b8" emissive="#2563eb" emissiveIntensity={0.06} metalness={0.68} roughness={0.22} transparent opacity={0.78} />
      </mesh>
      <lineSegments position={[0, -0.14, 0]} scale={[2.28, 0.14, 1.58]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
        <lineBasicMaterial color="#334155" transparent opacity={0.62} />
      </lineSegments>
      <mesh position={[0, 0.08, 0]} scale={[1.18, 0.14, 0.82]}>
        <boxGeometry />
        <meshStandardMaterial color="#dbeafe" emissive="#2563eb" emissiveIntensity={0.12} metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh ref={pulse} position={[0, 0.28, 0]} scale={[0.82, 0.82, 0.82]}>
        <boxGeometry args={[1.05, 0.12, 0.7]} />
        <meshStandardMaterial color="#ffffff" emissive="#0284c7" emissiveIntensity={0.24} metalness={0.58} roughness={0.18} />
      </mesh>
      <Chip position={[-1.35, 0.06, 0.72]} color="#0ea5e9" scale={[0.42, 0.07, 0.25]} />
      <Chip position={[1.35, 0.06, 0.72]} color="#7c3aed" scale={[0.42, 0.07, 0.25]} />
      <Chip position={[-1.35, 0.06, -0.72]} color="#2563eb" scale={[0.42, 0.07, 0.25]} />
      <Chip position={[1.35, 0.06, -0.72]} color="#6366f1" scale={[0.42, 0.07, 0.25]} />
      {[-1.55, -1.03, -.51, .01, .53, 1.05, 1.57].map((x, index) => (
        <mesh key={x} position={[x, -0.03, 1.03]} scale={[0.16, 0.035, 0.035]}>
          <boxGeometry />
          <meshBasicMaterial color={index % 3 === 0 ? "#2563eb" : "#94a3b8"} transparent opacity={0.72} />
        </mesh>
      ))}
    </group>
  );
}

function ArchitectureModules({ progress, velocity, reducedMotion, compact }: SceneSignals) {
  const root = useRef<THREE.Group>(null);
  const refs = useRef<Array<THREE.Group | null>>([]);

  useFrame((state, delta) => {
    if (!root.current) return;
    const p = progress.current;
    const time = reducedMotion ? 0 : state.clock.elapsedTime;
    const kinetic = reducedMotion ? 0 : Math.min(Math.abs(velocity.current), 1);
    const expansion = compact ? 0.72 : 0.88 + (Math.sin(p * Math.PI * 3 - 0.35) + 1) * 0.19 + kinetic * 0.08;
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, -0.18 + p * 0.92, 2.6, delta);
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, -0.07 + Math.sin(p * Math.PI * 2) * 0.05, 3, delta);
    refs.current.forEach((node, index) => {
      if (!node) return;
      const blueprint = modules[index];
      const depth = blueprint.position[2] - Math.sin(p * Math.PI * 4 + index * 0.62) * (compact ? 0.22 : 0.92);
      node.position.x = THREE.MathUtils.damp(node.position.x, blueprint.position[0] * expansion, 3.2, delta);
      node.position.y = THREE.MathUtils.damp(node.position.y, blueprint.position[1] * expansion + Math.sin(time * 0.22 + index) * (reducedMotion ? 0 : 0.035), 3.2, delta);
      node.position.z = THREE.MathUtils.damp(node.position.z, depth, 3.2, delta);
      node.rotation.y = THREE.MathUtils.damp(node.rotation.y, (index < 3 ? 1 : -1) * p * 0.1, 3, delta);
    });
  });

  return (
    <group ref={root} scale={compact ? 0.66 : 0.88}>
      {modules.slice(0, compact ? 4 : 6).map((module, index) => (
        <group key={module.id} ref={(node) => { refs.current[index] = node; }} position={module.position}>
          <mesh scale={module.scale}>
            <boxGeometry />
            <meshStandardMaterial color="#bfdbfe" emissive={module.color} emissiveIntensity={0.12} metalness={0.54} roughness={0.24} transparent opacity={0.88} />
          </mesh>
          <lineSegments scale={[module.scale[0] * 1.02, module.scale[1] * 1.3, module.scale[2] * 1.02]}>
            <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
            <lineBasicMaterial color={module.color} transparent opacity={0.82} />
          </lineSegments>
          <mesh position={[-module.scale[0] * 0.72, module.scale[1] * 0.9, module.scale[2] * 0.72]}>
            <sphereGeometry args={[0.055, 10, 10]} />
            <meshBasicMaterial color={module.color} />
          </mesh>
          {[0, 1, 2].map((bar) => (
            <mesh key={bar} position={[-module.scale[0] * 0.22 + bar * 0.32, module.scale[1] * 0.88, module.scale[2] * 0.72]} scale={[0.1 + bar * 0.025, 0.018, 0.018]}>
              <boxGeometry />
              <meshBasicMaterial color={bar === 0 ? module.color : "#94a3b8"} transparent opacity={0.68} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function ConnectionBus({ compact }: { compact: boolean }) {
  const geometry = useMemo(() => {
    const visibleLinks = links.slice(0, compact ? 3 : links.length);
    const positions = new Float32Array(visibleLinks.flat());
    const result = new THREE.BufferGeometry();
    result.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return result;
  }, [compact]);

  return (
    <lineSegments geometry={geometry} scale={compact ? 0.66 : 0.88}>
      <lineBasicMaterial color="#2563eb" transparent opacity={0.58} />
    </lineSegments>
  );
}

function DataPackets({ progress, velocity, reducedMotion, compact }: SceneSignals) {
  const refs = useRef<Array<THREE.Mesh | null>>([]);
  const activeLinks = compact ? links.slice(0, 3) : links;

  useFrame((state) => {
    const scrollImpulse = reducedMotion ? 0 : Math.min(Math.abs(velocity.current), 1) * 1.4;
    const time = reducedMotion ? progress.current * 2 : state.clock.elapsedTime * (0.34 + scrollImpulse) + progress.current * 4.5;
    refs.current.forEach((packet, index) => {
      if (!packet) return;
      const path = activeLinks[index % activeLinks.length];
      const t = (time + index * 0.19) % 1;
      packet.position.set(
        THREE.MathUtils.lerp(path[0], path[3], t),
        THREE.MathUtils.lerp(path[1], path[4], t),
        THREE.MathUtils.lerp(path[2], path[5], t),
      );
    });
  });

  return (
    <group scale={compact ? 0.66 : 0.88}>
      {activeLinks.map((_, index) => (
        <mesh key={index} ref={(node) => { refs.current[index] = node; }}>
          <sphereGeometry args={[0.065, 10, 10]} />
          <meshBasicMaterial color={index % 2 ? "#7c3aed" : "#0284c7"} />
        </mesh>
      ))}
    </group>
  );
}

function EngineeringBackplane({ progress, velocity, reducedMotion, compact }: SceneSignals) {
  const group = useRef<THREE.Group>(null);
  const positions = useMemo(() => {
    const columns = compact ? 10 : 18;
    const rows = compact ? 8 : 12;
    const values = new Float32Array(columns * rows * 3);
    let cursor = 0;
    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        values[cursor++] = (column - (columns - 1) / 2) * 0.66;
        values[cursor++] = (row - (rows - 1) / 2) * 0.52;
        values[cursor++] = -2.4 - ((row + column) % 4) * 0.12;
      }
    }
    return values;
  }, [compact]);

  useFrame((state) => {
    if (!group.current) return;
    const kinetic = reducedMotion ? 0 : Math.min(Math.abs(velocity.current), 1);
    group.current.position.z = -1.2 + Math.sin(progress.current * Math.PI * 3) * 0.72 - kinetic * 0.35;
    group.current.rotation.z = reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.06) * 0.018 + progress.current * 0.08;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#475569" size={compact ? 0.024 : 0.03} transparent opacity={0.32} sizeAttenuation depthWrite={false} />
      </points>
      <gridHelper args={[14, 20, "#94a3b8", "#cbd5e1"]} position={[0, -2.55, -1.5]} />
    </group>
  );
}

function Scene(props: SceneSignals) {
  return (
    <>
      <ambientLight intensity={1.25} color="#f8fafc" />
      <directionalLight position={[4, 6, 7]} intensity={2.2} color="#ffffff" />
      <pointLight position={[3, 2, 4]} intensity={9} color="#38bdf8" distance={13} />
      <pointLight position={[-4, -2, 1]} intensity={5} color="#a78bfa" distance={12} />
      <EngineeringBackplane {...props} />
      <ConnectionBus compact={props.compact} />
      <DataPackets {...props} />
      <ArchitectureModules {...props} />
      <RuntimeCore {...props} />
      <CameraRig {...props} />
    </>
  );
}

export function ImmersiveBackground() {
  const progress = useRef(0);
  const velocity = useRef(0);
  const chapter = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const root = useRef<HTMLDivElement>(null);
  const systemMap = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [compact, setCompact] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactQuery = window.matchMedia("(max-width: 767px)");
    const syncPreferences = () => {
      setReducedMotion(motionQuery.matches);
      setCompact(compactQuery.matches);
    };
    syncPreferences();
    motionQuery.addEventListener("change", syncPreferences);
    compactQuery.addEventListener("change", syncPreferences);

    const movePointer = (event: PointerEvent) => {
      if (event.pointerType === "touch" || motionQuery.matches) return;
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = -(event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", movePointer, { passive: true });

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        progress.current = self.progress;
        velocity.current = THREE.MathUtils.clamp(self.getVelocity() / 1800, -1, 1);
        root.current?.style.setProperty("--scene-progress", self.progress.toFixed(4));
        root.current?.style.setProperty("--scene-shift", `${(self.progress - 0.5) * 18}vw`);
        root.current?.style.setProperty("--scene-glow-opacity", String(0.14 + Math.abs(velocity.current) * 0.12));
        root.current?.style.setProperty("--scene-line-scale", String(0.2 + self.progress * 0.8));
        if (systemMap.current) systemMap.current.style.opacity = String(Math.max(0, 1 - self.progress * 13));
      },
    });
    progress.current = trigger.progress;

    const settleScene = () => {
      velocity.current = 0;
      root.current?.style.setProperty("--scene-glow-opacity", "0.14");
    };
    ScrollTrigger.addEventListener("scrollEnd", settleScene);

    const chapterTriggers = chapters.map((item, index) => {
      const element = document.getElementById(item.id);
      if (!element) return null;
      const activate = () => {
        chapter.current = index;
        setActiveChapter(index);
      };
      return ScrollTrigger.create({ trigger: element, start: "top 58%", end: "bottom 42%", onEnter: activate, onEnterBack: activate });
    });

    const sectionAnimations = motionQuery.matches ? [] : gsap.utils.toArray<HTMLElement>(".section-shell > .section-inner, .contact-section > .section-inner").map((section) => (
      gsap.fromTo(
        section,
        { y: 42, opacity: 0.72, clipPath: "inset(7% 0 0 0)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0 0 0)",
          ease: "none",
          scrollTrigger: { trigger: section, start: "top 92%", end: "top 48%", scrub: 0.85 },
        },
      )
    ));

    return () => {
      trigger.kill();
      chapterTriggers.forEach((chapterTrigger) => chapterTrigger?.kill());
      sectionAnimations.forEach((animation) => {
        animation.scrollTrigger?.kill();
        animation.kill();
      });
      ScrollTrigger.removeEventListener("scrollEnd", settleScene);
      window.removeEventListener("pointermove", movePointer);
      motionQuery.removeEventListener("change", syncPreferences);
      compactQuery.removeEventListener("change", syncPreferences);
    };
  }, []);

  return (
    <div ref={root} className="webgl-background" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [1.45, 0.25, 10.2], fov: 42, near: 0.1, far: 60 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        frameloop={reducedMotion ? "demand" : "always"}
      >
        <fog attach="fog" args={["#e8f2fb", 11, 24]} />
        <Scene progress={progress} velocity={velocity} chapter={chapter} pointer={pointer} reducedMotion={reducedMotion} compact={compact} />
      </Canvas>
      <div className="webgl-background__veil" />
      <div className="webgl-background__cinema" />
      <div ref={systemMap} className="webgl-system-map">
        <span className="webgl-system-map__status"><i />RUNTIME GRAPH / LIVE</span>
        <span className="webgl-system-map__label webgl-system-map__label--client">01 CLIENT UI</span>
        <span className="webgl-system-map__label webgl-system-map__label--api">02 API GATEWAY</span>
        <span className="webgl-system-map__label webgl-system-map__label--model">03 MODEL RUNTIME</span>
        <span className="webgl-system-map__label webgl-system-map__label--data">04 DATA LAYER</span>
      </div>
      <div className="webgl-scene-chapter">
        <span>{chapters[activeChapter].number}</span>
        <strong>{chapters[activeChapter].label}</strong>
      </div>
    </div>
  );
}
