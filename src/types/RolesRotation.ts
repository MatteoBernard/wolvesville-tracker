export interface MiniRole {
    probability: number;
    role: string;
}

export interface RoleRotation {
    id: string;
    roles: MiniRole[][];
}

export interface RoleRotationWrapper {
    roleRotation: RoleRotation;
    probability: number;
}

export interface GameConfig {
    gameMode: string;
    languages: string[];
    roleRotations: RoleRotationWrapper[];
    minWinRequirement: number;
}

export interface RolesRotationResponse {
    data: GameConfig[];
}