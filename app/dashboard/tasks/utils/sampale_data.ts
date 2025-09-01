// Sample data for AddTaskModal component

// Sample Projects Data
export const sampleProjects = [
    { id: 'proj-001', name: 'Website Redesign' },
    { id: 'proj-002', name: 'Mobile App Development' },
    { id: 'proj-003', name: 'Marketing Campaign' },
    { id: 'proj-004', name: 'Database Migration' },
    { id: 'proj-005', name: 'Office Renovation' },
    { id: 'proj-006', name: 'E-commerce Platform' },
    { id: 'proj-007', name: 'Customer Support Portal' }
  ];
  
  // Sample Milestones Data (linked to projects)
  export const sampleMilestones = [
    // Website Redesign milestones
    { id: 'mile-001', name: 'Design Phase', projectId: 'proj-001' },
    { id: 'mile-002', name: 'Development Phase', projectId: 'proj-001' },
    { id: 'mile-003', name: 'Testing & QA', projectId: 'proj-001' },
    { id: 'mile-004', name: 'Launch', projectId: 'proj-001' },
    
    // Mobile App Development milestones
    { id: 'mile-005', name: 'Requirements Gathering', projectId: 'proj-002' },
    { id: 'mile-006', name: 'UI/UX Design', projectId: 'proj-002' },
    { id: 'mile-007', name: 'Backend Development', projectId: 'proj-002' },
    { id: 'mile-008', name: 'Frontend Development', projectId: 'proj-002' },
    { id: 'mile-009', name: 'App Store Submission', projectId: 'proj-002' },
    
    // Marketing Campaign milestones
    { id: 'mile-010', name: 'Strategy Planning', projectId: 'proj-003' },
    { id: 'mile-011', name: 'Content Creation', projectId: 'proj-003' },
    { id: 'mile-012', name: 'Campaign Launch', projectId: 'proj-003' },
    { id: 'mile-013', name: 'Performance Analysis', projectId: 'proj-003' },
    
    // Database Migration milestones
    { id: 'mile-014', name: 'Data Assessment', projectId: 'proj-004' },
    { id: 'mile-015', name: 'Migration Planning', projectId: 'proj-004' },
    { id: 'mile-016', name: 'Data Migration', projectId: 'proj-004' },
    { id: 'mile-017', name: 'Validation & Testing', projectId: 'proj-004' },
    
    // Office Renovation milestones
    { id: 'mile-018', name: 'Planning & Design', projectId: 'proj-005' },
    { id: 'mile-019', name: 'Permits & Approvals', projectId: 'proj-005' },
    { id: 'mile-020', name: 'Construction Phase', projectId: 'proj-005' },
    { id: 'mile-021', name: 'Final Inspection', projectId: 'proj-005' },
    
    // E-commerce Platform milestones
    { id: 'mile-022', name: 'Platform Setup', projectId: 'proj-006' },
    { id: 'mile-023', name: 'Product Catalog', projectId: 'proj-006' },
    { id: 'mile-024', name: 'Payment Integration', projectId: 'proj-006' },
    { id: 'mile-025', name: 'Go Live', projectId: 'proj-006' },
    
    // Customer Support Portal milestones
    { id: 'mile-026', name: 'Requirements Analysis', projectId: 'proj-007' },
    { id: 'mile-027', name: 'Portal Development', projectId: 'proj-007' },
    { id: 'mile-028', name: 'Integration Testing', projectId: 'proj-007' },
    { id: 'mile-029', name: 'User Training', projectId: 'proj-007' }
  ];
  
  // Sample Assignees Data
  export const sampleAssignees = [
    { id: 'user-001', name: 'Clarke James' },
    { id: 'user-002', name: 'Sarah Wilson' },
    { id: 'user-003', name: 'Michael Chen' },
    { id: 'user-004', name: 'Emma Rodriguez' },
    { id: 'user-005', name: 'David Thompson' },
    { id: 'user-006', name: 'Lisa Anderson' },
    { id: 'user-007', name: 'Robert Johnson' },
    { id: 'user-008', name: 'Maria Garcia' },
    { id: 'user-009', name: 'James Brown' },
    { id: 'user-010', name: 'Jennifer Davis' },
    { id: 'user-011', name: 'William Miller' },
    { id: 'user-012', name: 'Ashley Taylor' },
    { id: 'user-013', name: 'Christopher Lee' },
    { id: 'user-014', name: 'Amanda White' },
    { id: 'user-015', name: 'Daniel Harris' }
  ];
  
  // Example usage in your parent component:
  /*
  import { sampleProjects, sampleMilestones, sampleAssignees } from './sample-task-data';
  
  function YourParentComponent() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleSubmitTask = (taskData) => {
      console.log('New task:', taskData);
      // Handle task creation
    };
  
    return (
      <div>
        <button onClick={() => setIsModalOpen(true)}>
          Add New Task
        </button>
        
        <AddTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitTask}
          columnId="todo"
          projects={sampleProjects}
          milestones={sampleMilestones}
          assignees={sampleAssignees}
        />
      </div>
    );
  }
  */