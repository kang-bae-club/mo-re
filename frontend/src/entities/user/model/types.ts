export interface Member {
    memberId: string // 사원번호
    name: string // 이름
    email: string // 이메일
    phone: string // 전화번호
    position: string // 직급
    deptName: string // 부서명
    username: string // 유저아이디
    avatarUrl?: string // 프로필사진
}

export interface Organization {
    id: number
    name: string
    avatarUrl?: string
}
