import { fetchOFD } from "#lib/server/itemsDataFetcher.ts";

export const load = async () => {
    const result = await fetchOFD();
    console.log(result);
}
