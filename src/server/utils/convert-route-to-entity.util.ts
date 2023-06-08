const mapping: Record<string, string> = {
  academies: 'academy',
  'coach-academies': 'coach_academy',
  'parent-children': 'parent_child',
  'player-profiles': 'player_profile',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
