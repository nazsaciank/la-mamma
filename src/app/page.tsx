import { auth } from "@/actions/auth";
import { getRelations } from "@/actions/getRelations";
import { Auth } from "@/components/auth";
import { TableMedics } from "@/components/table";

interface HomeProps {
    searchParams: { token: string };
}

export default async function Home({ searchParams }: HomeProps) {
    const { token } = searchParams;
    globalThis._token = token;
    await auth();

    const relations = await getRelations(44);

    return (
        <Auth>
            <TableMedics relations={relations} />;
        </Auth>
    );
}
