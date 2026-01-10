import {
    FileText,
    Layout,
    Monitor,
    Search,
    Settings,
    Users,
} from 'lucide-react'

type LogoConfig = {
    type: 'image'
    image: {
        src: string
        alt: string
        style?: { width?: string; height?: string }
    }
}

export const APP_CONFIG = {
    name: '모리',
    logo: {
        type: 'image',
        image: {
            src: '/logo/icon_eng_logo1.png',
            alt: 'Logo',
            style: { width: 'w-full', height: 'h-full' }
        }
    } as LogoConfig,
}

export const NAV_CONFIG = [
    {
        title: '회의실',
        items: [
            { label: '회의실 예약', icon: Monitor, path: '/reserve' },
            { label: '회의실 조회', icon: Search, path: '/search' },
        ],
    },
    {
        title: '회의록',
        items: [
            { label: '회의록 작성', icon: FileText, path: '/minutes/new' },
            { label: '회의록 둘러보기', icon: Layout, path: '/minutes' },
        ],
    },
    {
        title: '조직',
        items: [
            { label: '멤버 현황', icon: Users, path: '/members' },
        ],
    },
]

export const USER_MENU_CONFIG = {
    items: [
        { label: '설정', icon: Settings, action: 'settings' },
    ],
}
