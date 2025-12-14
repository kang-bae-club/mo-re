import { BackButton } from './BackButton'
import { cn } from '@/shared/lib'

interface PageHeaderProps {
    title: string
    className?: string
}

export const PageHeader = ({ title, className }: PageHeaderProps) => {
    return (
        <div className={cn('relative flex items-center justify-center p-4 border-b bg-white', className)}>
            <div className="absolute left-4">
                <BackButton />
            </div>
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        </div>
    )
}
