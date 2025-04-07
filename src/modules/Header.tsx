import { useEffect, useRef } from 'react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { InstagramIcon } from '../components/icons/instagram';
import { TiktokIcon } from '../components/icons/tiktok';
import { GithubIcon } from '../components/icons/github';

export interface HeaderProps {
    profile: Record<string, string>
}

export default function Header({ profile }: HeaderProps) {

    if (!profile) return null;

    const frameWidth = 128 * 1.2;
    const frameHeight = 196 * 1.2;
    const frameCount = 24;
    const frameDuration = 100;
    const scale = 1;

    const spriteRef = useRef<HTMLDivElement>(null);
    const spriteUrl = profile.avatar_url;


    useEffect(() => {
        const style = document.createElement('style')
        style.innerHTML = `
          @keyframes sprite-anim {
            0% { background-position: 0 0; }
            100% { background-position: -${frameWidth * frameCount}px 0; }
          }
        `
        document.head.appendChild(style)
        return () => style.remove()
    }, [frameCount, frameWidth])


    return (
        <header className="flex items-center gap-2 flex-col lg:flex-row">
            <div
                className="overflow-hidden rounded-md"
                style={{
                    width: frameWidth * scale,
                    height: frameHeight * scale,
                    imageRendering: 'pixelated',
                }}
            >
                <div
                    ref={spriteRef}
                    className="sprite"
                    style={{
                        backgroundImage: `url(${spriteUrl})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: `${frameWidth * frameCount}px ${frameHeight}px`,
                        width: frameWidth * scale,
                        height: frameHeight * scale,
                        animation: `sprite-anim ${(frameDuration * frameCount) / 1000}s steps(${frameCount}) infinite alternate`,
                    }}
                />
            </div>
            <div className="flex flex-col w-full justify-center lg:items-start items-center lg:w-[calc(100%-128px*1.2)] ">
                <div className="flex items-center lg:text-left gap-2">
                    <span className="text-muted-foreground text-xs lg:text-sm">Hi, I'm</span>
                    <span className="text-lg font-semibold">{profile.name}</span>
                    <span className="text-muted-foreground text-xs lg:text-sm">,</span>
                </div>
                <p className="text-muted-foreground text-xs lg:text-sm">{profile.bio}</p>
                <div className="flex justify-center gap-1 mt-2">
                    {profile.instagram && (
                        <Button size="sm" asChild className="py-1 px-0.5" >
                            <a href={profile.instagram} target="_blank" rel="noreferrer" className="flex justify-center items-center">
                                <InstagramIcon className="size-5 flex justify-center items-center" />
                            </a>
                        </Button>
                    )}
                    {profile.tiktok && (
                        <Button size="sm" asChild className="py-1 px-0.5" >
                            <a href={profile.tiktok} target="_blank" rel="noreferrer">
                                <TiktokIcon className="size-5 flex justify-center items-center" />
                            </a>
                        </Button>
                    )}
                    {profile.github && (
                        <Button size="sm" asChild className="py-1 px-0.5" >
                            <a href={profile.github} target="_blank" rel="noreferrer">
                                <GithubIcon className="size-5 flex justify-center items-center" />
                            </a>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    )
}