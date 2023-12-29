import { getRelations } from "@/actions/getRelations";
import { TableMedics } from "@/components/table";

export default async function Home() {
    const relations = await getRelations(44);

    return <TableMedics relations={relations} />;
}
