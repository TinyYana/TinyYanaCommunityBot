export interface IDataManager<T> {
    load(): Promise<T[]>; // 載入資料
    save(data: T[]): Promise<void>; // 儲存資料
    add(item: T): Promise<void>; // 新增單個項目
    update(item: T): Promise<void>; // 更新單個項目
    delete(id: string): Promise<void>; // 刪除單個項目
}
