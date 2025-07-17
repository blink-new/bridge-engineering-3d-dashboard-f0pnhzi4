import { blink } from '../lib/blink';
import { TeamMember } from '../types/team';

const STORAGE_KEY = 'bridge_team_data';
const REALTIME_CHANNEL = 'bridge-team-updates';

export class TeamDataService {
  private static instance: TeamDataService;
  private teamMembers: TeamMember[] = [];
  private listeners: ((members: TeamMember[]) => void)[] = [];

  private constructor() {
    this.initializeData();
    this.setupRealtimeSync();
  }

  static getInstance(): TeamDataService {
    if (!TeamDataService.instance) {
      TeamDataService.instance = new TeamDataService();
    }
    return TeamDataService.instance;
  }

  private initializeData() {
    // Load from localStorage first
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      this.teamMembers = JSON.parse(stored);
    } else {
      // Initialize with default data
      this.teamMembers = [
        {
          id: '1',
          name: 'Domendra',
          designation: 'Geo Tech',
          photo: 'https://ui-avatars.com/api/?name=Domendra&background=2563eb&color=ffffff&size=150',
          task: 'Soil analysis for foundation design',
          isCompleted: false
        },
        {
          id: '2',
          name: 'Jairul',
          designation: 'Surveyor',
          photo: 'https://ui-avatars.com/api/?name=Jairul&background=2563eb&color=ffffff&size=150',
          task: 'Site topographical survey',
          isCompleted: false
        },
        {
          id: '3',
          name: 'Chaitanya',
          designation: 'Hydraulic Engineer',
          photo: 'https://ui-avatars.com/api/?name=Chaitanya&background=22c55e&color=ffffff&size=150',
          task: 'Water flow analysis',
          isCompleted: true
        },
        {
          id: '4',
          name: 'Laxmi',
          designation: 'Hydraulic Engineer',
          photo: 'https://ui-avatars.com/api/?name=Laxmi&background=2563eb&color=ffffff&size=150',
          task: 'Drainage system design',
          isCompleted: false
        },
        {
          id: '5',
          name: 'Nelam',
          designation: 'Draftsman',
          photo: 'https://ui-avatars.com/api/?name=Nelam&background=22c55e&color=ffffff&size=150',
          task: 'Technical drawings preparation',
          isCompleted: true
        },
        {
          id: '6',
          name: 'Gulesh',
          designation: 'Draftsman',
          photo: 'https://ui-avatars.com/api/?name=Gulesh&background=2563eb&color=ffffff&size=150',
          task: 'CAD model development',
          isCompleted: false
        },
        {
          id: '7',
          name: 'Gunja',
          designation: 'Draftsman',
          photo: 'https://ui-avatars.com/api/?name=Gunja&background=2563eb&color=ffffff&size=150',
          task: 'Blueprint finalization',
          isCompleted: false
        },
        {
          id: '8',
          name: 'Mayank',
          designation: 'Team Leader',
          photo: 'https://ui-avatars.com/api/?name=Mayank&background=2563eb&color=ffffff&size=150',
          task: 'Project coordination',
          isCompleted: false
        },
        {
          id: '9',
          name: 'Raghu Sir',
          designation: 'Team Head',
          photo: 'https://ui-avatars.com/api/?name=Raghu+Sir&background=2563eb&color=ffffff&size=150',
          task: 'Overall project supervision',
          isCompleted: false
        }
      ];
      this.saveToStorage();
    }
  }

  private async setupRealtimeSync() {
    try {
      // Subscribe to real-time updates
      await blink.realtime.subscribe(REALTIME_CHANNEL, (message) => {
        if (message.type === 'team_update') {
          this.teamMembers = message.data.teamMembers;
          this.saveToStorage();
          this.notifyListeners();
        }
      });
    } catch (error) {
      console.warn('Real-time sync not available, using local storage only:', error);
    }
  }

  private saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.teamMembers));
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener([...this.teamMembers]));
  }

  private async broadcastUpdate() {
    try {
      await blink.realtime.publish(REALTIME_CHANNEL, 'team_update', {
        teamMembers: this.teamMembers,
        timestamp: Date.now()
      });
    } catch (error) {
      console.warn('Failed to broadcast update:', error);
    }
  }

  getTeamMembers(): TeamMember[] {
    return [...this.teamMembers];
  }

  updateTeamMember(id: string, updates: Partial<TeamMember>) {
    const index = this.teamMembers.findIndex(member => member.id === id);
    if (index !== -1) {
      this.teamMembers[index] = { ...this.teamMembers[index], ...updates };
      this.saveToStorage();
      this.broadcastUpdate();
      this.notifyListeners();
    }
  }

  toggleTaskCompletion(id: string) {
    const member = this.teamMembers.find(m => m.id === id);
    if (member) {
      this.updateTeamMember(id, { isCompleted: !member.isCompleted });
    }
  }

  subscribe(listener: (members: TeamMember[]) => void) {
    this.listeners.push(listener);
    // Immediately call with current data
    listener([...this.teamMembers]);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Network status indicator
  async getNetworkStatus(): Promise<{ connected: boolean; peers: number }> {
    try {
      const presence = await blink.realtime.presence(REALTIME_CHANNEL);
      return {
        connected: true,
        peers: presence.length
      };
    } catch (error) {
      return {
        connected: false,
        peers: 0
      };
    }
  }
}

export const teamDataService = TeamDataService.getInstance();