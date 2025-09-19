import Link from "next/link";

export default function NotFound() {
    return (
        <div className={'container mx-auto w-full h-screen flex items-center justify-center'}>
            <div className={'flex flex-col gap-3.5 items-center justify-center'}>
                <h1 className={'text-6xl'}>404 - Page not found</h1>
                <Link  className={'hover:opacity-50'} href={'/'}>Back to main page</Link>
            </div>

        </div>
    )
}