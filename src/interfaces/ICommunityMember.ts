export interface ICommunityMember {
    discordId: string;
    money: number;
    isDeleted: boolean;
    isActive: boolean;

    addMoney(amount: number): void;
    removeMoney(amount: number): void;
    setDelete(status: boolean): void;
}