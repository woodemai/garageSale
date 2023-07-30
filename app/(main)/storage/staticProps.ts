import prismadb from "@/app/libs/prismadb";

export default async function generateStaticProps() {
    const items = await prismadb.item.findMany();
    return items.map((item) => item.id);
}