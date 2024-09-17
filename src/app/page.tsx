"use client"
import Image from "next/image";
import {Button} from "@/components/ui/button"
import {MoonIcon, SunIcon} from "@radix-ui/react-icons"
import {useTheme} from "next-themes"
import {useState} from "react";

type TThemeName = 'light' | 'dark'
export default function Home() {
    const [currentTheme, setCurrentTheme] = useState('light')

    const {setTheme} = useTheme()

    const toggleTheme = () => {
        const newTheme: TThemeName = currentTheme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        setCurrentTheme(newTheme)
    }

    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                    <li className="mb-2">
                        Get started by editing{" "}
                        <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                            src/app/page.tsx
                        </code>
                        .
                    </li>
                    <li>Save and see your changes instantly.</li>
                </ol>

                <div className="flex gap-4 items-center flex-col sm:flex-row">
                    <a
                        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                        href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            className="dark:invert"
                            src="https://nextjs.org/icons/vercel.svg"
                            alt="Vercel logomark"
                            width={20}
                            height={20}
                        />
                        Deploy now
                    </a>
                    <a
                        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
                        href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Read our docs
                    </a>

                    <Button variant="outline" size="icon" type="button" onClick={() => toggleTheme()}>
                        {currentTheme === 'light' &&
                            <SunIcon
                                className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
                        }
                        {currentTheme === 'dark' &&
                            <MoonIcon
                                className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
                        }
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </div>
            </main>
        </div>
    );
}
