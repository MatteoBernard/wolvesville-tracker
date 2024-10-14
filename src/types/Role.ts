export interface Role {
    id: string;
    team: string;
    aura: string;
    description: string;
    image: {
        url: string;
        width: number;
        height: number;
    }
}

export interface RolesResponse {
    roles: Role[];
    advancedRolesMapping: Record<string, string[]>;
    randomRolesMapping: Record<string, string[]>;
    rankedRandomExcludedRoles: string[];
}