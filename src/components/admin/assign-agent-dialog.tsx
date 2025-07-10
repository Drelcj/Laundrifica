'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { assignAgentToOrder } from '@/lib/actions/order.actions';

interface AssignAgentDialogProps {
  orderId: number;
  agents: { id: string; full_name: string | null }[];
  currentAgentId: string | null;
}

export function AssignAgentDialog({ orderId, agents, currentAgentId }: AssignAgentDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string | undefined>(currentAgentId ?? undefined);
  const [isPending, startTransition] = useTransition();

  const handleAssign = () => {
    if (!selectedAgent) {
      alert('Please select a delivery agent.');
      return;
    }

    startTransition(async () => {
      const result = await assignAgentToOrder(orderId, selectedAgent);
      if (result.status === 'error') {
        alert(result.message);
      } else {
        setIsOpen(false);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          {currentAgentId ? 'Change Agent' : 'Assign Agent'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Delivery Agent</DialogTitle>
          <DialogDescription>Select a delivery agent to assign to order #{orderId}.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Select onValueChange={setSelectedAgent} defaultValue={selectedAgent}>
            <SelectTrigger>
              <SelectValue placeholder="Select an agent" />
            </SelectTrigger>
            <SelectContent>
              {agents.map((agent) => (
                <SelectItem key={agent.id} value={agent.id}>
                  {agent.full_name ?? `Agent ID: ${agent.id}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={handleAssign} disabled={isPending || !selectedAgent}>
            {isPending ? 'Assigning...' : 'Assign Agent'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
