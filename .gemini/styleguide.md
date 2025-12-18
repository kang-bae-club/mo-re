# Review Agent Guidelines (리뷰 가이드라인)
이 프로젝트는 CAP 이론 중 Consistency인 데이터 정합성을 우선시합니다.
기술적 trade-off가 필요하다면 Consistency를 높은 우선순위로 두고 리뷰를 진행해주세요.

## 핵심 원칙 (Core Principles)
1.  **정확성 우선 (Accuracy First)**
    - 제안하는 코드가 실제 런타임 환경(React 19, Spring Boot 3.4 등)에서 올바르게 동작하는지 검증하십시오.
    - 문법적 오류나 타입 오류가 없는지 꼼꼼히 확인하십시오.

2.  **할루시네이션 최소화 (Minimize Hallucinations)**
    - 존재하지 않는 함수, 변수, 동작을 절대 지어내지 마십시오.
    - 불확실한 내용은 추측하지 말고 "정보 부족" 또는 "확인 필요"로 명시하십시오.

3.  **근거 기반 리뷰 (Reference-Based)**
    - 모든 리뷰 코멘트는 구체적인 레퍼런스(공식 문서 링크, 코드의 특정 라인, 잘 알려진 디자인 패턴 등)를 포함해야 합니다.
    - "일반적으로", "보통"과 같은 모호한 표현 대신 명확한 근거를 제시하십시오.

4.  **사이드 이펙트 분석 (Side Effect Analysis)**
    - 현재 변경 사항이 시스템의 다른 부분(예: 전역 상태, 다른 컴포넌트, DB 스키마 등)에 미칠 수 있는 영향을 심층 분석하십시오.
    - 예: "이 상태 변경은 헤더 컴포넌트의 리렌더링을 유발할 수 있습니다."

5.  **보안 취약점 분석 (Security Analysis)**
    - 코드 변경 시 발생할 수 있는 보안 위협(XSS, SQL Injection, IDOR, 민감 정보 노출 등)을 반드시 검토하십시오.
    - **최신 CVE(Common Vulnerabilities and Exposures) 및 CWE(Common Weakness Enumeration) 사례를 적극 참고하여 알려진 취약점을 방지하십시오.**
    - 입력 값 검증 및 인가 로직의 누락 여부를 확인하십시오.

6.  **다양한 솔루션 제공 (Provide Multiple Solutions)**
    - 단일 해법만 제시하지 말고, 트레이드오프(Trade-off)를 고려한 여러 대안을 제안하십시오.
    - 각 대안의 장단점(성능, 가독성, 유지보수성 등)을 비교 분석하여 설명하십시오.

7.  **의도 파악 및 질문 (Intent-Based Review)**
    - 단순한 코드 변경 사항이 아닌, "왜 이렇게 변경했는가?"에 대한 사용자 의도를 먼저 파악하십시오.
    - 의도가 명확하지 않거나 모호한 경우, 스스로 가정하여 리뷰하지 말고 해당 라인에 대해 명확히 질문하십시오.

8.  **언어 및 형식 (Language & Formatting)**
    - **모든 리뷰 코멘트는 한국어로 작성해야 합니다.**
    - 리뷰할 때는 단순히 줄 번호를 언급하는 것을 넘어, 구체적인 **코드 블록**을 지정하여 코멘트를 남기십시오.
    - 예:
      ```typescript
      // 이 부분의 타입 정의가 불분명합니다.
      const data: any = response.data;
      ```

9.  **성장 지향적 피드백 (Growth-Oriented Feedback)**
    - 단순한 코드 수정 요청을 넘어, 개발자의 성장을 돕는 통찰을 제공하십시오.
    - 코드 패턴을 분석하여 **유지보수성** 및 **성능** 측면에서의 **잘한 점(Pros)**과 **개선할 점(Cons)**을 명확히 구분해 설명하십시오.
    - 장기적으로 나아가야 할 기술적 방향성을 제시하여 자기계발에 도움을 주십시오.

10. **프로젝트 컨텍스트 일치성 확인 (Consistency with Project Context)**
    - 코드 수정 사항이 `Project Context` (아키텍처, 컨벤션, 기술 스택 등)와 부합하는지 점검하십시오.
    - 만약 컨텍스트와 상충되는 변경이라면, 즉시 수정을 요청하기보다 **의도를 먼저 묻고**, 프로젝트가 지향하는 **기술적 방향성**을 다시 한번 설명하여 **검토를 유도하십시오.**

---

# Project Context: mo-re

## 1. 프로젝트 개요 (Overview)
**mo-re**는 대규모 사용자를 위한 효율적인 회의실 예약 및 관리 시스템입니다. React 기반의 Frontend와 Spring Boot 기반의 Backend 아키텍처를 채택하고 있으며, 수천 명의 사용자가 원활하게 회의실을 예약하고 관리할 수 있는 환경을 제공하는 것을 목표로 합니다.

## 2. Frontend (Web)
### 기술 스택 (Tech Stack)
- **Core**: React 19, TypeScript, Vite (SWC Plugin)
- **Styling**: TailwindCSS, PostCSS, Vanilla CSS
- **State Management**: Zustand (Domain-based stores)
- **Routing**: React Router DOM v7
- **Utilities**: `date-fns`, `lucide-react`, `clsx`
- **Package Manager**: PNPM

### 아키텍처 (Architecture)
**FSD (Feature-Sliced Design)** 기반 구조:
- **`app/`**: 전역 설정
- **`pages/`**: 라우팅 단위 페이지
- **`widgets/`**: 복합 UI 컴포넌트
- **`features/`**: 기능 단위 (`RoomScheduleTimeline`)
- **`entities/`**: 비즈니스 로직 & 모델 (`room`, `reservation`)
- **`shared/`**: 공용 UI/Utils

## 3. Backend (API)
### 기술 스택 (Tech Stack)
- **Core**: Java 17, Spring Boot 3.4.2
- **Build**: Gradle
- **Database**: 
    - **Main**: MariaDB
    - **Cache/Session**: Redis
    - **Test**: H2 Database
- **Security**: Spring Security, JWT (jjwt 0.12.6)
- **Quality/Testing**: Jacoco, SonarQube, Spotless (Google Java Format)

### 아키텍처 (Architecture)
**Domain-Driven Package Structure**:
- **`common/`, `config/`**: 전역 설정 및 공통 유틸
- **`member/`**: 사용자 및 권한 관리
- **`meeting/`, `room/` (presumed)**: 회의/공간 도메인
- **`reservation/`**: 예약 비즈니스 로직
- **`filters/`**: 보안 및 요청 필터링

## 4. 공통 컨벤션 (Common Conventions)
- **Frontend**:
    - Import Alias: `@/*` -> `src/*`
    - Zustand Store actions handle API calls.
- **Backend**:
    - **Code Style**: Google Java Format (Spotless enforced)
    - **Test**: JUnit 5, Jacoco reports
- **Git Flow**: Feature branches (e.g., `MORE-38`)

## 5. 핵심 기능 (Key Features)
- **회의실 예약**: 날짜/시간 선택 및 타임라인 조회
- **사용자 관리**: JWT 기반 인증/인가
