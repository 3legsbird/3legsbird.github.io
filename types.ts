import { LucideIcon } from 'lucide-react';

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon: string; // simple representation or Lucide icon name
  category: 'frontend' | 'backend' | 'tools' | 'design';
}

export interface NavItem {
  label: string;
  href: string;
}

export enum ChatRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  role: ChatRole;
  text: string;
  timestamp: Date;
}