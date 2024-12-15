import { ICommunityMemberData } from "../interfaces/ICommunityMember";

export class CommunityMemberData implements ICommunityMemberData {
    public discordId: string;
    public money: number;
    public softDelete: boolean;
    public isActive: boolean;
    constructor(discordId: string, money: number, softDelete: boolean, isActive: boolean) {
        this.discordId = discordId;
        this.money = money;
        this.softDelete = softDelete;
        this.isActive = isActive;
        this.softDelete = softDelete;
    }

    setDelete(status: boolean): void {
        this.softDelete = status;
    }

    addMoney(amount: number): void {
        this.money += amount;
    }

    removeMoney(amount: number): void {
        this.money -= amount;
    }
}