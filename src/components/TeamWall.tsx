import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Html } from '@react-three/drei';
import { Mesh, Vector3 } from 'three';
import { TeamMember } from '../types/team';

interface TeamWallProps {
  member: TeamMember;
  position: [number, number, number];
  onEdit: (member: TeamMember) => void;
}

export function TeamWall({ member, position, onEdit }: TeamWallProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Slow bouncing animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
    }
  });

  const wallColor = member.isCompleted ? '#22c55e' : '#2563eb';
  const glowIntensity = member.isCompleted ? 0.8 : 0.4;

  return (
    <group position={position}>
      {/* Main Wall */}
      <RoundedBox
        ref={meshRef}
        args={[4, 8, 1]} // 4:8:1 ratio as specified
        radius={0.1}
        smoothness={4}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={() => onEdit(member)}
      >
        <meshStandardMaterial
          color={wallColor}
          emissive={wallColor}
          emissiveIntensity={hovered ? glowIntensity * 1.5 : glowIntensity}
          roughness={0.3}
          metalness={0.1}
        />
      </RoundedBox>

      {/* Content Overlay */}
      <Html
        position={[0, 0, 0.51]}
        transform
        occlude
        style={{
          width: '320px',
          height: '640px',
          pointerEvents: hovered ? 'auto' : 'none',
        }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-white">
          {/* Profile Photo */}
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-white/30">
            <img
              src={member.photo}
              alt={member.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=2563eb&color=ffffff&size=150`;
              }}
            />
          </div>

          {/* Name */}
          <h3 className="text-xl font-bold mb-2 text-center">{member.name}</h3>

          {/* Designation */}
          <p className="text-sm opacity-80 mb-4 text-center">{member.designation}</p>

          {/* Task */}
          <div className="bg-black/20 rounded-lg p-3 mb-4 w-full">
            <p className="text-xs font-medium mb-1">Current Task:</p>
            <p className="text-sm">{member.task}</p>
          </div>

          {/* Status */}
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            member.isCompleted 
              ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
              : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
          }`}>
            {member.isCompleted ? 'Completed' : 'In Progress'}
          </div>

          {/* Edit Button */}
          {hovered && (
            <button
              onClick={() => onEdit(member)}
              className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>
      </Html>

      {/* Floating Name Label */}
      <Text
        position={[0, 4.5, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {member.name}
      </Text>

      {/* Task Status Indicator */}
      <mesh position={[2.2, 3.8, 0.1]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color={member.isCompleted ? '#22c55e' : '#f59e0b'}
          emissive={member.isCompleted ? '#22c55e' : '#f59e0b'}
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}