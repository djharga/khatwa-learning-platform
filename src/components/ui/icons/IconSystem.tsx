import React from 'react';
import {
  BookOpen,
  FileText,
  Route,
  CheckSquare,
  TrendingUp,
  FileQuestion,
  Award,
  Users,
  FolderOpen,
  Briefcase,
  Headphones,
  HelpCircle,
  ChevronDown,
  Search,
  Bell,
  Palette,
  User,
  X,
  Menu,
  GraduationCap,
  ClipboardCheck,
  BarChart3,
  PenTool,
  Map,
  ExternalLink,
  ArrowRight,
  Home,
  Settings,
  Shield,
  CheckCircle2,
  Calculator,
  Star,
  Folder,
  LibraryBig,
  LayoutDashboard,
  Book,
  ShieldCheck,
  FileCheck,
  CreditCard,
  MessageCircle,
  Video,
} from 'lucide-react';

interface IconProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 'sm', color, className }) => {
  const sizeMap = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
  };

  const getColor = (colorName?: string) => {
    if (!colorName) return undefined;
    switch (colorName) {
      case 'accent':
        return 'var(--accent-500)';
      case 'secondary':
        return 'var(--neutral-600)';
      case 'primary':
        return 'var(--primary-500)';
      case 'white':
        return '#ffffff';
      default:
        return colorName;
    }
  };

  const iconProps = {
    size: sizeMap[size],
    color: getColor(color),
    className,
  };

  const iconMap: Record<string, React.ComponentType<any>> = {
    home: Home,
    learning: GraduationCap,
    courses: BookOpen,
    paths: Route,
    files: FileText,
    folder: Folder,
    'course-tree': FolderOpen,
    audit: CheckSquare,
    levels: TrendingUp,
    exams: FileQuestion,
    certificates: Award,
    award: Award,
    fellowship: Users,
    community: Users,
    users: Users,
    consulting: Briefcase,
    blog: Book,
    support: Headphones,
    services: Settings,
    subscription: CreditCard,
    'credit-card': CreditCard,
    admin: Shield,
    reports: BarChart3,
    instructor: Users,
    calculator: Calculator,
    'financial-management': Calculator,
    'internal-auditor': ShieldCheck,
    resources: FolderOpen,
    'resource-course-files': FolderOpen,
    'course-files': FolderOpen,
    library: LibraryBig,
    dashboard: LayoutDashboard,
    book: Book,
    shield: Shield,
    shieldCheck: ShieldCheck,
    checkCircle: CheckCircle2,
    video: Video,
    help: HelpCircle,
    contact: MessageCircle,
    chevronDown: ChevronDown,
    search: Search,
    notifications: Bell,
    theme: Palette,
    user: User,
    close: X,
    menu: Menu,
    external: ExternalLink,
    arrowRight: ArrowRight,
    pen: PenTool,
    map: Map,
    clipboard: ClipboardCheck,
    fileCheck: FileCheck,
    star: Star
  };

  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent {...iconProps} />;
};

export default Icon;
