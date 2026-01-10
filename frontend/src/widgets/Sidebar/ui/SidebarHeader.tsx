import { useState } from 'react'
import { cn } from '@/shared/lib'
import { APP_CONFIG } from '@/shared/config'

export const SidebarHeader = () => {
    const { logo, name } = APP_CONFIG
    const [isError, setIsError] = useState(false)

    return (
        <div className="flex items-center gap-2 p-6">
            <div className="flex items-center gap-1">
                {!isError ? (
                    <img
                        src={logo.image.src}
                        alt={logo.image.alt}
                        onError={() => setIsError(true)}
                        className={cn(
                            'object-contain',
                            logo.image.style?.width,
                            logo.image.style?.height,
                        )}
                    />
                ) : (
                    <div
                        className={cn(
                            'flex h-10 w-10 items-center justify-center',
                            'rounded-full font-bold',
                        )}
                    >
                        {name}
                    </div>
                )}
            </div>
        </div>
    )
}
