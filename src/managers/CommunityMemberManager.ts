import { CommunityMember } from "../models/CommunityMember";
import { logger } from "../utils/YanaUtil";

export class CommunityMemberManager {
    private readonly members: Map<string, CommunityMember>;

    constructor() {
        this.members = new Map();
    }

    addMember(member: CommunityMember): void {
        this.members.set(member.discordId, member);
    }

    getMemberById(discordId: string): CommunityMember | undefined {
        return this.members.get(discordId);
    }

    setMemberDeletionStatus(discordId: string, isDeleted: boolean): boolean {
        const member = this.getMemberById(discordId);
        if (member) {
            member.setDelete(isDeleted);
            logger.info(`已將成員 ${discordId} 的刪除狀態設為 ${isDeleted}。`);
            return true;
        }
        logger.warn(`無法設定成員 ${discordId} 的刪除狀態，成員不存在。`);
        return false;
    }

    increaseMemberMoney(discordId: string, amount: number): boolean {
        const member = this.getMemberById(discordId);
        if (member) {
            member.money += amount;
            logger.info(`已為成員 ${discordId} 增加金額 ${amount}。新餘額：${member.money}`);
            return true;
        }
        logger.warn(`無法為成員 ${discordId} 增加金額，成員不存在。`);
        return false;
    }

    decreaseMemberMoney(discordId: string, amount: number): boolean {
        const member = this.getMemberById(discordId);
        if (member) {
            if (member.money >= amount) {
                member.money -= amount;
                logger.info(`已為成員 ${discordId} 減少金額 ${amount}。新餘額：${member.money}`);
                return true;
            }
            logger.warn(`無法為成員 ${discordId} 減少金額，餘額不足。`);
            return false;
        }
        logger.warn(`為社群成員 ${discordId} 減少金錢失敗，成員不存在。`);
        return false;
    }

    getMemberMoney(discordId: string): number | undefined {
        const member = this.getMemberById(discordId);
        if (member) {
            logger.info(`已取得成員 ${discordId} 的餘額：${member.money}`);
            return member.money;
        }
        logger.warn(`無法取得成員 ${discordId} 的餘額，成員不存在。`);
        return undefined;
    }
}
