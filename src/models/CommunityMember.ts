import { ICommunityMember } from "../interfaces/ICommunityMember";

export class CommunityMember implements ICommunityMember {
    public discordId: string;
    public money: number;
    public isDeleted: boolean;
    public isActive: boolean;
    constructor(discordId: string, money: number, isDeleted: boolean, isActive: boolean) {
        this.discordId = discordId;
        this.money = money;
        this.isActive = isActive;
        this.isDeleted = isDeleted;
    }

    setDelete(status: boolean): void {
        this.isDeleted = status;
    }

    setActive(status: boolean): void {
        this.isActive = status;
    }

    addMoney(amount: number): void {
        this.money += amount;
    }

    removeMoney(amount: number): void {
        this.money -= amount;
    }
}