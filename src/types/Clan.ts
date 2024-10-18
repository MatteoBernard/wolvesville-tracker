export interface Clan {
    id: string,
    creationTime: string,
    name: string,
    description: string,
    xp: number,
    language: string,
    icon: string,
    iconColor: string,
    tag: string,
    joinType: string,
    leaderId: string,
    questHistoryCount: number,
    minLevel: number,
    memberCount: number
}

export interface ClanMember {
    playerId: string,
    creationTime: string,
    xp: number,
    status: string,
    isCoLeader: boolean,
    username: string,
    level: number,
    lastOnline: string,
    profileIconId: string,
    profileIconColor: string,
    participateInClanQuests: boolean
}

export interface ClanInfos {
    id: string,
    creationTime: string,
    name: string,
    description: string,
    xp: number,
    language: string,
    icon: string,
    iconColor: string,
    tag: string,
    joinType: string,
    leaderId: string,
    questHistoryCount: number,
    minLevel: number,
    memberCount: number,
    gold: number,
    gems: number
}