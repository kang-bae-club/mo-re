import { cn } from '@/shared'
import { Member } from '../model'



interface MemberProfileProps {
    member: Member
    showDetails?: boolean
}

export const MemberProfile = ({
    member,
    showDetails = false,
}: MemberProfileProps) => {
    return (
        <div className="flex items-center gap-3">
            <img
                src={member.avatarUrl}
                alt={member.name}
                className={cn(
                    'h-10 w-10 rounded-full',
                    'bg-gray-200 border border-gray-100',
                )}
            />
            {showDetails && (
                <div>
                    <div
                        className={cn(
                            'text-lg font-bold leading-tight text-gray-900',
                        )}
                    >
                        {member.name}
                        <span
                            className={cn(
                                'ml-1 text-xs font-normal text-gray-500',
                            )}
                        >
                            {member.role}
                        </span>
                    </div>
                    <div className="text-xs text-gray-500">{member.team}</div>
                </div>
            )}
        </div>
    )
}
