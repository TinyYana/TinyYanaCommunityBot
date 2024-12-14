export interface ICommunityMemberData {
    discordId: string;
    money: number;
    softDelete: boolean;

    addMoney(amount: number): void;
    removeMoney(amount: number): void;
}