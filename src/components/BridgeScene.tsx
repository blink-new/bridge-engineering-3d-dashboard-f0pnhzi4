import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Stars, PerspectiveCamera } from '@react-three/drei';
import { TeamWall } from './TeamWall';
import { WaterWave } from './WaterWave';
import { EditModal } from './EditModal';
import { TeamMember, TEAM_MEMBERS } from '../types/team';
import { Group } from 'three';

function CameraController() {
  const { camera } = useThree();
  
  useFrame(() => {
    const scrollY = window.scrollY;
    const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
    const scrollProgress = Math.min(scrollY / maxScroll, 1);
    
    // Move camera forward as user scrolls
    camera.position.z = 20 - scrollProgress * 30;
    camera.updateProjectionMatrix();
  });

  return null;
}

function BridgeEnvironment() {
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      
      {/* Main directional light */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* Additional lights for better illumination */}
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="#2563eb" />
      <pointLight position={[10, 5, -10]} intensity={0.5} color="#f59e0b" />
      
      {/* Stars background */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      
      {/* Environment for reflections */}
      <Environment preset="night" />
    </>
  );
}

export function BridgeScene() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading completion
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const handleSaveMember = (updatedMember: TeamMember) => {
    setTeamMembers(prev => 
      prev.map(member => 
        member.id === updatedMember.id ? updatedMember : member
      )
    );
  };

  // Calculate wall positions in a curved arrangement
  const getWallPosition = (index: number): [number, number, number] => {
    const totalWalls = teamMembers.length;
    const radius = 15;
    const angle = (index / totalWalls) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius - index * 8; // Spread them out in depth
    const y = Math.sin(index * 0.5) * 2; // Slight vertical variation
    
    return [x, y, z];
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="text-white text-xl mb-4">Loading 3D Bridge Dashboard...</div>
          <div className="text-slate-400 text-sm">Initializing multi-PC synchronization...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative">
      {/* 3D Canvas */}
      <Canvas
        shadows
        className="w-full h-full"
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor('#0F172A');
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 5, 20]} fov={75} />
        
        <Suspense fallback={
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="white" />
          </mesh>
        }>
          <BridgeEnvironment />
          
          {/* Team Member Walls */}
          {teamMembers.map((member, index) => (
            <TeamWall
              key={member.id}
              member={member}
              position={getWallPosition(index)}
              onEdit={handleEditMember}
            />
          ))}
          
          {/* Water Wave Effect */}
          <WaterWave />
          
          <CameraController />
        </Suspense>
        
        {/* Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minDistance={5}
          maxDistance={50}
        />
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-4 left-4 z-10">
        <div className="glass-effect rounded-lg p-4">
          <h1 className="text-2xl font-bold text-white mb-2">
            Bridge Engineering Team
          </h1>
          <p className="text-slate-300 text-sm">
            Scroll to navigate • Click walls to edit profiles
          </p>
          <div className="mt-2 text-xs text-blue-300">
            🌐 Multi-PC Synchronized Dashboard
          </div>
        </div>
      </div>

      {/* Stats Overlay */}
      <div className="absolute top-4 right-4 z-10">
        <div className="glass-effect rounded-lg p-4">
          <div className="text-white text-sm space-y-1">
            <div>Total Members: {teamMembers.length}</div>
            <div>Completed Tasks: {teamMembers.filter(m => m.isCompleted).length}</div>
            <div>In Progress: {teamMembers.filter(m => !m.isCompleted).length}</div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="glass-effect rounded-lg px-6 py-3">
          <p className="text-white text-sm">
            🖱️ Drag to rotate • 🔍 Scroll to zoom • 📝 Click walls to edit • ✅ Click status to toggle
          </p>
        </div>
      </div>

      {/* Server Info */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="glass-effect rounded-lg px-4 py-2">
          <p className="text-slate-300 text-xs">
            🖥️ Access from other PCs: http://[YOUR_IP]:3000
          </p>
        </div>
      </div>

      {/* Edit Modal */}
      <EditModal
        member={editingMember}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMember(null);
        }}
        onSave={handleSaveMember}
      />
    </div>
  );
}