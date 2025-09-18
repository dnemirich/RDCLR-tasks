import Image from "next/image";
import Link from "next/link";
import type {Character} from "@/shared/types";

type Props = {
    characters: Character[];
}

export async function getServerSideProps() {
    const res = await fetch('https://rickandmortyapi.com/api/character');
    const data = await res.json();

    return {
        props: {
            characters: data.results
        }
    }
}

export default function Home({characters}: Props) {
    return (
        <div className={'container mx-auto flex flex-col items-center gap-3.5'}>
            <h1 className={'font-bold text-xl'}>Home page</h1>
            <ul className={'flex flex-wrap items-center justify-center gap-6'}>
                {characters.map(character => (
                    <li className={'w-60 h-80 bg-stone-100 rounded-sm flex flex-col items-center gap-3.5'}
                        key={character.id}>
                        <Image className={'w-full object-contain'} src={character.image} alt={character.name}
                               width={100} height={100}/>
                        <p className={'font-bold hover:cursor-pointer hover:text-blue-500'}>
                            <Link href={`/character/${character.id}`}>{character.name}
                            </Link>
                        </p>
                    </li>
                ))}
            </ul>

        </div>
    );
}
