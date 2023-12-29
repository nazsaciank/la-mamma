import { getRelations } from "@/actions/getRelations";
import { TableMedics } from "@/components/table";

interface HomeProps {
    searchParams: { token: string };
}

export default async function Home({ searchParams }: HomeProps) {
    const { token } = searchParams;
    const relations = await getRelations(44, token);

    return <TableMedics relations={relations} />;
}
