export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  photo: string;
  task: string;
  isCompleted: boolean;
}

export interface WallPosition {
  x: number;
  y: number;
  z: number;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Domendra',
    designation: 'Geo Tech',
    photo: `https://ui-avatars.com/api/?name=Domendra&background=2563eb&color=ffffff&size=150`,
    task: 'Soil analysis for foundation design',
    isCompleted: false
  },
  {
    id: '2',
    name: 'Jairul',
    designation: 'Surveyor',
    photo: `https://ui-avatars.com/api/?name=Jairul&background=2563eb&color=ffffff&size=150`,
    task: 'Site topographical survey',
    isCompleted: false
  },
  {
    id: '3',
    name: 'Chaitanya',
    designation: 'Hydraulic Engineer',
    photo: `https://ui-avatars.com/api/?name=Chaitanya&background=22c55e&color=ffffff&size=150`,
    task: 'Water flow analysis',
    isCompleted: true
  },
  {
    id: '4',
    name: 'Laxmi',
    designation: 'Hydraulic Engineer',
    photo: `https://ui-avatars.com/api/?name=Laxmi&background=2563eb&color=ffffff&size=150`,
    task: 'Drainage system design',
    isCompleted: false
  },
  {
    id: '5',
    name: 'Nelam',
    designation: 'Draftsman',
    photo: `https://ui-avatars.com/api/?name=Nelam&background=22c55e&color=ffffff&size=150`,
    task: 'Technical drawings preparation',
    isCompleted: true
  },
  {
    id: '6',
    name: 'Gulesh',
    designation: 'Draftsman',
    photo: `https://ui-avatars.com/api/?name=Gulesh&background=2563eb&color=ffffff&size=150`,
    task: 'CAD model development',
    isCompleted: false
  },
  {
    id: '7',
    name: 'Gunja',
    designation: 'Draftsman',
    photo: `https://ui-avatars.com/api/?name=Gunja&background=2563eb&color=ffffff&size=150`,
    task: 'Blueprint finalization',
    isCompleted: false
  },
  {
    id: '8',
    name: 'Mayank',
    designation: 'Team Leader',
    photo: `https://ui-avatars.com/api/?name=Mayank&background=2563eb&color=ffffff&size=150`,
    task: 'Project coordination',
    isCompleted: false
  },
  {
    id: '9',
    name: 'Raghu Sir',
    designation: 'Team Head',
    photo: `https://ui-avatars.com/api/?name=Raghu+Sir&background=2563eb&color=ffffff&size=150`,
    task: 'Overall project supervision',
    isCompleted: false
  }
];