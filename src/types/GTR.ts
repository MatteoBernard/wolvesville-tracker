import {Role} from "./Role";

export class GTR {

    private roles: Role[];
    private chosenRole: Role | null;

    constructor(roles: Role[]) {
        this.roles = roles;
        this.chosenRole = this.roles[Math.floor(Math.random() * this.roles.length)];

    }

    public getChosenRole(): Role | null {
        return this.chosenRole;
    }

    public submitRole(role: Role): boolean {
        if (this.chosenRole === null) {
            throw new Error('Game has not started yet');
        }
        return role.id === this.chosenRole.id;
    }

}