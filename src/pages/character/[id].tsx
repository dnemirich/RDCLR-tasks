import type {GetServerSidePropsContext} from "next";
import type {Character} from "@/shared/types";
import Image from "next/image";

export async function getServerSideProps({params}: GetServerSidePropsContext) {
    const id = params?.id as string;

    if (id === '0') {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);

    if (!res.ok) {
        return {
            notFound: true,
        }
    }


    const data = await res.json();

    return {
        props: {
            character: data
        }
    }
}


export default function CharacterPage ({character}: { character: Character}) {
    return (
        <div className={'container mx-auto w-full h-screen flex items-center justify-center'}>
            <div className={'flex items-center gap-3.5 bg-stone-100 w-120 h-80 p-2'}>
                <Image className={'h-full w-3/5 object-contain'} src={character.image} alt={character.name} width={100} height={100}/>
                <div className={'flex flex-col gap-1'}>
                    <h1 className={'text-lg font-bold'}>{character.name}</h1>
                    <p>{character.status}</p>
                    <p>{character.species}</p>
                    <p>{character.gender}</p>
                </div>
            </div>

        </div>
    )
}