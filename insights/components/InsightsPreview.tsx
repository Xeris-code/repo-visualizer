import { EmptyStateTranslations } from "@/shared/types";
import {
  FolderTree,
  BarChart3,
  Network,
  Route,
  Sparkles,
} from "lucide-react";

export function features(
    translations: EmptyStateTranslations
){ 
    return [
  {
    icon: FolderTree,
    title: translations.insights.file.label,
    description: translations.insights.file.description,
    color: "bg-blue-500/10 text-blue-400",
  },
  {
    icon: BarChart3,
    title: translations.insights.repo.label,
    description: translations.insights.repo.description,
    color: "bg-emerald-500/10 text-emerald-400",
  },
  {
    icon: Network,
    title: translations.insights.graph.label,
    description: translations.insights.graph.description,
    color: "bg-violet-500/10 text-violet-400",
  },
  {
    icon: Route,
    title: translations.insights.api.label,
    description: translations.insights.api.description,
    color: "bg-amber-500/10 text-amber-400",
  },
  {
    icon: Sparkles,
    title: translations.insights.ai.label,
    description: translations.insights.ai.description,
    color: "bg-fuchsia-500/10 text-fuchsia-400",
  },
];}