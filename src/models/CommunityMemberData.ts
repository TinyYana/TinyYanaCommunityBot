import { ICommunityMemberData } from "../interfaces/ICommunityMemberData";

export class CommunityMemberData implements ICommunityMemberData {
    public discordId: string;
    public money: number;
    public softDelete: boolean;

    constructor(discordId: string, money: number, softDelete: boolean) {
        this.discordId = discordId;
        this.money = money;
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