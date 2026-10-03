import type { Project, Screen } from '../types/content';

// One screen in a ScreenReel, with the project details a placeholder screen needs.
export interface ReelItem {
  key: string;
  screen: Screen;
  projectName: string;
  tint: string;
}

export function reelItemsFromProjects(projects: Project[]): ReelItem[] {
  return projects.flatMap((project) =>
    project.screens.map((screen, index) => ({
      key: `${project.slug}-${index}`,
      screen,
      projectName: project.name,
      tint: project.tint,
    })),
  );
}
