import { CommunityMemberData } from "../models/CommunityMemberData";
import { logger } from "../utils/YanaUtil";

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
    increaseMemberMoney(discordId: string, amount: number): boolean {
        const member = this.getMemberById(discordId);
        if (member) {
            member.money += amount;
            logger.info(`Increased money for member ${discordId} by ${amount}. New balance: ${member.money}`);
            return true;
        }
        logger.warn(`Failed to increase money for member ${discordId}. Member not found.`);
        return false;
    }

    decreaseMemberMoney(discordId: string, amount: number): boolean {
        const member = this.getMemberById(discordId);
        if (member) {
            if (member.money >= amount) {
                member.money -= amount;
                logger.info(`Decreased money for member ${discordId} by ${amount}. New balance: ${member.money}`);
                return true;
            }
            logger.warn(`Failed to decrease money for member ${discordId}. Not enough balance.`);
            return false;
        }
        logger.warn(`Failed to decrease money for member ${discordId}. Member not found.`);
        return false;
    }

    getMemberMoney(discordId: string): number | undefined {
        const member = this.getMemberById(discordId);
        if (member) {
            logger.info(`Retrieved money for member ${discordId}. Balance: ${member.money}`);
            return member.money;
        }
        logger.warn(`Failed to retrieve money for member ${discordId}. Member not found.`);
        return undefined;
    }
}
