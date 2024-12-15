import * as fs from "fs/promises";
import * as path from "path";
import { logger } from "../utils/YanaUtil";
import { CommunityMember } from "../models/CommunityMember";

export class DataManager {
    private readonly dataFilePath: string;

    constructor(filePath: string = "./MemberData.json") {
        this.dataFilePath = path.resolve(filePath);
    }

    // 讀取檔案並返回成員列表
    async loadMembers(): Promise<CommunityMember[]> {
        try {
            const rawData = await fs.readFile(this.dataFilePath, "utf8");
            const parsedData = JSON.parse(rawData);
            logger.info("已成功讀取成員資料。");
            return parsedData.map((data: any) => new CommunityMember(
                data.discordId,
                data.money,
                data.isActive,
                data.isDeleted
            ));
        } catch (error: any) {
            if (error.code === "ENOENT") {
                logger.warn("檔案不存在，將初始化為空數據。");
                return [];
            }
            logger.error("讀取成員資料時發生錯誤:", error);
            throw error;
        }
    }

    // 將成員列表保存到檔案
    async saveMembers(members: CommunityMember[]): Promise<void> {
        try {
            const memberData = members.map((member) => ({
                discordId: member.discordId,
                money: member.money,
                isActive: member.isActive,
                isDeleted: member.isDeleted,
            }));
            await fs.writeFile(this.dataFilePath, JSON.stringify(memberData, null, 2), "utf8");
            logger.info("成員資料已成功寫入檔案。");
        } catch (error) {
            logger.error("保存成員資料時發生錯誤:", error);
            throw error;
        }
    }
}
