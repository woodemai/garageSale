import prismadb from "@/app/libs/prismadb";

export default async function generateStaticProps() {
    const categories = await prismadb.category.findMany();
    return categories.map((category) => category.id);
}