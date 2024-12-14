import { CommunityMemberData } from "../models/CommunityMemberData";

export class CommunityMemberManager {
    private members: Map<string, CommunityMemberData>;

    constructor() {
        this.members = new Map();
    }

    addMember(member: CommunityMemberData): void {
        this.members.set(member.discordId, member);
    }

    getMemberById(discordId: string): CommunityMemberData | undefined {
        return this.members.get(discordId);
    }

    setMemberDeletionStatus(discordId: string, isDeleted: boolean): boolean {
        const member = this.getMemberById(discordId);
        if (member) {
            member.setDelete(isDeleted);
            return true;
        }
        return false;
    }
}
