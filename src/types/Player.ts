export interface Player {
    id: string,
    username: string,
    personalMessage: string,
    level: number,
    status: string,
    creationTime: string,
    lastOnline: string,
    rankedSeasonSkill: number,
    rankedSeasonMaxSkill: number,
    rankedSeasonBestRank: number,
    rankedSeasonPlayedCount: number,
    receivedRosesCount: number,
    sentRosesCount: number,
    profileIconId: number,
    profileIconColor: string,
    equippedAvatar: {
        url: string,
        width: number,
        height: number
    },
    avatars: {
        url: string,
        width: number,
        height: number
    }[],
    badgeIds: string[],
    roleCards: {
        roleId1: string,
        roleId2: string,
        roleIdBase: string,
        roleIdsAdvanced: string[],
        abilityId1: string,
        abilityId2: string,
        rarity: string,
    }[],
    clanId: string,
    gameStats: {
        totalWinCount: number,
        totalLoseCount: number,
        totalTieCount: number,
        villageWinCount: number,
        villageLoseCount: number,
        werewolfWinCount: number,
        werewolfLoseCount: number,
        votingWinCount: number,
        votingLoseCount: number,
        soloWinCount: number,
        soloLoseCount: number,
        exitGameBySuicideCount: number,
        exitGameAfterDeathCount: number,
        gamesSurvivedCount: number,
        gamesKilledCount: number,
        totalPlayTimeInMinutes: number,
        achievements: {
            roleId: string,
            level: number,
            points: number,
            pointsNextLevel: number,
            category: string,
        }[],
    }
}