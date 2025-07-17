import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { TeamMember } from '../types/team';

interface EditModalProps {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: TeamMember) => void;
}

export function EditModal({ member, isOpen, onClose, onSave }: EditModalProps) {
  const [formData, setFormData] = useState<TeamMember>({
    id: '',
    name: '',
    designation: '',
    photo: '',
    task: '',
    isCompleted: false
  });

  useEffect(() => {
    if (member) {
      setFormData(member);
    }
  }, [member]);

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          photo: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!member) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-slate-800 border-slate-600">
        <DialogHeader>
          <DialogTitle className="text-white">Edit Team Member</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Photo Upload */}
          <div className="space-y-2">
            <Label htmlFor="photo" className="text-white">Profile Photo</Label>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-600">
                <img
                  src={formData.photo}
                  alt={formData.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=2563eb&color=ffffff&size=150`;
                  }}
                />
              </div>
              <Input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>

          {/* Designation */}
          <div className="space-y-2">
            <Label htmlFor="designation" className="text-white">Designation</Label>
            <Input
              id="designation"
              value={formData.designation}
              onChange={(e) => setFormData(prev => ({ ...prev, designation: e.target.value }))}
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>

          {/* Task */}
          <div className="space-y-2">
            <Label htmlFor="task" className="text-white">Current Task</Label>
            <Textarea
              id="task"
              value={formData.task}
              onChange={(e) => setFormData(prev => ({ ...prev, task: e.target.value }))}
              className="bg-slate-700 border-slate-600 text-white min-h-[80px]"
            />
          </div>

          {/* Task Status */}
          <div className="flex items-center space-x-2">
            <Switch
              id="completed"
              checked={formData.isCompleted}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isCompleted: checked }))}
            />
            <Label htmlFor="completed" className="text-white">
              Task Completed
            </Label>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose} className="border-slate-600 text-white hover:bg-slate-700">
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}