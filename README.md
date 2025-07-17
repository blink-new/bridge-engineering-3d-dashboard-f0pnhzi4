# Bridge Engineering Team 3D Dashboard

A responsive, interactive 3D web application built with Three.js and React for managing bridge engineering team tasks across multiple PCs.

## 🌟 Features

### 3D Interactive Environment
- **8 Floating Team Member Walls** with 4:8:1 ratio and curved edges
- **Slow-motion bouncing animation** with light shadows
- **Scroll-based camera movement** revealing walls progressively
- **Interactive water wave effects** at the scene bottom
- **Bridge engineering themed background** with immersive lighting

### Multi-PC Synchronization
- **Real-time data sync** across all connected devices
- **Network status indicator** showing connected PCs
- **Offline resilience** with local storage backup
- **Automatic reconnection** when network is restored

### Team Management
- **Editable team member profiles** (name, photo, designation, tasks)
- **Task assignment and tracking** with visual status indicators
- **One-click task completion toggle** synchronized across all PCs
- **Visual feedback** with color-coded completion states

### Team Members
1. **Domendra** - Geo Tech
2. **Jairul** - Surveyor  
3. **Chaitanya** - Hydraulic Engineer
4. **Laxmi** - Hydraulic Engineer
5. **Nelam** - Draftsman
6. **Gulesh** - Draftsman
7. **Gunja** - Draftsman
8. **Mayank** - Team Leader
9. **Raghu Sir** - Team Head

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Modern web browser with WebGL support
- Local network access for multi-PC functionality

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Multi-PC Access Setup

1. **Start the server on main PC:**
   ```bash
   npm run dev
   ```
   Server will start on port 3000 with network access enabled.

2. **Find your local IP address:**
   - **Windows:** Open Command Prompt → `ipconfig`
   - **Mac/Linux:** Open Terminal → `ifconfig` or `ip addr show`
   - Look for IPv4 address (e.g., `192.168.1.100`)

3. **Access from other PCs:**
   - Open browser on any PC on the same network
   - Navigate to: `http://[YOUR_IP]:3000`
   - Example: `http://192.168.1.100:3000`

## 🔧 Technical Architecture

### Frontend Stack
- **React 19** with TypeScript
- **Three.js** for 3D rendering via React Three Fiber
- **Tailwind CSS** for styling
- **Vite** for development and building

### Real-time Synchronization
- **Blink SDK** for real-time data synchronization
- **Local Storage** for offline data persistence
- **WebSocket connections** for live updates
- **Automatic conflict resolution** for concurrent edits

### 3D Components
- **TeamWall**: Individual 3D walls representing team members
- **WaterWave**: Interactive water simulation at scene bottom
- **BridgeEnvironment**: Themed lighting and background
- **CameraController**: Scroll-based camera movement

## 🎮 User Interactions

### Navigation
- **Mouse Drag**: Rotate the 3D scene
- **Scroll Wheel**: Zoom in/out and move camera forward
- **Scroll Page**: Progressive wall revelation

### Team Management
- **Click Wall**: Edit team member profile
- **Click Status Badge**: Toggle task completion
- **Edit Modal**: Update name, photo, designation, and tasks

### Visual Feedback
- **Green Walls**: Completed tasks with glow effect
- **Blue Walls**: In-progress tasks
- **Hover Effects**: Enhanced glow and interaction hints
- **Status Indicators**: Real-time completion badges

## 🌐 Network Features

### Connection Status
- **Top-right indicator**: Shows network status and connected PCs
- **Bottom-right sync**: Last synchronization timestamp
- **Automatic reconnection**: Seamless recovery from network issues

### Data Synchronization
- **Instant updates**: Changes appear immediately on all connected PCs
- **Conflict resolution**: Last-write-wins for concurrent edits
- **Offline support**: Local changes sync when connection restored

## 🛠️ Development

### Project Structure
```
src/
├── components/
│   ├── BridgeScene.tsx      # Main 3D scene component
│   ├── TeamWall.tsx         # Individual team member wall
│   ├── WaterWave.tsx        # Water simulation effect
│   ├── EditModal.tsx        # Profile editing interface
│   ├── NetworkStatus.tsx    # Connection status indicator
│   └── ConnectionIndicator.tsx # Sync status display
├── services/
│   └── teamDataService.ts   # Real-time data management
├── types/
│   └── team.ts             # TypeScript interfaces
└── lib/
    └── blink.ts            # Blink SDK configuration
```

### Key Services
- **TeamDataService**: Manages real-time synchronization and local storage
- **Blink SDK**: Handles WebSocket connections and data broadcasting
- **Local Storage**: Provides offline data persistence

### Build Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run linting checks
```

## 🔒 Security & Network

### Local Network Security
- **Trusted network only**: Designed for internal team networks
- **No authentication required**: Simplified access for team members
- **Firewall considerations**: Ensure port 3000 is accessible

### Data Privacy
- **Local storage**: Team data stored locally on each PC
- **Encrypted sync**: Real-time updates use secure WebSocket connections
- **No external data storage**: All data remains within your network

## 🚨 Troubleshooting

### Connection Issues
**Can't access from other PCs?**
1. Check firewall settings on host PC
2. Verify all devices are on same network
3. Confirm IP address is correct
4. Try temporarily disabling Windows Defender Firewall

**Real-time sync not working?**
1. Check internet connection (required for Blink SDK)
2. Look at network status indicator
3. Data will sync automatically when connection restored

### Performance Issues
**3D scene running slowly?**
1. Close other browser tabs
2. Update graphics drivers
3. Use Chrome or Firefox for best WebGL performance
4. Reduce browser zoom level

### Browser Compatibility
- **Chrome 90+**: Full support
- **Firefox 88+**: Full support  
- **Safari 14+**: Full support
- **Edge 90+**: Full support

## 📱 Responsive Design

The dashboard adapts to different screen sizes:
- **Desktop**: Full 3D experience with all features
- **Tablet**: Optimized touch controls
- **Mobile**: Simplified interface with essential features

## 🔮 Future Enhancements

- **Voice commands** for hands-free task updates
- **AR integration** for on-site task visualization
- **Advanced analytics** with progress charts
- **Integration** with project management tools
- **Custom themes** for different engineering disciplines

## 📄 License

This project is designed for internal use by bridge engineering teams. Modify and distribute according to your organization's requirements.

## 🤝 Support

For technical support or feature requests:
1. Check the troubleshooting section above
2. Review network configuration requirements
3. Ensure all PCs meet minimum system requirements

---

**Built with ❤️ for Bridge Engineering Teams**

*Empowering collaborative project management through immersive 3D visualization*