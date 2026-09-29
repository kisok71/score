// src/data/koreaCourses.ts
// 문화체육관광부 전국 골프장 현황 (2024.12.31 기준 총 541개 공식 등록 골프장)
import { Course, HoleInfo } from '../types/golf';
import { createStandardHoles } from '../utils/golfHoleGenerator';

export interface RawKoreaCourse {
  id: string;
  name: string;
  location: string;
  totalHoles: number;
  membershipType: string;
  company: string;
  courses: {
    outCourseName: string;
    inCourseName: string;
  };
  tags: string[];
}

export const KOREA_COURSES_RAW: RawKoreaCourse[] = [
  {
    "id": "mcst-1",
    "name": "라데나골프클럽",
    "location": "강원 춘천시 신동면 칠전동길 72",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "두산큐벡스㈜(문희종)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "강원",
      "회원제",
      "27홀",
      "춘천"
    ]
  },
  {
    "id": "mcst-2",
    "name": "엘리시안 강촌컨트리클럽",
    "location": "강원 춘천시 남산면 북한강변길 688",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "지에스건설㈜(허윤홍)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "강원",
      "회원제",
      "27홀",
      "춘천"
    ]
  },
  {
    "id": "mcst-3",
    "name": "제이드팰리스 골프클럽",
    "location": "강원 춘천시 남산면 경춘로 212-30",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "한화솔루션㈜ (남정훈)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "회원제",
      "18홀",
      "춘천"
    ]
  },
  {
    "id": "mcst-4",
    "name": "남춘천컨트리클럽",
    "location": "강원 춘천시 신동면 오봉길 156",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜엠디아이레저개발(이형용)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "18홀",
      "춘천"
    ]
  },
  {
    "id": "mcst-5",
    "name": "휘슬링락컨트리클럽",
    "location": "강원 춘천시 남산면 동촌로 501",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "㈜티시스(유태호)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "강원",
      "회원제",
      "27홀",
      "춘천"
    ]
  },
  {
    "id": "mcst-6",
    "name": "오너스골프클럽",
    "location": "강원 춘천시 남산면 동촌로 667",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "강촌칼론골프클럽㈜(김종현)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "18홀",
      "춘천"
    ]
  },
  {
    "id": "mcst-7",
    "name": "파가니카컨트리클럽",
    "location": "강원 춘천시 남면 소주고개로 145-10",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜레저플러스(조태석)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "18홀",
      "춘천"
    ]
  },
  {
    "id": "mcst-8",
    "name": "더플레이어스 골프클럽",
    "location": "강원 춘천시 동산면 새술막길 438",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "주식회사 플레이어스골프클럽(권성호)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "27홀",
      "춘천"
    ]
  },
  {
    "id": "mcst-9",
    "name": "스프링베일리조트",
    "location": "강원 춘천시 동면 금베이길 93-27",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜춘천골프아카데미(홍순주)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "9홀",
      "춘천"
    ]
  },
  {
    "id": "mcst-10",
    "name": "로드힐스골프클럽",
    "location": "강원 춘천시 동산면 종자리로 148-16",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "신영종합개발㈜(이정덕)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "27홀",
      "춘천"
    ]
  },
  {
    "id": "mcst-11",
    "name": "라비에벨컨트리클럽",
    "location": "강원 춘천시 동산면 종자리로 436",
    "totalHoles": 36,
    "membershipType": "대중제",
    "company": "코오롱글로벌㈜ (김정일)그린나래㈜ (이정윤)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "36홀",
      "춘천"
    ]
  },
  {
    "id": "mcst-12",
    "name": "베어크리크 춘천",
    "location": "강원 춘천시 신동면 김유정로 730",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "삼보개발(주)(류경호)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "18홀",
      "춘천"
    ]
  },
  {
    "id": "mcst-13",
    "name": "오크밸리회원제골프장",
    "location": "강원 원주시 지정면 오크밸리1길 66",
    "totalHoles": 36,
    "membershipType": "회원제",
    "company": "에이치디씨리조트주식회사(조영환)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "강원",
      "회원제",
      "36홀",
      "원주"
    ]
  },
  {
    "id": "mcst-14",
    "name": "월송리 컨트리클럽",
    "location": "강원 원주시 지정면 오크밸리2길 250",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "에이치디씨리조트주식회사(조영환)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "18홀",
      "원주"
    ]
  },
  {
    "id": "mcst-15",
    "name": "Oak Hills컨트리클럽",
    "location": "강원 원주시 지정면 오크밸리2길 58",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "에이치디씨리조트주식회사(조영환)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "회원제",
      "18홀",
      "원주"
    ]
  },
  {
    "id": "mcst-16",
    "name": "성문안 컨트리클럽",
    "location": "강원 원주시 지정면 월송석화로 431",
    "totalHoles": 18,
    "membershipType": "비회원제",
    "company": "에이치디씨리조트주식회사(조영환)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "비회원제",
      "18홀",
      "원주"
    ]
  },
  {
    "id": "mcst-17",
    "name": "센추리21컨트리클럽",
    "location": "강원 원주시 문막읍 궁말길 193",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "센추리개발㈜(이병철 차기광)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "회원제",
      "18홀",
      "원주"
    ]
  },
  {
    "id": "mcst-18",
    "name": "센추리21컨트리클럽Ⅱ",
    "location": "강원 원주시 문막읍 궁말길 193",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "센추리개발㈜(이병철 차기광)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "18홀",
      "원주"
    ]
  },
  {
    "id": "mcst-19",
    "name": "센추리21퍼블릭",
    "location": "강원 원주시 문막읍 궁말길 193",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "센추리개발㈜(이병철 차기광)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "9홀",
      "원주"
    ]
  },
  {
    "id": "mcst-20",
    "name": "파크밸리골프클럽",
    "location": "강원 원주시 소초면 바우실길 281",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "강원레저개발㈜(민병주)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "18홀",
      "원주"
    ]
  },
  {
    "id": "mcst-21",
    "name": "동서울레스피아",
    "location": "강원 원주시 지정면 신평석화로 236",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜동서울컨트리클럽(김기수)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "9홀",
      "원주"
    ]
  },
  {
    "id": "mcst-22",
    "name": "인터불고원주골프클럽",
    "location": "강원 원주시 동부순환로 200(반곡동)",
    "totalHoles": 9,
    "membershipType": "비회원제",
    "company": "㈜호텔인터불고 원주(김삼남)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "비회원제",
      "9홀",
      "원주"
    ]
  },
  {
    "id": "mcst-23",
    "name": "오로라 골프 앤 리조트",
    "location": "강원 원주시 신림면 구학산로 1520",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜구학파크랜드(신학명)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "18홀",
      "원주"
    ]
  },
  {
    "id": "mcst-24",
    "name": "샌드파인골프클럽",
    "location": "강원 강릉시 저동등길 53(저동)",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "㈜승산(허인영)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "회원제",
      "18홀",
      "강릉"
    ]
  },
  {
    "id": "mcst-25",
    "name": "메이플비치골프&리조트",
    "location": "강원 강릉시 강동면 풍호길 300-78",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "원익엘앤디㈜(이재천)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "18홀",
      "강릉"
    ]
  },
  {
    "id": "mcst-26",
    "name": "O2리조트 골프장",
    "location": "강원 태백시 서학로 861",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜오투리조트(김영윤)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "18홀",
      "태백"
    ]
  },
  {
    "id": "mcst-27",
    "name": "O2리조트 퍼블릭골프장",
    "location": "강원 태백시 서학로 861",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜오투리조트(김영윤)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "9홀",
      "태백"
    ]
  },
  {
    "id": "mcst-28",
    "name": "설악프라자컨트리클럽",
    "location": "강원 속초시 미시령로2983번길 56-20",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "한화호텔앤드리조트㈜(김형조)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "회원제",
      "18홀",
      "속초"
    ]
  },
  {
    "id": "mcst-29",
    "name": "영랑호컨트리클럽",
    "location": "강원 속초시 영랑호반길 170",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜신세계센트럴 영랑호리조트(박주형)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "9홀",
      "속초"
    ]
  },
  {
    "id": "mcst-30",
    "name": "파인밸리컨트리클럽",
    "location": "강원 삼척시 근덕면 미근로 1629",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜동양레저(강선)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "18홀",
      "삼척"
    ]
  },
  {
    "id": "mcst-31",
    "name": "블랙밸리컨트리클럽",
    "location": "강원 삼척시 도계읍 도상로 307-84",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "블랙밸리컨트리클럽㈜(홍용기)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "18홀",
      "삼척"
    ]
  },
  {
    "id": "mcst-32",
    "name": "소노펠리체 컨트리클럽 비발디파크 웨스트",
    "location": "강원 홍천군 서면 한치골길 200",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜소노인터내셔널(이광수 이병천)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "18홀",
      "홍천"
    ]
  },
  {
    "id": "mcst-33",
    "name": "소노펠리체 컨트리클럽 비발디파크 마운틴",
    "location": "강원 홍천군 서면 한치골길 264",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜소노인터내셔널(이광수 이병천)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "9홀",
      "홍천"
    ]
  },
  {
    "id": "mcst-34",
    "name": "소노펠리체 컨트리클럽 비발디파크 이스트",
    "location": "강원 홍천군 서면 한치골길 541-123",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜소노인터내셔널(이광수 이병천)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "18홀",
      "홍천"
    ]
  },
  {
    "id": "mcst-35",
    "name": "비콘힐스골프클럽",
    "location": "강원 홍천군 홍천읍 높은터로 533",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "우신물산㈜(박준엽)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "18홀",
      "홍천"
    ]
  },
  {
    "id": "mcst-36",
    "name": "힐드로사이컨트리클럽",
    "location": "강원 홍천군 남면 한서로 2840",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜이지아이아이앤디(문기훈)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "18홀",
      "홍천"
    ]
  },
  {
    "id": "mcst-37",
    "name": "클럽모우골프 &라이프스타일",
    "location": "강원 홍천군 서면 장락동길 111",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "㈜와이에이치레저개발(박윤하 윤영우)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "27홀",
      "홍천"
    ]
  },
  {
    "id": "mcst-38",
    "name": "세이지우드CC홍천",
    "location": "강원 홍천군 두촌면 광석로 898-160",
    "totalHoles": 27,
    "membershipType": "비회원제",
    "company": "와이케이디벨롭먼트㈜(김승건)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "강원",
      "비회원제",
      "27홀",
      "홍천"
    ]
  },
  {
    "id": "mcst-39",
    "name": "샤인데일골프&리조트",
    "location": "강원 홍천군 서면 한서로 247-156",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "세안레져산업㈜(이욱재 이영호 이한상)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "27홀",
      "홍천"
    ]
  },
  {
    "id": "mcst-40",
    "name": "카스카디아 골프클럽",
    "location": "강원 홍천군 북방면 팔봉산로 1759",
    "totalHoles": 27,
    "membershipType": "비회원제",
    "company": "㈜유니골프앤리조트(김동환)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "강원",
      "비회원제",
      "27홀",
      "홍천"
    ]
  },
  {
    "id": "mcst-41",
    "name": "웰리힐리컨트리클럽",
    "location": "강원 횡성군 둔내면 고원로 451",
    "totalHoles": 36,
    "membershipType": "회원제",
    "company": "신안종합리조트㈜(민영민)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "강원",
      "회원제",
      "36홀",
      "횡성"
    ]
  },
  {
    "id": "mcst-42",
    "name": "웰리힐리퍼블릭",
    "location": "강원 횡성군 둔내면 고원로 451",
    "totalHoles": 10,
    "membershipType": "비회원제",
    "company": "신안종합리조트㈜(민영민)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "비회원제",
      "10홀",
      "횡성"
    ]
  },
  {
    "id": "mcst-43",
    "name": "동원썬밸리컨트리클럽",
    "location": "강원 횡성군 서원면 서원서로339번길 90",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "성운개발㈜(구자성)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "18홀",
      "횡성"
    ]
  },
  {
    "id": "mcst-44",
    "name": "알프스대영컨트리클럽",
    "location": "강원 횡성군 우천면 한우로 1295",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "삼대양레저㈜(권혁희)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "18홀",
      "횡성"
    ]
  },
  {
    "id": "mcst-45",
    "name": "벨라스톤컨트리클럽",
    "location": "강원 횡성군 서원면 옥계9길 124",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "(주)진원(홍재원)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "18홀",
      "횡성"
    ]
  },
  {
    "id": "mcst-46",
    "name": "올데이 옥스필드",
    "location": "강원 횡성군 서원면 경강로 유현6길 28",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "주식회사 에스엘세레스(최창호)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "18홀",
      "횡성"
    ]
  },
  {
    "id": "mcst-47",
    "name": "벨라45 오너스 컨트리클럽",
    "location": "강원 횡성군 서원면 창촌리 산132",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "㈜벨라비손",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "회원제",
      "18홀",
      "횡성"
    ]
  },
  {
    "id": "mcst-48",
    "name": "벨라45마스터스 컨트리클럽",
    "location": "강원 횡성군 서원면 창촌리 산124",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "㈜섬강레저",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "27홀",
      "횡성"
    ]
  },
  {
    "id": "mcst-49",
    "name": "동강시스타 골프장",
    "location": "강원 영월군 영월읍 사지막길 160",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "에스엠하이플러스㈜(박흥준)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "18홀",
      "영월"
    ]
  },
  {
    "id": "mcst-50",
    "name": "용평리조트골프클럽",
    "location": "강원 평창군 대관령면 올림픽로 715",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "모나용평㈜(신달순 임학운)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "회원제",
      "18홀",
      "평창"
    ]
  },
  {
    "id": "mcst-51",
    "name": "용평버치힐골프클럽",
    "location": "강원 평창군 대관령면 올림픽로 715",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "모나용평㈜(신달순 임학운)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "회원제",
      "18홀",
      "평창"
    ]
  },
  {
    "id": "mcst-52",
    "name": "용평리조트대중골프장",
    "location": "강원 평창군 대관령면 올림픽로 715",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "모나용평㈜(신달순 임학운)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "9홀",
      "평창"
    ]
  },
  {
    "id": "mcst-53",
    "name": "휘닉스 컨트리클럽",
    "location": "강원 평창군 봉평면 태기로 227-84",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "㈜휘닉스중앙(전영기)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "회원제",
      "18홀",
      "평창"
    ]
  },
  {
    "id": "mcst-54",
    "name": "휘닉스대중골프장",
    "location": "강원 평창군 봉평면 태기로 227-84",
    "totalHoles": 6,
    "membershipType": "대중제",
    "company": "㈜휘닉스중앙(전영기)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "6홀",
      "평창"
    ]
  },
  {
    "id": "mcst-55",
    "name": "알펜시아컨트리클럽",
    "location": "강원 평창군 대관령면 솔봉로 325",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "㈜레저플러스(반영삼)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "강원",
      "회원제",
      "27홀",
      "평창"
    ]
  },
  {
    "id": "mcst-56",
    "name": "알펜시아 700골프클럽",
    "location": "강원 평창군 대관령면 솔봉로 325",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜레저플러스(반영삼)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "18홀",
      "평창"
    ]
  },
  {
    "id": "mcst-57",
    "name": "하이원컨트리클럽",
    "location": "강원 정선군 고한읍 고한7길 399",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜강원랜드(이삼걸)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "18홀",
      "정선"
    ]
  },
  {
    "id": "mcst-58",
    "name": "에콜리안정선골프장",
    "location": "강원 정선군 신동읍 새골길 112-49",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "정선군국민체육진흥공단",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "9홀",
      "정선"
    ]
  },
  {
    "id": "mcst-59",
    "name": "한탄강컨트리클럽",
    "location": "강원 철원군 갈말읍 순담길 59",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜귀뚜라미랜드(이의병)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "18홀",
      "철원"
    ]
  },
  {
    "id": "mcst-60",
    "name": "설악썬밸리컨트리클럽",
    "location": "강원 고성군 죽왕면 순포로 188",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "㈜동광개발(구자성)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "27홀",
      "고성"
    ]
  },
  {
    "id": "mcst-61",
    "name": "소노펠리체 컨트리클럽 델피노",
    "location": "강원 고성군 토성면 미시령옛길 1153",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜소노인터내셔널(이광수 이병천)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "18홀",
      "고성"
    ]
  },
  {
    "id": "mcst-62",
    "name": "파인리즈컨트리클럽",
    "location": "강원 고성군 토성면 잼버리동로 267",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "(주)에이치제이매그놀리아용평파인리즈골프앤리조트(신달순)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "27홀",
      "고성"
    ]
  },
  {
    "id": "mcst-63",
    "name": "설해원",
    "location": "강원 양양군 손양면 공항로 230",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "㈜새서울레저(안제근)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "27홀",
      "양양"
    ]
  },
  {
    "id": "mcst-64",
    "name": "설해원더 레전드 코스",
    "location": "강원 양양군 손양면 공항로 230",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜새서울레저(안제근)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "강원",
      "대중제",
      "18홀",
      "양양"
    ]
  },
  {
    "id": "mcst-65",
    "name": "한원컨트리클럽",
    "location": "경기도 용인시 처인구 남사읍 전나무골길2번길 94",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "㈜한원컨트리클럽",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "27홀",
      "용인"
    ]
  },
  {
    "id": "mcst-66",
    "name": "양지파인골프클럽",
    "location": "경기도 용인시 처인구 양지면 남평로 112",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "미래개발㈜",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "27홀",
      "용인"
    ]
  },
  {
    "id": "mcst-67",
    "name": "수원컨트리클럽",
    "location": "경기도 용인시 기흥구 중부대로 495",
    "totalHoles": 36,
    "membershipType": "회원제",
    "company": "㈜삼흥",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "36홀",
      "용인"
    ]
  },
  {
    "id": "mcst-68",
    "name": "플라자CC",
    "location": "경기도 용인시 처인구 남사읍 봉무로 153번길 79",
    "totalHoles": 36,
    "membershipType": "회원제",
    "company": "한화호텔앤드리조트㈜",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "36홀",
      "용인"
    ]
  },
  {
    "id": "mcst-69",
    "name": "태광컨트리클럽(회원제)",
    "location": "경기도 용인시 기흥구 흥덕4로 77",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "㈜티시스",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "27홀",
      "용인"
    ]
  },
  {
    "id": "mcst-70",
    "name": "태광컨트리클럽(대중제)",
    "location": "경기도 용인시 기흥구 흥덕4로 77",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜티시스",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "9홀",
      "용인"
    ]
  },
  {
    "id": "mcst-71",
    "name": "한성컨트리클럽",
    "location": "경기도 용인시 기흥구 구교동로 151",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "한성관광개발㈜",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "27홀",
      "용인"
    ]
  },
  {
    "id": "mcst-72",
    "name": "골드컨트리클럽",
    "location": "경기도 용인시 기흥구 기흥단지로 398",
    "totalHoles": 36,
    "membershipType": "회원제",
    "company": "기흥관광개발㈜",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "36홀",
      "용인"
    ]
  },
  {
    "id": "mcst-73",
    "name": "국가보훈부 88골프장",
    "location": "경기도 용인시 기흥구 석성로 521번길 169",
    "totalHoles": 36,
    "membershipType": "회원제",
    "company": "88관광개발㈜",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "36홀",
      "용인"
    ]
  },
  {
    "id": "mcst-74",
    "name": "레이크사이드CC(대중제)",
    "location": "경기도 용인시 처인구 모현읍 능원로 181",
    "totalHoles": 36,
    "membershipType": "대중제",
    "company": "㈜서울레이크사이드",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "36홀",
      "용인"
    ]
  },
  {
    "id": "mcst-75",
    "name": "레이크사이드CC(회원제)",
    "location": "경기도 용인시 처인구 모현읍 능원로 181",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "㈜서울레이크사이드",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "용인"
    ]
  },
  {
    "id": "mcst-76",
    "name": "남부컨트리클럽",
    "location": "경기도 용인시 기흥구 사은로 163",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "금보개발㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "용인"
    ]
  },
  {
    "id": "mcst-77",
    "name": "신원CC",
    "location": "경기도 용인시 이동읍 이원로 225",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "㈜일신레져",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "27홀",
      "용인"
    ]
  },
  {
    "id": "mcst-78",
    "name": "은화삼컨트리클럽",
    "location": "경기도 용인시 처인구 백옥대로 860-38",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "은화삼컨트리클럽㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "용인"
    ]
  },
  {
    "id": "mcst-79",
    "name": "아시아나컨트리클럽",
    "location": "경기도 용인시 처인구 양지면 양대로 290",
    "totalHoles": 36,
    "membershipType": "회원제",
    "company": "금호리조트㈜",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "36홀",
      "용인"
    ]
  },
  {
    "id": "mcst-80",
    "name": "블루원용인CC(회원제)",
    "location": "경기도 용인시 처인구 원삼면 보개원삼로 1534번길 40",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "㈜블루원",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "용인"
    ]
  },
  {
    "id": "mcst-81",
    "name": "블루원용인CC(비회원제)",
    "location": "경기도 용인시 처인구 원삼면 보개원삼로 1534번길 40",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜블루원",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "9홀",
      "용인"
    ]
  },
  {
    "id": "mcst-82",
    "name": "코리아컨트리클럽",
    "location": "경기도 용인시 처인구 이동읍 기흥단지로 579",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "뉴경기관광㈜",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "27홀",
      "용인"
    ]
  },
  {
    "id": "mcst-83",
    "name": "코리아대중CC",
    "location": "경기도 용인시 기흥구 기흥단지로 224",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜지에이코리아",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "9홀",
      "용인"
    ]
  },
  {
    "id": "mcst-84",
    "name": "지산컨트리클럽",
    "location": "경기도 용인시 처인구 원삼면 죽양대로 2000번길 60",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "지산리조트㈜",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "27홀",
      "용인"
    ]
  },
  {
    "id": "mcst-85",
    "name": "지산퍼블릭",
    "location": "경기도 용인시 처인구 원삼면 죽양대로 2100번길 60",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "지산리조트㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "9홀",
      "용인"
    ]
  },
  {
    "id": "mcst-86",
    "name": "화산컨트리클럽",
    "location": "경기도 용인시 처인구 이동읍 화산로 239",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "화산개발㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "용인"
    ]
  },
  {
    "id": "mcst-87",
    "name": "한림용인CC",
    "location": "경기도 용인시 처인구 남사읍 경기동로 628",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "이병진",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "27홀",
      "용인"
    ]
  },
  {
    "id": "mcst-88",
    "name": "글렌로스 골프클럽",
    "location": "경기도 용인시 처인구 포곡읍 에버랜드로 562번길 69",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "삼성물산㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "9홀",
      "용인"
    ]
  },
  {
    "id": "mcst-89",
    "name": "용인CC",
    "location": "경기도 용인시 처인구 백암면 황새울로 255",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜용인씨씨",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "9홀",
      "용인"
    ]
  },
  {
    "id": "mcst-90",
    "name": "석천CC",
    "location": "경기도 용인시 처인구 백암면 황새울로 255",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "석천씨씨㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "9홀",
      "용인"
    ]
  },
  {
    "id": "mcst-91",
    "name": "써닝포인트 컨트리클럽",
    "location": "경기도 용인시 처인구 백암면 고안로 51번길 205",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜에스엘케이",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "18홀",
      "용인"
    ]
  },
  {
    "id": "mcst-92",
    "name": "해솔리아 컨트리클럽",
    "location": "경기도 용인시 처인구 이동읍 백자로 369",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "해솔리아컨트리클럽㈜",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "27홀",
      "용인"
    ]
  },
  {
    "id": "mcst-93",
    "name": "세현CC",
    "location": "경기도 용인시 처인구 이동읍 백자로 450",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜세현씨씨",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "18홀",
      "용인"
    ]
  },
  {
    "id": "mcst-94",
    "name": "한양컨트리클럽",
    "location": "경기도 고양시 덕양구 고양대로1643번길 164",
    "totalHoles": 36,
    "membershipType": "회원제",
    "company": "㈜한양컨트리클럽",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "36홀",
      "고양"
    ]
  },
  {
    "id": "mcst-95",
    "name": "뉴코리아 컨트리클럽",
    "location": "경기도 고양시 덕양구 신원2로 57",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "신고려관광㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "고양"
    ]
  },
  {
    "id": "mcst-96",
    "name": "고양컨트리클럽",
    "location": "경기도 고양시 덕양구 흥도로 304-23",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "고양컨트리클럽㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "9홀",
      "고양"
    ]
  },
  {
    "id": "mcst-97",
    "name": "1·2·3 골프장",
    "location": "경기도 고양시 덕양구 통일로 43-168",
    "totalHoles": 6,
    "membershipType": "대중제",
    "company": "㈜123골프클럽",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "6홀",
      "고양"
    ]
  },
  {
    "id": "mcst-98",
    "name": "올림픽 골프장",
    "location": "경기도 고양시 덕양구 혜음로 301",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜올림픽컨트리클럽",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "9홀",
      "고양"
    ]
  },
  {
    "id": "mcst-99",
    "name": "일산스프링힐스 컨트리클럽",
    "location": "경기도 고양시 일산동구 산황로 108",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "고양스포츠",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "9홀",
      "고양"
    ]
  },
  {
    "id": "mcst-100",
    "name": "한양파인컨트리클럽",
    "location": "경기도 고양시 덕양구 고양대로 1591",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "(사)서울컨트리클럽",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "9홀",
      "고양"
    ]
  },
  {
    "id": "mcst-101",
    "name": "남서울컨트리클럽",
    "location": "경기도 성남시 분당구 판교백현로 161",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "경원건설㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "성남"
    ]
  },
  {
    "id": "mcst-102",
    "name": "리베라컨트리클럽",
    "location": "경기도 화성시 중리길 183",
    "totalHoles": 36,
    "membershipType": "회원제",
    "company": "㈜관악",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "36홀",
      "화성"
    ]
  },
  {
    "id": "mcst-103",
    "name": "기흥컨트리클럽",
    "location": "경기도 화성시 풀무골로106번길 244",
    "totalHoles": 36,
    "membershipType": "회원제",
    "company": "삼남개발㈜",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "36홀",
      "화성"
    ]
  },
  {
    "id": "mcst-104",
    "name": "발리오스컨트리클럽(회원제)",
    "location": "경기도 화성시 팔탄면 3.1만세로 641-28",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "신창기업㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "화성"
    ]
  },
  {
    "id": "mcst-105",
    "name": "발리오스컨트리클럽(비회원제)",
    "location": "경기도 화성시 팔탄면 3.1만세로 641-28",
    "totalHoles": 9,
    "membershipType": "비회원제",
    "company": "신창기업㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "비회원제",
      "9홀",
      "화성"
    ]
  },
  {
    "id": "mcst-106",
    "name": "라비돌컨트리클럽",
    "location": "경기도 화성시 정남면 세자로 286",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜라비돌",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "9홀",
      "화성"
    ]
  },
  {
    "id": "mcst-107",
    "name": "화성 상록G.C",
    "location": "경기도 화성시 풀무골로60번길 80",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "공무원연금공단",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "27홀",
      "화성"
    ]
  },
  {
    "id": "mcst-108",
    "name": "화성골프클럽",
    "location": "경기도 화성시 남양읍 화성로 1393-27",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜리더스",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "9홀",
      "화성"
    ]
  },
  {
    "id": "mcst-109",
    "name": "링크나인골프클럽",
    "location": "경기도 화성시 마도면 해운로630번길 49",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜금당개발",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "9홀",
      "화성"
    ]
  },
  {
    "id": "mcst-110",
    "name": "양주 컨트리클럽",
    "location": "경기도 남양주시 화도읍 북한강로 1525-52",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "근영농산㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "남양주"
    ]
  },
  {
    "id": "mcst-111",
    "name": "광릉CC(회원제)",
    "location": "경기도 남양주시 진접읍 팔야로 280",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "광릉레져개발㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "남양주"
    ]
  },
  {
    "id": "mcst-112",
    "name": "광릉CC(비회원제)",
    "location": "경기도 남양주시 진접읍 팔야로 280",
    "totalHoles": 6,
    "membershipType": "대중제",
    "company": "광릉레져개발㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "6홀",
      "남양주"
    ]
  },
  {
    "id": "mcst-113",
    "name": "비전힐스CC",
    "location": "경기도 남양주시 화도읍 마치로 226-220",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "㈜비젼힐스",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "남양주"
    ]
  },
  {
    "id": "mcst-114",
    "name": "해비치 컨트리클럽",
    "location": "경기도 남양주시 화도읍 재재기로 190번길 160",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "해비치컨트리클럽㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "남양주"
    ]
  },
  {
    "id": "mcst-115",
    "name": "남양주CC",
    "location": "경기도 남양주시 오남읍 진건오남로 516-31",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "라미드관광㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "9홀",
      "남양주"
    ]
  },
  {
    "id": "mcst-116",
    "name": "더헤븐 컨트리클럽",
    "location": "경기도 안산시 단원구 대선로466(대부남동)",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "㈜더헤븐리조트",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "27홀",
      "안산"
    ]
  },
  {
    "id": "mcst-117",
    "name": "제일컨트리클럽",
    "location": "경기도 안산시 상록구 태마당로28(부곡동)",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "㈜제일스포츠센타",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "27홀",
      "안산"
    ]
  },
  {
    "id": "mcst-118",
    "name": "솔트베이 골프클럽",
    "location": "경기도 시흥시 마유로 987 (장곡동)",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜성담",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "18홀",
      "흥"
    ]
  },
  {
    "id": "mcst-119",
    "name": "아세코밸리골프클럽",
    "location": "경기도 시흥시 마전로 307 (거모동)",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜아세코",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "9홀",
      "흥"
    ]
  },
  {
    "id": "mcst-120",
    "name": "김포SEASIDE 컨트리클럽",
    "location": "경기도 김포시 월곶면 김포대로 2081번길 219",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "해강개발㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "김포"
    ]
  },
  {
    "id": "mcst-121",
    "name": "서서울 컨트리클럽",
    "location": "경기도 파주시 광탄면 혜음로 324",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "호반서서울㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "파주"
    ]
  },
  {
    "id": "mcst-122",
    "name": "서원밸리 골프장",
    "location": "경기도 파주시 광탄면 서원길 333",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "서원레저㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "파주"
    ]
  },
  {
    "id": "mcst-123",
    "name": "서원힐스 골프장",
    "location": "경기도 파주시 광탄면 서원길 333",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "서원레저㈜",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "27홀",
      "파주"
    ]
  },
  {
    "id": "mcst-124",
    "name": "파주 J-Public 골프장",
    "location": "경기도 파주시 조리읍 장곡로 100",
    "totalHoles": 6,
    "membershipType": "대중제",
    "company": "㈜포스코와이드",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "6홀",
      "파주"
    ]
  },
  {
    "id": "mcst-125",
    "name": "파주컨트리클럽",
    "location": "경기도 파주시 법원읍 화합로 306",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜파주컨트리클럽",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "18홀",
      "파주"
    ]
  },
  {
    "id": "mcst-126",
    "name": "베스트밸리 골프클럽",
    "location": "경기도 파주시 광탄면 장지산로200번길 32-41",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜베스트밸리골프클럽",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "9홀",
      "파주"
    ]
  },
  {
    "id": "mcst-127",
    "name": "노스팜 컨트리클럽",
    "location": "경기도 파주시 광탄면 쇠장이길 265",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜노스팜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "18홀",
      "파주"
    ]
  },
  {
    "id": "mcst-128",
    "name": "스마트KU 골프 파빌리온",
    "location": "경기도 파주시 법원읍 보광로 1616",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "학교법인 건국대학교",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "27홀",
      "파주"
    ]
  },
  {
    "id": "mcst-129",
    "name": "타이거CC 골프장",
    "location": "경기도 파주시 법원읍 술이홀로 1803",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "(주)타이거레저",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "18홀",
      "파주"
    ]
  },
  {
    "id": "mcst-130",
    "name": "남촌컨트리클럽",
    "location": "경기도 광주시 곤지암읍 부항길 135-38",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "남촌레저개발㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "광주"
    ]
  },
  {
    "id": "mcst-131",
    "name": "이스트밸리CC",
    "location": "경기도 광주시 곤지암읍 건업길 195",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "청남관광㈜",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "27홀",
      "광주"
    ]
  },
  {
    "id": "mcst-132",
    "name": "그린힐 컨트리클럽",
    "location": "경기도 광주시 곤지암읍 내선길 176",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "신안개발㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "광주"
    ]
  },
  {
    "id": "mcst-133",
    "name": "강남300 컨트리클럽",
    "location": "경기도 광주시 새말길 353(목동)",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "강남300컨트리클럽㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "광주"
    ]
  },
  {
    "id": "mcst-134",
    "name": "로제비앙GC",
    "location": "경기도 광주시 곤지암읍 오항길 180",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "경기관광개발㈜",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "27홀",
      "광주"
    ]
  },
  {
    "id": "mcst-135",
    "name": "곤지암GC",
    "location": "경기도 광주시 도척면 도척윗로 280",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "(주)디앤오",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "광주"
    ]
  },
  {
    "id": "mcst-136",
    "name": "중부컨트리클럽",
    "location": "경기도 광주시 곤지암읍 경충대로 451",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "애경중부컨트리㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "광주"
    ]
  },
  {
    "id": "mcst-137",
    "name": "뉴서울컨트리클럽",
    "location": "경기도 광주시 삼지곡길 95(삼동)",
    "totalHoles": 36,
    "membershipType": "회원제",
    "company": "한국문화예술위원회",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "36홀",
      "광주"
    ]
  },
  {
    "id": "mcst-138",
    "name": "캐슬렉스골프클럽",
    "location": "경기도 하남시 감이로 317(감이동)",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "㈜캐슬렉스서울",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "하남"
    ]
  },
  {
    "id": "mcst-139",
    "name": "안양컨트리클럽",
    "location": "경기도 군포시 군포로364(부곡동)",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "삼성물산㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "포"
    ]
  },
  {
    "id": "mcst-140",
    "name": "레이크우드 골프장(회원제)",
    "location": "경기도 양주시 만송로 244",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "로얄개발㈜",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "27홀",
      "양주"
    ]
  },
  {
    "id": "mcst-141",
    "name": "레이크우드 골프장(비회원제)",
    "location": "경기도 양주시 만송로 244",
    "totalHoles": 9,
    "membershipType": "비회원제",
    "company": "로얄개발㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "비회원제",
      "9홀",
      "양주"
    ]
  },
  {
    "id": "mcst-142",
    "name": "송추 컨트리클럽",
    "location": "경기도 양주시 광적면 쇠장이길 435",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "㈜티에스개발",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "양주"
    ]
  },
  {
    "id": "mcst-143",
    "name": "에이치원 클럽",
    "location": "경기도 이천시 호법면 장자터로 115",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "호반써밋㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "이천"
    ]
  },
  {
    "id": "mcst-144",
    "name": "뉴스프링빌골프장",
    "location": "경기도 이천시 모가면 사실로 527번길 158",
    "totalHoles": 36,
    "membershipType": "회원제",
    "company": "㈜동승골프앤리조트",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "36홀",
      "이천"
    ]
  },
  {
    "id": "mcst-145",
    "name": "뉴스프링빌골프장(대중형)",
    "location": "경기도 이천시 모가면 사실로 527번길 158",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜동승골프앤리조트",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "9홀",
      "이천"
    ]
  },
  {
    "id": "mcst-146",
    "name": "비에이비스타골프장(회원)",
    "location": "경기도 이천시 모가면 어농로 272",
    "totalHoles": 41,
    "membershipType": "회원제",
    "company": "삼풍관광㈜",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "41홀",
      "이천"
    ]
  },
  {
    "id": "mcst-147",
    "name": "비에이비스타컨트리클럽(비회원)",
    "location": "경기도 이천시 모가면 어농로 272",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "삼풍관광㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "18홀",
      "이천"
    ]
  },
  {
    "id": "mcst-148",
    "name": "더반 골프클럽",
    "location": "경기도 이천시 대월면 대월로 627-141",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜명문투자개발",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "9홀",
      "이천"
    ]
  },
  {
    "id": "mcst-149",
    "name": "사우스스프링스C.C",
    "location": "경기도 이천시 모가면 공원로 64",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜사우스스프링스",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "18홀",
      "이천"
    ]
  },
  {
    "id": "mcst-150",
    "name": "블랙스톤골프장(회원제)",
    "location": "경기도 이천시 장호원읍 장여로 459-160",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "㈜블랙스톤리조트 이천",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "이천"
    ]
  },
  {
    "id": "mcst-151",
    "name": "블랙스톤골프장(대중형)",
    "location": "경기도 이천시 장호원읍 장여로 459-160",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜블랙스톤리조트 이천",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "9홀",
      "이천"
    ]
  },
  {
    "id": "mcst-152",
    "name": "이천실크밸리골프클럽",
    "location": "경기도 이천시 율면 임오산로 296",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "이천실크밸리㈜",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "27홀",
      "이천"
    ]
  },
  {
    "id": "mcst-153",
    "name": "마이다스레이크 이천 골프&리조트",
    "location": "경기도 이천시 설성면 설가로 602",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "(주)대교디앤에스",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "27홀",
      "이천"
    ]
  },
  {
    "id": "mcst-154",
    "name": "웰링턴컨트리클럽",
    "location": "경기도 이천시 모가면 사실로 725번길 119-73",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "효성중공업㈜",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "27홀",
      "이천"
    ]
  },
  {
    "id": "mcst-155",
    "name": "더크로스비골프클럽",
    "location": "경기도 이천시 호법면 중부대로798번길 177",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "(주)호법포레",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "27홀",
      "이천"
    ]
  },
  {
    "id": "mcst-156",
    "name": "파인크리크C.C",
    "location": "경기도 안성시 양성면 안성맞춤대로 2417-13",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "㈜동양레저",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "27홀",
      "안성"
    ]
  },
  {
    "id": "mcst-157",
    "name": "골프클럽Q",
    "location": "경기도 안성시 죽산면 장계길 20-229",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "골프클럽큐레저산업 주식회사",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "18홀",
      "안성"
    ]
  },
  {
    "id": "mcst-158",
    "name": "골프존카운티 안성H",
    "location": "경기도 안성시 보개면 보삼로 302",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜골프존카운티",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "18홀",
      "안성"
    ]
  },
  {
    "id": "mcst-159",
    "name": "마에스트로 CC",
    "location": "경기도 안성시 양성면 안성맞춤대로 2134-36",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "천원종합개발 주식회사",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "18홀",
      "안성"
    ]
  },
  {
    "id": "mcst-160",
    "name": "안성컨트리클럽",
    "location": "경기도 안성시 죽산면 걸미로 487",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "㈜한일",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "안성"
    ]
  },
  {
    "id": "mcst-161",
    "name": "안성베네스트G.C",
    "location": "경기도 안성시 금광면 삼흥로 660",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "삼성물산㈜",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "27홀",
      "안성"
    ]
  },
  {
    "id": "mcst-162",
    "name": "안성베네스트골프클럽 일반대중홀",
    "location": "경기도 안성시 금광면 삼흥로 660",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "삼성물산㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "9홀",
      "안성"
    ]
  },
  {
    "id": "mcst-163",
    "name": "신안컨트리클럽",
    "location": "경기도 안성시 고삼면 개울말길 149",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "신안종합레져㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "안성"
    ]
  },
  {
    "id": "mcst-164",
    "name": "신안 퍼블릭 CC",
    "location": "경기도 안성시 고삼면 개울말길 149",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "신안종합레져㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "9홀",
      "안성"
    ]
  },
  {
    "id": "mcst-165",
    "name": "윈체스트 골프클럽 대중",
    "location": "경기도 안성시 서운면 오촌길 97-31",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜다림개발",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "18홀",
      "안성"
    ]
  },
  {
    "id": "mcst-166",
    "name": "포웰CC 안성",
    "location": "경기도 안성시 양성면 약산길 67-6",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "엔에이치투자증권㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "18홀",
      "안성"
    ]
  },
  {
    "id": "mcst-167",
    "name": "골프존카운티 안성W",
    "location": "경기도 안성시 양성면 교동길 19-70",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜골프존카운티",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "18홀",
      "안성"
    ]
  },
  {
    "id": "mcst-168",
    "name": "한림안성",
    "location": "경기도 안성시 양성면 양성로 349-61",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "일송개발㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "9홀",
      "안성"
    ]
  },
  {
    "id": "mcst-169",
    "name": "에덴블루 컨트리클럽",
    "location": "경기도 안성시 죽산면 녹배길 175",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "죽산개발㈜",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "27홀",
      "안성"
    ]
  },
  {
    "id": "mcst-170",
    "name": "이글몬트CC",
    "location": "경기도 안성시 보개면 보삼로 106",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "주식회사 지씨에이치피",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "27홀",
      "안성"
    ]
  },
  {
    "id": "mcst-171",
    "name": "필로스 골프클럽",
    "location": "경기도 포천시 일동면 운악청계로 1507",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "㈜선운",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "27홀",
      "포천"
    ]
  },
  {
    "id": "mcst-172",
    "name": "포천아도니스 C.C",
    "location": "경기도 포천시 신북면 포천로 2499",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "㈜아도니스",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "27홀",
      "포천"
    ]
  },
  {
    "id": "mcst-173",
    "name": "포천아도니스 대중골프장",
    "location": "경기도 포천시 신북면 포천로 2499",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜아도니스",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "9홀",
      "포천"
    ]
  },
  {
    "id": "mcst-174",
    "name": "베어크리크골프클럽",
    "location": "경기도 포천시 화현면 달인동로 35",
    "totalHoles": 36,
    "membershipType": "대중제",
    "company": "㈜삼보개발",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "36홀",
      "포천"
    ]
  },
  {
    "id": "mcst-175",
    "name": "몽베르 컨트리클럽(회원제)",
    "location": "경기도 포천시 영북면 산정호수로 359-12",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "몽베르컨트리클럽㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "포천"
    ]
  },
  {
    "id": "mcst-176",
    "name": "몽베르 컨트리클럽(비회원제)",
    "location": "경기도 포천시 영북면 산정호수로 359-13",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "몽베르컨트리클럽㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "18홀",
      "포천"
    ]
  },
  {
    "id": "mcst-177",
    "name": "일동레이크 골프클럽",
    "location": "경기도 포천시 일동면 화동로 738",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "농심개발㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "포천"
    ]
  },
  {
    "id": "mcst-178",
    "name": "일동레이크대중제골프장",
    "location": "경기도 포천시 일동면 화동로 738",
    "totalHoles": 12,
    "membershipType": "대중제",
    "company": "농심개발㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "12홀",
      "포천"
    ]
  },
  {
    "id": "mcst-179",
    "name": "푸른솔 골프클럽 포천",
    "location": "경기도 포천시 가산면 금우로276",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "유진레저(주)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "27홀",
      "포천"
    ]
  },
  {
    "id": "mcst-180",
    "name": "포천힐스 컨트리클럽",
    "location": "경기도 포천시 군내면 반월산성로 375번길 34",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "㈜한경엘앤디",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "27홀",
      "포천"
    ]
  },
  {
    "id": "mcst-181",
    "name": "포레스트힐 컨트리클럽",
    "location": "경기도 포천시 화현면 봉화로 253",
    "totalHoles": 24,
    "membershipType": "대중제",
    "company": "화현개발㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "24홀",
      "포천"
    ]
  },
  {
    "id": "mcst-182",
    "name": "참밸리 컨트리클럽",
    "location": "경기도 포천시 삼육사로 1982",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜참빛글로벌이앤씨",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "18홀",
      "포천"
    ]
  },
  {
    "id": "mcst-183",
    "name": "샴발라 컨트리클럽",
    "location": "경기도 포천시 군내면 청군로 2856-93",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜샴발라",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "18홀",
      "포천"
    ]
  },
  {
    "id": "mcst-184",
    "name": "라싸 골프클럽",
    "location": "경기도 포천시 이동면 제비울2길 161",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "라싸디벨로프먼트㈜",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "27홀",
      "포천"
    ]
  },
  {
    "id": "mcst-185",
    "name": "힐마루 골프앤리조트 포천",
    "location": "경기도 포천시 영중면 금화봉 4길 77-1",
    "totalHoles": 45,
    "membershipType": "대중제",
    "company": "㈜동훈",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "45홀",
      "포천"
    ]
  },
  {
    "id": "mcst-186",
    "name": "더스타휴 컨트리클럽",
    "location": "경기도 양평군 양동면 양동로 756",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "(주)한창산업개발",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "양평"
    ]
  },
  {
    "id": "mcst-187",
    "name": "양평TPC GC",
    "location": "경기도 양평군 지평면 대평평장길 113-8",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "대지개발㈜",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "27홀",
      "양평"
    ]
  },
  {
    "id": "mcst-188",
    "name": "YJC골프클럽",
    "location": "경기도 여주시 월평로 78",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "와이제이씨 주식회사",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "27홀",
      "여주"
    ]
  },
  {
    "id": "mcst-189",
    "name": "남여주대중골프장",
    "location": "경기도 여주시 가여로 532",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "남여주레저개발㈜",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "27홀",
      "여주"
    ]
  },
  {
    "id": "mcst-190",
    "name": "소피아그린",
    "location": "경기도 여주시 점동면 소피아그린길 84",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "더케이소피아그린㈜",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "27홀",
      "여주"
    ]
  },
  {
    "id": "mcst-191",
    "name": "솔모로골프장",
    "location": "경기도 여주시 가남읍 솔모로그린길 171",
    "totalHoles": 36,
    "membershipType": "회원제",
    "company": "(주)한일레저",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "36홀",
      "여주"
    ]
  },
  {
    "id": "mcst-192",
    "name": "금강컨트리클럽(회원)",
    "location": "경기도 여주시 가남읍 여주남로 541",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "(주)금강레저",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "여주"
    ]
  },
  {
    "id": "mcst-193",
    "name": "금강컨트리클럽(대중)",
    "location": "경기도 여주시 가남읍 여주남로 541",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "(주)금강레저",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "9홀",
      "여주"
    ]
  },
  {
    "id": "mcst-194",
    "name": "자유컨트리클럽",
    "location": "경기도 여주시 가남읍 자유그린길 69",
    "totalHoles": 36,
    "membershipType": "회원제",
    "company": "㈜조선호텔앤리조트 레져",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "36홀",
      "여주"
    ]
  },
  {
    "id": "mcst-195",
    "name": "빅토리아일반대중골프장",
    "location": "경기도 여주시 가남읍 송삼로 191",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "에스비레져㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "9홀",
      "여주"
    ]
  },
  {
    "id": "mcst-196",
    "name": "아리지 골프장",
    "location": "경기도 여주시 가남읍 아리지그린길 68",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "㈜아리지",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "27홀",
      "여주"
    ]
  },
  {
    "id": "mcst-197",
    "name": "이포골프장",
    "location": "경기도 여주시 금사면 장흥로 416",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "보광개발㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "여주"
    ]
  },
  {
    "id": "mcst-198",
    "name": "렉스필드 컨트리클럽(회원)",
    "location": "경기도 여주시 산북면 광여로 1115",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "(주)렉스필드컨트리클럽",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "여주"
    ]
  },
  {
    "id": "mcst-199",
    "name": "렉스필드 컨트리클럽(비회원)",
    "location": "경기도 여주시 산북면 광여로 1115",
    "totalHoles": 9,
    "membershipType": "비회원제",
    "company": "(주)렉스필드컨트리클럽",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "비회원제",
      "9홀",
      "여주"
    ]
  },
  {
    "id": "mcst-200",
    "name": "블루헤런G.C",
    "location": "경기도 여주시 대신면 고달사로 67",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "블루헤런㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "여주"
    ]
  },
  {
    "id": "mcst-201",
    "name": "신라컨트리클럽",
    "location": "경기도 여주시 북내면 신라그린길 84",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "㈜신라레저",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "27홀",
      "여주"
    ]
  },
  {
    "id": "mcst-202",
    "name": "스카이밸리골프장(회원)",
    "location": "경기도 여주시 북내면 운촌길 254",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "㈜이지아이레저",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "여주"
    ]
  },
  {
    "id": "mcst-203",
    "name": "스카이밸리골프장(비회원)",
    "location": "경기도 여주시 북내면 운촌길 254",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜이지아이레저",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "18홀",
      "여주"
    ]
  },
  {
    "id": "mcst-204",
    "name": "캐슬파인골프클럽",
    "location": "경기도 여주시 강천면 부평로 580",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "캐슬파인리조트㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "18홀",
      "여주"
    ]
  },
  {
    "id": "mcst-205",
    "name": "해슬리나인브릿지 컨트리클럽",
    "location": "경기도 여주시 명품1로 76",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "CJ대한통운㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "여주"
    ]
  },
  {
    "id": "mcst-206",
    "name": "세라지오GC",
    "location": "경기도 여주시 여양로 530",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "(주)신한은행",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "18홀",
      "여주"
    ]
  },
  {
    "id": "mcst-207",
    "name": "360도 컨트리클럽",
    "location": "경기도 여주시 강천면 부평로 609",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "제이타우젠트㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "18홀",
      "여주"
    ]
  },
  {
    "id": "mcst-208",
    "name": "여주썬밸리 컨트리클럽",
    "location": "경기도 여주시 강천면 강문로 872",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "동광레저㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "9홀",
      "여주"
    ]
  },
  {
    "id": "mcst-209",
    "name": "페럼클럽",
    "location": "경기도 여주시 점동면 점동로 181",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜페럼인프라",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "18홀",
      "여주"
    ]
  },
  {
    "id": "mcst-210",
    "name": "ROUTE52CC",
    "location": "경기도 여주시 북내면 중암1길 36",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "케이알레저㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "18홀",
      "여주"
    ]
  },
  {
    "id": "mcst-211",
    "name": "티클라우드컨트리클럽",
    "location": "경기도 동두천시 평화로 3202",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "㈜제이레저",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "동두천"
    ]
  },
  {
    "id": "mcst-212",
    "name": "썬힐G.C",
    "location": "경기도 가평군 조종면 운악청계로 809",
    "totalHoles": 36,
    "membershipType": "대중제",
    "company": "(주)다함레져",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "36홀",
      "가평"
    ]
  },
  {
    "id": "mcst-213",
    "name": "마이다스밸리 청평 골프클럽",
    "location": "경기도 가평군 설악면 다락재로 73-111",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "(주)대교디앤에스",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "가평"
    ]
  },
  {
    "id": "mcst-214",
    "name": "프리스틴밸리 골프클럽",
    "location": "경기도 가평군 설악면 유명로 1243-199",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "(주)평산투자개발",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "가평"
    ]
  },
  {
    "id": "mcst-215",
    "name": "아난티클럽서울",
    "location": "경기도 가평군 설악면 유명로 961-34",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "아난티클럽서울㈜",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "27홀",
      "가평"
    ]
  },
  {
    "id": "mcst-216",
    "name": "가평 베네스트G.C",
    "location": "경기도 가평군 상면 둔덕말길 232",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "삼성물산㈜",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "27홀",
      "가평"
    ]
  },
  {
    "id": "mcst-217",
    "name": "크리스탈밸리C.C",
    "location": "경기도 가평군 상면 대보간선로 602-111",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "㈜한송",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "회원제",
      "18홀",
      "가평"
    ]
  },
  {
    "id": "mcst-218",
    "name": "리앤리C.C",
    "location": "경기도 가평군 조종면 운악청계로 702-24",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "리앤리어드바이저스㈜",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "27홀",
      "가평"
    ]
  },
  {
    "id": "mcst-219",
    "name": "베뉴지CC",
    "location": "경기도 가평군 가평읍 용추로 171번길 100",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "부국관광㈜",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "27홀",
      "가평"
    ]
  },
  {
    "id": "mcst-220",
    "name": "자유로컨트리클럽",
    "location": "경기도 연천군 백학면 노아로297번길 179-55",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "백학관광개발원㈜",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경기",
      "수도권",
      "대중제",
      "27홀",
      "연천"
    ]
  },
  {
    "id": "mcst-221",
    "name": "창원컨트리클럽",
    "location": "경남 창원시 의창구 대봉로 137",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "㈜창원컨트리클럽 신진기",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경남",
      "경상",
      "회원제",
      "18홀",
      "창원"
    ]
  },
  {
    "id": "mcst-222",
    "name": "용원컨트리클럽",
    "location": "경남 창원시 진해구 가주로 133",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "용원개발㈜최정호",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경남",
      "경상",
      "회원제",
      "27홀",
      "창원"
    ]
  },
  {
    "id": "mcst-223",
    "name": "아라미르골프앤리조트",
    "location": "경남 창원시 진해구 수제로 36",
    "totalHoles": 36,
    "membershipType": "비회원제",
    "company": "㈜진해오션리조트최정호",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경남",
      "경상",
      "비회원제",
      "36홀",
      "창원"
    ]
  },
  {
    "id": "mcst-224",
    "name": "진주컨트리클럽",
    "location": "경남 진주시 진성면 진성로 464번길 82",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "진주개발㈜성세연",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경남",
      "경상",
      "대중제",
      "18홀",
      "진주"
    ]
  },
  {
    "id": "mcst-225",
    "name": "통영동원로얄컨트리클럽",
    "location": "경남 통영시 산양읍 담안길 240",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "동원관광개발㈜류경규",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경남",
      "경상",
      "대중제",
      "18홀",
      "통영"
    ]
  },
  {
    "id": "mcst-226",
    "name": "서경타니CC",
    "location": "경남 사천시 곤양면 흥신로 210",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "타니골프엔리조트㈜ 윤철지",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경남",
      "경상",
      "대중제",
      "27홀",
      "사천"
    ]
  },
  {
    "id": "mcst-227",
    "name": "서경타니CC",
    "location": "경남 사천시 곤양면 흥신로 210",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "타니골프엔리조트㈜ 윤철지",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경남",
      "경상",
      "대중제",
      "9홀",
      "사천"
    ]
  },
  {
    "id": "mcst-228",
    "name": "삼삼컨트리클럽",
    "location": "경남 사천시 축동면 화당산로 224",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "삼삼레져개발㈜박 명식",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경남",
      "경상",
      "대중제",
      "9홀",
      "사천"
    ]
  },
  {
    "id": "mcst-229",
    "name": "골프존카운티 사천",
    "location": "경남 사천시 서포면 구송로 151",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "㈜지씨사천서상현",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경남",
      "경상",
      "대중제",
      "27홀",
      "사천"
    ]
  },
  {
    "id": "mcst-230",
    "name": "가야컨트리클럽",
    "location": "경남 김해시 인제로 495",
    "totalHoles": 45,
    "membershipType": "회원제",
    "company": "가야개발㈜김영섭",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경남",
      "경상",
      "회원제",
      "45홀",
      "김해"
    ]
  },
  {
    "id": "mcst-231",
    "name": "가야컨트리클럽",
    "location": "경남 김해시 인제로 495",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "가야개발㈜김영섭",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경남",
      "경상",
      "대중제",
      "9홀",
      "김해"
    ]
  },
  {
    "id": "mcst-232",
    "name": "김해정산컨트리클럽",
    "location": "경남 김해시 주촌면 서부로 1637번길 299-194",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "정산개발㈜김호철",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경남",
      "경상",
      "회원제",
      "27홀",
      "김해"
    ]
  },
  {
    "id": "mcst-233",
    "name": "포웰CC 김해",
    "location": "경남 김해시 진례면 고모로 134번길 54-49",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "㈜메가비엠씨손주은 김기종",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경남",
      "경상",
      "회원제",
      "18홀",
      "김해"
    ]
  },
  {
    "id": "mcst-234",
    "name": "김해상록컨트리클럽",
    "location": "경남 김해시 한림면 김해대로 974번길 198",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "공무원연금공단김동극",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경남",
      "경상",
      "대중제",
      "18홀",
      "김해"
    ]
  },
  {
    "id": "mcst-235",
    "name": "리더스컨트리클럽",
    "location": "경남 밀양시 활성로 455",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "㈜리더스컨트리클럽석은경 김현상",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경남",
      "경상",
      "대중제",
      "27홀",
      "밀양"
    ]
  },
  {
    "id": "mcst-236",
    "name": "밀양컨트리클럽",
    "location": "경남 밀양시 부북면 전사포리 832",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜밀양컨트리클럽임경주",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경남",
      "경상",
      "대중제",
      "9홀",
      "밀양"
    ]
  },
  {
    "id": "mcst-237",
    "name": "밀양노벨컨트리클럽",
    "location": "경남 밀양시 단장면 단장로 946",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜밀양관광개발우정수",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경남",
      "경상",
      "대중제",
      "18홀",
      "밀양"
    ]
  },
  {
    "id": "mcst-238",
    "name": "밀양에스파크골프리조트",
    "location": "경남 밀양시 단장면 미촌리 889",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "밀양관광단지조성사업단㈜ 손호영",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경남",
      "경상",
      "대중제",
      "18홀",
      "밀양"
    ]
  },
  {
    "id": "mcst-239",
    "name": "거제드비치골프클럽",
    "location": "경남 거제시 장목면 거제북로 1573",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "드비치골프클럽㈜최석분",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경남",
      "경상",
      "회원제",
      "18홀",
      "거제"
    ]
  },
  {
    "id": "mcst-240",
    "name": "거제뷰컨트리클럽",
    "location": "경남 거제시 거제면 두동로 259-80",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜경암 김기만",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경남",
      "경상",
      "대중제",
      "18홀",
      "거제"
    ]
  },
  {
    "id": "mcst-241",
    "name": "통도파인이스트컨트리클럽",
    "location": "경남 양산시 하북면 신평남부길 78-130",
    "totalHoles": 36,
    "membershipType": "회원제",
    "company": "㈜동일리조트김은수 김천욱",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경남",
      "경상",
      "회원제",
      "36홀",
      "양산"
    ]
  },
  {
    "id": "mcst-242",
    "name": "동부산컨트리클럽",
    "location": "경남 양산시 매곡외산로 282",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "㈜동부산컨트리클럽최성필",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경남",
      "경상",
      "회원제",
      "27홀",
      "양산"
    ]
  },
  {
    "id": "mcst-243",
    "name": "에이원컨트리클럽",
    "location": "경남 양산시 덕명로 190",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "에이원컨트리클럽㈜ 이경재",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경남",
      "경상",
      "회원제",
      "27홀",
      "양산"
    ]
  },
  {
    "id": "mcst-244",
    "name": "에덴밸리컨트리클럽",
    "location": "경남 양산시 원동면 어실로 910",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "신세계개발㈜문성필",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경남",
      "경상",
      "회원제",
      "18홀",
      "양산"
    ]
  },
  {
    "id": "mcst-245",
    "name": "양산컨트리클럽",
    "location": "경남 양산시 상북면 충렬로 687",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "㈜양산컨트리클럽최병호",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경남",
      "경상",
      "대중제",
      "27홀",
      "양산"
    ]
  },
  {
    "id": "mcst-246",
    "name": "다이아몬드컨트리클럽",
    "location": "경남 양산시 상북면 공원로 305-391",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "다이아몬드컨트리클럽㈜  문 호",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경남",
      "경상",
      "대중제",
      "18홀",
      "양산"
    ]
  },
  {
    "id": "mcst-247",
    "name": "양산동원로얄CC",
    "location": "경남 양산시 어실로 380-45",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜아시아드종합개발이대림",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경남",
      "경상",
      "대중제",
      "18홀",
      "양산"
    ]
  },
  {
    "id": "mcst-248",
    "name": "의령친환경골프장",
    "location": "경남 의령군 의령읍 남강로 417",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "의령군수",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경남",
      "경상",
      "대중제",
      "9홀",
      "의령"
    ]
  },
  {
    "id": "mcst-249",
    "name": "의령 리온컨트리클럽",
    "location": "경남 의령군 칠곡면 지굴산로 101-33",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "우신레저㈜남경현",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경남",
      "경상",
      "대중제",
      "27홀",
      "의령"
    ]
  },
  {
    "id": "mcst-250",
    "name": "골프존카운티 경남",
    "location": "경남 함안군 칠원면 운무로 470",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜지씨경남서상현",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경남",
      "경상",
      "대중제",
      "18홀",
      "함안"
    ]
  },
  {
    "id": "mcst-251",
    "name": "부곡컨트리클럽",
    "location": "경남 창녕군 부곡면 온천로 445",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "현일개발㈜배영환",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경남",
      "경상",
      "회원제",
      "18홀",
      "창녕"
    ]
  },
  {
    "id": "mcst-252",
    "name": "힐마루컨트리클럽",
    "location": "경남 창녕군 장마면 영산계성로 469-195",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "㈜ 동 훈김점동",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경남",
      "경상",
      "회원제",
      "18홀",
      "창녕"
    ]
  },
  {
    "id": "mcst-253",
    "name": "힐마루컨트리클럽",
    "location": "경남 창녕군 장마면 영산계성로 469-195",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜ 동 훈김점동",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경남",
      "경상",
      "대중제",
      "18홀",
      "창녕"
    ]
  },
  {
    "id": "mcst-254",
    "name": "고성노벨컨트리클럽",
    "location": "경남 고성군 회화면 회진로 567",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "고성관광개발㈜박광환 최경훈",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경남",
      "경상",
      "회원제",
      "27홀",
      "고성"
    ]
  },
  {
    "id": "mcst-255",
    "name": "고성컨트리클럽",
    "location": "경남 고성군 고성읍 월평3길 250",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜ 쌍 마김기석",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경남",
      "경상",
      "대중제",
      "9홀",
      "고성"
    ]
  },
  {
    "id": "mcst-256",
    "name": "아난티남해CC",
    "location": "경남 남해군 남면 남서대로 1179번길 40-109",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜아난티이만규",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경남",
      "경상",
      "대중제",
      "9홀",
      "남해"
    ]
  },
  {
    "id": "mcst-257",
    "name": "아난티남해GC",
    "location": "경남 남해군 남면 남서대로 1179번길 40-109",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜아난티이만규",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경남",
      "경상",
      "대중제",
      "9홀",
      "남해"
    ]
  },
  {
    "id": "mcst-258",
    "name": "사우스케이프오너스클럽",
    "location": "경남 남해군 창선면 흥선로 1545",
    "totalHoles": 18,
    "membershipType": "비회원제",
    "company": "㈜사우스케이프강경수",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경남",
      "경상",
      "비회원제",
      "18홀",
      "남해"
    ]
  },
  {
    "id": "mcst-259",
    "name": "경남스카이뷰CC",
    "location": "경남 함양군 서상면 소로길 226",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "(주)경남관광호텔김도연 김종현",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경남",
      "경상",
      "대중제",
      "18홀",
      "함양"
    ]
  },
  {
    "id": "mcst-260",
    "name": "거창친환경대중골프장",
    "location": "경남 거창군 가조면 우륵길 410-284",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "거창군수",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경남",
      "경상",
      "대중제",
      "9홀",
      "거창"
    ]
  },
  {
    "id": "mcst-261",
    "name": "클럽디거창",
    "location": "경남 거창군 신원면 덕산리 산 13번지",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "㈜이도 최정훈",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경남",
      "경상",
      "대중제",
      "27홀",
      "거창"
    ]
  },
  {
    "id": "mcst-262",
    "name": "아델스코트 컨트리클럽",
    "location": "경남 합천군 가야면 가조가야로 1916-35",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "㈜에이스컨트리클럽이종훈",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경남",
      "경상",
      "대중제",
      "27홀",
      "합천"
    ]
  },
  {
    "id": "mcst-263",
    "name": "오션힐스포항C.C",
    "location": "경북 경상북도 포항시 북구 송라면 대전길 7",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "오션힐스골프앤리조트㈜ 이승도",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "회원제",
      "18홀",
      "포항"
    ]
  },
  {
    "id": "mcst-264",
    "name": "오션힐스포항C.C",
    "location": "경북 경상북도 포항시 북구 송라면 대전길 7",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "오션힐스골프앤리조트㈜ 이승도",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "9홀",
      "포항"
    ]
  },
  {
    "id": "mcst-265",
    "name": "청하이스턴C.C",
    "location": "경북 경상북도 포항시 청하면 용산길 94",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜이스턴 이일선",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "9홀",
      "포항"
    ]
  },
  {
    "id": "mcst-266",
    "name": "포항C.C",
    "location": "경북 경상북도 포항시 송라면 동해대로 2751번길 123",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜홍익레저산업 김청룡",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "18홀",
      "포항"
    ]
  },
  {
    "id": "mcst-267",
    "name": "경주신라C.C",
    "location": "경북 경상북도 경주시 보문로 319",
    "totalHoles": 36,
    "membershipType": "회원제",
    "company": "㈜경주신라CC 박태일",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경북",
      "경상",
      "회원제",
      "36홀",
      "경주"
    ]
  },
  {
    "id": "mcst-268",
    "name": "보문G.C",
    "location": "경북 경상북도 경주시 보문로 182-14",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "경북문화관광공사 김남일",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "18홀",
      "경주"
    ]
  },
  {
    "id": "mcst-269",
    "name": "경주C.C",
    "location": "경북 경상북도 경주시 보문로 182-98",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "보문개발㈜ 박흥국",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "27홀",
      "경주"
    ]
  },
  {
    "id": "mcst-270",
    "name": "마우나오션C.C",
    "location": "경북 경상북도 경주시 양남면 동남로 982",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "㈜엠오디 장재혁",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "회원제",
      "18홀",
      "경주"
    ]
  },
  {
    "id": "mcst-271",
    "name": "마우나오션블루",
    "location": "경북 경상북도 경주시 양남면 동남로 982",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜엠오디 장재혁",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "9홀",
      "경주"
    ]
  },
  {
    "id": "mcst-272",
    "name": "가든골프클럽",
    "location": "경북 경상북도 경주시 불국로 289-17",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜코오롱글로텍 김영범",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "9홀",
      "경주"
    ]
  },
  {
    "id": "mcst-273",
    "name": "우리G.C",
    "location": "경북 경상북도 경주시 양남면 동남로 972",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜퍼블릭개발 조영래",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "9홀",
      "경주"
    ]
  },
  {
    "id": "mcst-274",
    "name": "서라벌G.C",
    "location": "경북 경상북도 경주시 외동읍 내외로 577-189",
    "totalHoles": 36,
    "membershipType": "대중제",
    "company": "㈜서라벌 김광세",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "36홀",
      "경주"
    ]
  },
  {
    "id": "mcst-275",
    "name": "서라벌G.C",
    "location": "경북 경상북도 경주시 외동읍 내외로 577-189",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜디아너스 이명숙",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "9홀",
      "경주"
    ]
  },
  {
    "id": "mcst-276",
    "name": "골프존카운티 감포",
    "location": "경북 경상북도 경주시 감포읍 동해안로 1819-59",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜지씨감포 서상현",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "18홀",
      "경주"
    ]
  },
  {
    "id": "mcst-277",
    "name": "디아너스C.C",
    "location": "경북 경상북도 경주시 보불로 391",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "㈜강동씨앤엘 구희택 강대완",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경북",
      "경상",
      "회원제",
      "27홀",
      "경주"
    ]
  },
  {
    "id": "mcst-278",
    "name": "선리치G.C",
    "location": "경북 경상북도 경주시 안강읍 검단장골길 181-17",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜월성종합개발 이상걸",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "9홀",
      "경주"
    ]
  },
  {
    "id": "mcst-279",
    "name": "안강레전드G.C",
    "location": "경북 경상북도 경주시 안강읍 낙산길 85",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "옥산개발㈜ 허상호 김태열",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "9홀",
      "경주"
    ]
  },
  {
    "id": "mcst-280",
    "name": "이스트힐C.C",
    "location": "경북 경상북도 경주시 양남면 외남로 1377",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜청학씨앤디 성세연",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "18홀",
      "경주"
    ]
  },
  {
    "id": "mcst-281",
    "name": "힐스카이C.C",
    "location": "경북 경상북도 경주시 천북면 천강로 412-299",
    "totalHoles": 24,
    "membershipType": "대중제",
    "company": "㈜힐스카이 고진호",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "24홀",
      "경주"
    ]
  },
  {
    "id": "mcst-282",
    "name": "애플밸리C.C",
    "location": "경북 경상북도 김천시 어모면 작점로 606",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "에스엠하이플러스㈜ 우기원",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "9홀",
      "김천"
    ]
  },
  {
    "id": "mcst-283",
    "name": "포도C.C",
    "location": "경북 경상북도 김천시 구성면 남김천대로 2532",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "㈜다옴 이세홍",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "27홀",
      "김천"
    ]
  },
  {
    "id": "mcst-284",
    "name": "남안동C.C",
    "location": "경북 경상북도 안동시 일직면 풍일로 1887",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "디아이개발㈜ 박춘영",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "회원제",
      "18홀",
      "안동"
    ]
  },
  {
    "id": "mcst-285",
    "name": "안동리버힐C.C",
    "location": "경북 경상북도 안동시 풍천면 풍일로 1572",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "오이코스산업㈜ 이옥춘",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "회원제",
      "18홀",
      "안동"
    ]
  },
  {
    "id": "mcst-286",
    "name": "안동레이크골프클럽",
    "location": "경북 경상북도 안동시 관광단지로 316",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "경북문화관광공사 김남일",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "18홀",
      "안동"
    ]
  },
  {
    "id": "mcst-287",
    "name": "골프존카운티 선산",
    "location": "경북 경상북도 구미시 산동면 강동로 953-73",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "㈜지씨선산 서상현",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "회원제",
      "18홀",
      "미"
    ]
  },
  {
    "id": "mcst-288",
    "name": "골프존카운티 구미",
    "location": "경북 경상북도 구미시 산동면 강동로 953-74",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜지씨구미 서상현",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "18홀",
      "미"
    ]
  },
  {
    "id": "mcst-289",
    "name": "구미C.C",
    "location": "경북 경상북도 구미시 장천면 송백로 229",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "신구미개발㈜ 박병웅",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "27홀",
      "미"
    ]
  },
  {
    "id": "mcst-290",
    "name": "오펠G.C",
    "location": "경북 경상북도 영천시 고경면 호국로 1221-24",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "부성개발㈜ 구성식",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경북",
      "경상",
      "회원제",
      "27홀",
      "영천"
    ]
  },
  {
    "id": "mcst-291",
    "name": "영천C.C",
    "location": "경북 경상북도 영천시 임고면 방목길 34-2",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "임고개발㈜ 이승도",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경북",
      "경상",
      "회원제",
      "27홀",
      "영천"
    ]
  },
  {
    "id": "mcst-292",
    "name": "시엘G.C",
    "location": "경북 경상북도 영천시 청통면 청통로 334-41",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜금호개발 김도윤",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "9홀",
      "영천"
    ]
  },
  {
    "id": "mcst-293",
    "name": "청통골프장",
    "location": "경북 경상북도 영천시 청통면 청통로 733",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜골프존카운티영천 서상현㈜골프존카운티 서상현",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "18홀",
      "영천"
    ]
  },
  {
    "id": "mcst-294",
    "name": "블루원상주골프리조트",
    "location": "경북 경상북도 상주시 모서면 화현3길 127",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜블루원 윤재연",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "18홀",
      "상주"
    ]
  },
  {
    "id": "mcst-295",
    "name": "뉴스프링빌Ⅱ",
    "location": "경북 경상북도 상주시 모서면 백화로 40",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜동승레저 김용식 홍건표",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "18홀",
      "상주"
    ]
  },
  {
    "id": "mcst-296",
    "name": "문경레저타운골프장",
    "location": "경북 경상북도 문경시 마성면 문경골프장길 240",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜문경레저타운 정광호",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "18홀",
      "문경"
    ]
  },
  {
    "id": "mcst-297",
    "name": "대구C.C",
    "location": "경북 경상북도 경산시 진량읍 일연로 718-42",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "경산개발㈜ 우승수",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경북",
      "경상",
      "회원제",
      "27홀",
      "경산"
    ]
  },
  {
    "id": "mcst-298",
    "name": "인터불고컨트리클럽",
    "location": "경북 경상북도 경산시 삼성현로 614-26",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "인터불고컨트리클럽㈜ 최만수",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경북",
      "경상",
      "회원제",
      "27홀",
      "경산"
    ]
  },
  {
    "id": "mcst-299",
    "name": "엠스클럽의성",
    "location": "경북 경상북도 의성군 봉양면 농공마전길 125-78",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜바이오컨트리클럽 이하수 민병소",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "18홀",
      "의성"
    ]
  },
  {
    "id": "mcst-300",
    "name": "엠스클럽의성",
    "location": "경북 경상북도 의성군 봉양면 농공마전길 125-78",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "대지개발㈜ 문병동",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "9홀",
      "의성"
    ]
  },
  {
    "id": "mcst-301",
    "name": "파라지오C.C",
    "location": "경북 경상북도 의성군 봉양면 농공마전길 167",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜파라지오 최정헌 정영권",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "18홀",
      "의성"
    ]
  },
  {
    "id": "mcst-302",
    "name": "오션비치C.C",
    "location": "경북 경상북도 영덕군 강구면 동해대로 4265-43",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "㈜오션비치 박재선",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "27홀",
      "영덕"
    ]
  },
  {
    "id": "mcst-303",
    "name": "그레이스C.C",
    "location": "경북 경상북도 청도군 이서면 서녁길 91",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "㈜태왕아너스 이명숙",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "27홀",
      "청도"
    ]
  },
  {
    "id": "mcst-304",
    "name": "오션힐스청도G.C",
    "location": "경북 경상북도 청도군 매전면 곰티로 370-204",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "유창개발㈜ 이승도",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "18홀",
      "청도"
    ]
  },
  {
    "id": "mcst-305",
    "name": "펜타뷰골프클럽",
    "location": "경북 경상북도 청도군 금천면 금천로 709",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "아리유㈜ 이건순",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "9홀",
      "청도"
    ]
  },
  {
    "id": "mcst-306",
    "name": "유니밸리C.C",
    "location": "경북 경상북도 고령군 고령읍 일량로 588",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "고령컨트리클럽㈜ 정성운",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "9홀",
      "고령"
    ]
  },
  {
    "id": "mcst-307",
    "name": "마스터피스CC",
    "location": "경북 경상북도 고령군 쌍림면 산막길 47-80",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜누가개발 김인자",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "18홀",
      "고령"
    ]
  },
  {
    "id": "mcst-308",
    "name": "대가야CC",
    "location": "경북 경상북도 고령군 대가야읍 대가야로 1103",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜흥진레저 심병재",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "9홀",
      "고령"
    ]
  },
  {
    "id": "mcst-309",
    "name": "다산 샤인힐CC",
    "location": "경북 경상북도 고령군 다산면 벌지로 175-115",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "두강건설㈜ 이정익",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "18홀",
      "고령"
    ]
  },
  {
    "id": "mcst-310",
    "name": "파미힐스C.C",
    "location": "경북 경상북도 칠곡군 왜관읍 봉계로 263",
    "totalHoles": 36,
    "membershipType": "회원제",
    "company": "㈜한길 황광재 임충서으 김형일",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "경북",
      "경상",
      "회원제",
      "36홀",
      "칠곡"
    ]
  },
  {
    "id": "mcst-311",
    "name": "마이다스 구미 골프아카데미",
    "location": "경북 경상북도 칠곡군 가산면 학하2길 54-171",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜대교디앤에스 최득희",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "9홀",
      "칠곡"
    ]
  },
  {
    "id": "mcst-312",
    "name": "세븐밸리C.C",
    "location": "경북 경상북도 칠곡군 왜관읍 봉계3길 180",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜세븐밸리제이씨 강기백",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "18홀",
      "칠곡"
    ]
  },
  {
    "id": "mcst-313",
    "name": "칠곡아이위시C.C",
    "location": "경북 경상북도 칠곡군 기산면 노석1길 49-112",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜동화레져 문종혁",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "9홀",
      "칠곡"
    ]
  },
  {
    "id": "mcst-314",
    "name": "한맥C.C&노블리아",
    "location": "경북 경상북도 예천군 호명면 한맥골프장길 72",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "한맥개발㈜ 임기주",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "18홀",
      "예천"
    ]
  },
  {
    "id": "mcst-315",
    "name": "마린CC",
    "location": "경북 경상북도 울진군 매화면 매화로 115-99",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "울진군수",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "경북",
      "경상",
      "대중제",
      "18홀",
      "울진"
    ]
  },
  {
    "id": "mcst-316",
    "name": "빛고을컨트리클럽",
    "location": "광주광역시 남구 효우로 153(노대동)",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "광주광역시도시공사사장",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "광주",
      "전라",
      "대중제",
      "9홀",
      "광주광역"
    ]
  },
  {
    "id": "mcst-317",
    "name": "에콜리안광산골프장",
    "location": "광주광역시 광산구 오목내길 26(연산동)",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "국민체육진흥공단이사장",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "광주",
      "전라",
      "대중제",
      "9홀",
      "광주광역"
    ]
  },
  {
    "id": "mcst-318",
    "name": "어등산컨트리클럽",
    "location": "광주광역시 광산구 무진대로 31(운수동)",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "(주)어등산리조트대표이사 고경주",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "광주",
      "전라",
      "대중제",
      "27홀",
      "광주광역"
    ]
  },
  {
    "id": "mcst-319",
    "name": "팔공컨트리클럽",
    "location": "대구광역시 동구 팔공산로 237길 186",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "우경개발㈜ (정찬우)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "대구",
      "경상",
      "회원제",
      "18홀",
      "대광역"
    ]
  },
  {
    "id": "mcst-320",
    "name": "냉천컨트리클럽",
    "location": "대구광역시 달성군 가창면 가창로 1037-9",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "냉천개발㈜ (윤상락)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "대구",
      "경상",
      "대중제",
      "9홀",
      "대광역"
    ]
  },
  {
    "id": "mcst-321",
    "name": "구니컨트리클럽",
    "location": "대구광역시 군위군 군위읍 도군로 2450",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "케이알스포츠㈜ (정하석)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "대구",
      "경상",
      "대중제",
      "18홀",
      "대광역"
    ]
  },
  {
    "id": "mcst-322",
    "name": "오펠골프클럽",
    "location": "대구광역시 군위군 산성면 부흥로 227",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "신우개발㈜ (이정익)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "대구",
      "경상",
      "대중제",
      "18홀",
      "대광역"
    ]
  },
  {
    "id": "mcst-323",
    "name": "이지스카이컨트리클럽",
    "location": "대구광역시 군위군 군위읍 대흥1길 48-100",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜이지컨트리클럽(박현철)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "대구",
      "경상",
      "대중제",
      "18홀",
      "대광역"
    ]
  },
  {
    "id": "mcst-324",
    "name": "유성컨트리클럽",
    "location": "대전 유성구 현충원로 200(덕명동 215-7번지)",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "강현모강은모",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "대전",
      "충청",
      "회원제",
      "18홀",
      "유성"
    ]
  },
  {
    "id": "mcst-325",
    "name": "대덕복지센터",
    "location": "대전 유성구 유성대로 1689번길 69(전민동 463번지)",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "배재웅",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "대전",
      "충청",
      "대중제",
      "9홀",
      "유성"
    ]
  },
  {
    "id": "mcst-326",
    "name": "금실대덕밸리CC",
    "location": "대전 유성구 테크노중앙로 210(용산동 676번지)",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "정영숙",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "대전",
      "충청",
      "대중제",
      "9홀",
      "유성"
    ]
  },
  {
    "id": "mcst-327",
    "name": "부산컨트리클럽",
    "location": "부산광역시 금정구 중앙대로2327번길 11",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "(사)부산컨트리클럽(서정의)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "부산",
      "경상",
      "회원제",
      "18홀",
      "부산광역"
    ]
  },
  {
    "id": "mcst-328",
    "name": "동래베네스트골프클럽",
    "location": "부산광역시 금정구 하정로 66",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "삼성물산㈜(정해린)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "부산",
      "경상",
      "회원제",
      "18홀",
      "부산광역"
    ]
  },
  {
    "id": "mcst-329",
    "name": "하이스트컨트리클럽",
    "location": "부산광역시 강서구 과학산단1로 172",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜정상개발(박정오)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "부산",
      "경상",
      "대중제",
      "9홀",
      "부산광역"
    ]
  },
  {
    "id": "mcst-330",
    "name": "해라컨트리클럽",
    "location": "부산광역시 강서구 과학산단로 306번길 77",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜성우알앤디(양근동 김경례)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "부산",
      "경상",
      "대중제",
      "9홀",
      "부산광역"
    ]
  },
  {
    "id": "mcst-331",
    "name": "아시아드컨트리클럽",
    "location": "부산광역시 기장군 일광읍 차양길 26",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "삼성물산㈜(김도형)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "부산",
      "경상",
      "회원제",
      "27홀",
      "부산광역"
    ]
  },
  {
    "id": "mcst-332",
    "name": "해운대컨트리클럽",
    "location": "부산광역시 기장군 정관면 병산2로 265",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "경원개발㈜(조성태)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "부산",
      "경상",
      "회원제",
      "27홀",
      "부산광역"
    ]
  },
  {
    "id": "mcst-333",
    "name": "베이사이드골프클럽",
    "location": "부산광역시 기장군 일광읍 이천8길 100",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "일광개발㈜(백규현)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "부산",
      "경상",
      "회원제",
      "27홀",
      "부산광역"
    ]
  },
  {
    "id": "mcst-334",
    "name": "해운대비치골프앤리조트",
    "location": "부산광역시 기장군 기장읍 대변로 74",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "해운대비치골프앤리조트㈜(박호성)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "부산",
      "경상",
      "회원제",
      "18홀",
      "부산광역"
    ]
  },
  {
    "id": "mcst-335",
    "name": "기장동원로얄컨트리클럽",
    "location": "부산광역시 기장군 기장읍 반송로 1345-52",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜남양종합개발(장정규)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "부산",
      "경상",
      "대중제",
      "9홀",
      "부산광역"
    ]
  },
  {
    "id": "mcst-336",
    "name": "스톤게이트컨트리클럽",
    "location": "부산광역시 기장군 일광읍 곡천길 317",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜오션디앤씨 일광개발(이치헌 권혁운)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "부산",
      "경상",
      "대중제",
      "18홀",
      "부산광역"
    ]
  },
  {
    "id": "mcst-337",
    "name": "인서울27골프클럽",
    "location": "서울특별시 강서구 오정로 443-198",
    "totalHoles": 27,
    "membershipType": "비회원제",
    "company": "인서울27골프클럽(주)(김태호)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "서울",
      "수도권",
      "비회원제",
      "27홀",
      "서울특별"
    ]
  },
  {
    "id": "mcst-338",
    "name": "세종에머슨컨트리클럽",
    "location": "세종특별자치시 전의면 운주산로 1510",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "세종에머슨㈜",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "세종",
      "충청",
      "회원제",
      "27홀",
      "세종특별자치"
    ]
  },
  {
    "id": "mcst-339",
    "name": "건설공제조합세종필드골프클럽",
    "location": "세종특별자치시 정안세종로  1569",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "건설공제조합세종개발 주식회사",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "세종",
      "충청",
      "대중제",
      "18홀",
      "세종특별자치"
    ]
  },
  {
    "id": "mcst-340",
    "name": "세종레이캐슬골프&리조트",
    "location": "세종특별자치시 전의면 의당전의로 252",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "㈜자광홀딩스",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "세종",
      "충청",
      "대중제",
      "27홀",
      "세종특별자치"
    ]
  },
  {
    "id": "mcst-341",
    "name": "보라골프장",
    "location": "울산 울주군 삼동면 삼동로 404",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "반도개발(안영호)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "울산",
      "경상",
      "회원제",
      "27홀",
      "울주"
    ]
  },
  {
    "id": "mcst-342",
    "name": "삼남골프장",
    "location": "울산 울주군 삼남면 방기가천로 179",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "삼남(김혜숙)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "울산",
      "경상",
      "대중제",
      "9홀",
      "울주"
    ]
  },
  {
    "id": "mcst-343",
    "name": "더골프골프장",
    "location": "울산 울주군 서생면 용연길 206-52",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "고암개발(노승현)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "울산",
      "경상",
      "대중제",
      "18홀",
      "울주"
    ]
  },
  {
    "id": "mcst-344",
    "name": "울산골프장",
    "location": "울산 울주군 웅촌면 웅촌로 1",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "울산개발(김석환)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "울산",
      "경상",
      "회원제",
      "27홀",
      "울주"
    ]
  },
  {
    "id": "mcst-345",
    "name": "베이스타즈CC",
    "location": "울산 북구 미포산업로 800",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "새정스타즈(정상헌)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "울산",
      "경상",
      "대중제",
      "18홀",
      "북"
    ]
  },
  {
    "id": "mcst-346",
    "name": "오르비스골프클럽",
    "location": "울산 울주군 온양읍 망양리 산14-9",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜산양(엄재목)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "울산",
      "경상",
      "대중제",
      "18홀",
      "울주"
    ]
  },
  {
    "id": "mcst-347",
    "name": "인천국제컨트리클럽",
    "location": "인천시 서구 도요지로 37",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "㈜신태진(강형식김태진)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "인천",
      "수도권",
      "회원제",
      "18홀"
    ]
  },
  {
    "id": "mcst-348",
    "name": "잭 니클라우스 골프클럽 코리아",
    "location": "인천시 연수구 아카데미로 209",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "㈜ 포스코 O&M(김정호)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "인천",
      "수도권",
      "회원제",
      "18홀"
    ]
  },
  {
    "id": "mcst-349",
    "name": "송도골프클럽",
    "location": "인천시 연수구 능허대로 236",
    "totalHoles": 8,
    "membershipType": "대중제",
    "company": "㈜송도골프",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "인천",
      "수도권",
      "대중제",
      "8홀"
    ]
  },
  {
    "id": "mcst-350",
    "name": "인천그랜드컨트리클럽",
    "location": "인천시 서구 원석로 195",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜동군(임광수 임재원)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "인천",
      "수도권",
      "대중제",
      "18홀"
    ]
  },
  {
    "id": "mcst-351",
    "name": "클럽72(바다)",
    "location": "인천시 중구 공항동로 392",
    "totalHoles": 63,
    "membershipType": "대중제",
    "company": "㈜케이엠에이치 신라레저 ㈜파주컨트리클럽 옥산레저㈜",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "인천",
      "수도권",
      "대중제",
      "63홀"
    ]
  },
  {
    "id": "mcst-352",
    "name": "클럽72(하늘)",
    "location": "인천시 중구 공항동로135번길 267",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜케이엠에이치 신라레저 ㈜파주컨트리클럽 옥산레저㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "인천",
      "수도권",
      "대중제",
      "18홀"
    ]
  },
  {
    "id": "mcst-353",
    "name": "베어즈베스트청라골프클럽",
    "location": "인천시 서구 청라대로 316번길 45",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "㈜블루아일랜드개발",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "인천",
      "수도권",
      "대중제",
      "27홀"
    ]
  },
  {
    "id": "mcst-354",
    "name": "드림파크골프장",
    "location": "인천시 서구 거월로 61",
    "totalHoles": 36,
    "membershipType": "대중제",
    "company": "수도권매립지관리공사",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "인천",
      "수도권",
      "대중제",
      "36홀"
    ]
  },
  {
    "id": "mcst-355",
    "name": "골프존카운티 송도 골프장",
    "location": "인천시 연수구 인천신항대로 1120",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜골프존카운티",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "인천",
      "수도권",
      "대중제",
      "18홀"
    ]
  },
  {
    "id": "mcst-356",
    "name": "석모도컨트리클럽",
    "location": "인천시 강화군 어류정길 177",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "해륜개발㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "인천",
      "수도권",
      "대중제",
      "18홀"
    ]
  },
  {
    "id": "mcst-357",
    "name": "오렌지듄스 영종골프클럽",
    "location": "인천시 중구 운서동 2850-43번지 일원",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜영종오렌지",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "인천",
      "수도권",
      "대중제",
      "18홀"
    ]
  },
  {
    "id": "mcst-358",
    "name": "강화 선두리 골프장",
    "location": "인천시 강화군 해안남로 474번길 59",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜강호개발",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "인천",
      "수도권",
      "대중제",
      "9홀"
    ]
  },
  {
    "id": "mcst-359",
    "name": "베르힐CC 영종",
    "location": "인천시 중구 한상중앙로 66(중산동)",
    "totalHoles": 36,
    "membershipType": "대중제",
    "company": "KB부동산신탁㈜㈜세계한상드림아일랜드",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "인천",
      "수도권",
      "대중제",
      "36홀"
    ]
  },
  {
    "id": "mcst-360",
    "name": "여수시티파크골프&호텔",
    "location": "전남 여수시 좌수영로 641",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "김영한",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "18홀",
      "여수"
    ]
  },
  {
    "id": "mcst-361",
    "name": "디오션CC",
    "location": "전남 여수시 화양면 안포리 1917",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "김종관",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "18홀",
      "여수"
    ]
  },
  {
    "id": "mcst-362",
    "name": "세이지우드 여수경도",
    "location": "전남 여수시 대경도길 111",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "김승건",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "27홀",
      "여수"
    ]
  },
  {
    "id": "mcst-363",
    "name": "포라이즌",
    "location": "전남 순천시 별량면 오실길 333",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "김정수",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "전남",
      "전라",
      "회원제",
      "27홀",
      "순천"
    ]
  },
  {
    "id": "mcst-364",
    "name": "파인힐스CC",
    "location": "전남 순천시 주암면 송강사길 99",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "이화영",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "27홀",
      "순천"
    ]
  },
  {
    "id": "mcst-365",
    "name": "순천CC",
    "location": "전남 순천시 별량면 동화사길 85",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "임종욱",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "9홀",
      "순천"
    ]
  },
  {
    "id": "mcst-366",
    "name": "골프존카운티",
    "location": "전남 순천시 주암면 행정1길 77",
    "totalHoles": 36,
    "membershipType": "대중제",
    "company": "서상현",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "36홀",
      "순천"
    ]
  },
  {
    "id": "mcst-367",
    "name": "순천부영CC",
    "location": "전남 순천시 해룡면 신대로 188",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "최양환",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "18홀",
      "순천"
    ]
  },
  {
    "id": "mcst-368",
    "name": "골드레이크CC",
    "location": "전남 나주시 남평읍 나주호로 442-129",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "임대형",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "18홀",
      "나주"
    ]
  },
  {
    "id": "mcst-369",
    "name": "골드레이크CC",
    "location": "전남 나주시 남평읍 나주호로 442-129",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "임대형",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전남",
      "전라",
      "회원제",
      "18홀",
      "나주"
    ]
  },
  {
    "id": "mcst-370",
    "name": "해피니스CC",
    "location": "전남 나주시 다도면 다도로 171-60",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "차재진",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "18홀",
      "나주"
    ]
  },
  {
    "id": "mcst-371",
    "name": "해피니스CC",
    "location": "전남 나주시 다도면 다도로 171-60",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "차재진",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전남",
      "전라",
      "회원제",
      "18홀",
      "나주"
    ]
  },
  {
    "id": "mcst-372",
    "name": "나주CC",
    "location": "전남 나주시 공산면 상방신포길 154-32",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "김천종",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "9홀",
      "나주"
    ]
  },
  {
    "id": "mcst-373",
    "name": "나주힐스CC",
    "location": "전남 나주시 공산면 삼방신포길 160-27",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "김태식",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "9홀",
      "나주"
    ]
  },
  {
    "id": "mcst-374",
    "name": "광양CC",
    "location": "전남 광양시 가야로 223",
    "totalHoles": 6,
    "membershipType": "대중제",
    "company": "반재경",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "6홀",
      "광양"
    ]
  },
  {
    "id": "mcst-375",
    "name": "창평CC",
    "location": "전남 담양군 창평면 오강리 27-2",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "김형준",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "9홀",
      "담양"
    ]
  },
  {
    "id": "mcst-376",
    "name": "레이나CC",
    "location": "전남 담양군 담양읍 깊은실길 169",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "차성만",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "18홀",
      "담양"
    ]
  },
  {
    "id": "mcst-377",
    "name": "죽향CC",
    "location": "전남 담양군 창평면 창평로 159",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "한정수",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "9홀",
      "담양"
    ]
  },
  {
    "id": "mcst-378",
    "name": "광주CC",
    "location": "전남 곡성군 옥과면 입면로 455",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "고혁주 이영",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "전남",
      "전라",
      "회원제",
      "27홀",
      "곡성"
    ]
  },
  {
    "id": "mcst-379",
    "name": "옥과기안CC",
    "location": "전남 곡성군 옥과면 소룡리 427-2",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "김삼종",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "9홀",
      "곡성"
    ]
  },
  {
    "id": "mcst-380",
    "name": "르오네뜨CC",
    "location": "전남 곡성군 오산면 오산로 819-126",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "김양석",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "9홀",
      "곡성"
    ]
  },
  {
    "id": "mcst-381",
    "name": "보성CC",
    "location": "전남 보성군 조성면 대곡리 1117",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "박지영",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "18홀",
      "보성"
    ]
  },
  {
    "id": "mcst-382",
    "name": "보성에덴CC",
    "location": "전남 보성군 보성읍 쾌상리 1385",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "안병태",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "9홀",
      "보성"
    ]
  },
  {
    "id": "mcst-383",
    "name": "엘리체CC",
    "location": "전남 화순군 춘양면 장곡길 55",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "류채봉",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전남",
      "전라",
      "회원제",
      "18홀",
      "화순"
    ]
  },
  {
    "id": "mcst-384",
    "name": "화순CC",
    "location": "전남 화순군 도곡면 천태로 1000-151",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "최창식",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "전남",
      "전라",
      "회원제",
      "27홀",
      "화순"
    ]
  },
  {
    "id": "mcst-385",
    "name": "조아밸리CC",
    "location": "전남 화순군 도곡면 고인돌2로 450",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "조우석",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "9홀",
      "화순"
    ]
  },
  {
    "id": "mcst-386",
    "name": "무등산CC",
    "location": "전남 화순군 화순읍 오성로 292-90",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "박만주",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "27홀",
      "화순"
    ]
  },
  {
    "id": "mcst-387",
    "name": "JNJ골프리조트",
    "location": "전남 장흥군 장평면 제산기동로 326",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "정남진골프리조트㈜(고재경 고재일)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "27홀",
      "장흥"
    ]
  },
  {
    "id": "mcst-388",
    "name": "다산베아채골프&리조트",
    "location": "전남 강진군 도암면 학장용산길 101",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "이애자",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "27홀",
      "강진"
    ]
  },
  {
    "id": "mcst-389",
    "name": "오시아노골프클럽",
    "location": "전남 해남군 화원면 시아로 224",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "한국관광공사(안영배)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "9홀",
      "해남"
    ]
  },
  {
    "id": "mcst-390",
    "name": "파인비치골프링크스",
    "location": "전남 해남군 화원면 시아로 224",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "파인비치㈜(이화영)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "18홀",
      "해남"
    ]
  },
  {
    "id": "mcst-391",
    "name": "솔라시도CC",
    "location": "전남 해남군 산이면 산이로 2247",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "피앤지에이개발㈜(이양규)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "18홀",
      "해남"
    ]
  },
  {
    "id": "mcst-392",
    "name": "아크로CC",
    "location": "전남 영암군 금정면 안적동길 403",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "박현재",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "27홀",
      "영암"
    ]
  },
  {
    "id": "mcst-393",
    "name": "cosmos 1",
    "location": "전남 영암군 삼호읍 에프원로 121-4",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜파크카운티",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "18홀",
      "영암"
    ]
  },
  {
    "id": "mcst-394",
    "name": "골프존카운티 영암",
    "location": "전남 영암군 삼호읍 에프원로 121-1",
    "totalHoles": 45,
    "membershipType": "대중제",
    "company": "㈜썬카운티㈜콜프존카운티",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "45홀",
      "영암"
    ]
  },
  {
    "id": "mcst-395",
    "name": "무안CC",
    "location": "전남 무안군 청계면 도대리 818",
    "totalHoles": 54,
    "membershipType": "대중제",
    "company": "최재훈 최영곤",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "54홀",
      "무안"
    ]
  },
  {
    "id": "mcst-396",
    "name": "클린밸리CC",
    "location": "전남 무안군 청계면 태봉길 33-100",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "조영희",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "18홀",
      "무안"
    ]
  },
  {
    "id": "mcst-397",
    "name": "엘리체CC",
    "location": "전남 함평군 학교면 서당매길 242",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "류채봉",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "27홀",
      "함평"
    ]
  },
  {
    "id": "mcst-398",
    "name": "천지CC",
    "location": "전남 함평군 함장로 889-11",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "정유신",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "9홀",
      "함평"
    ]
  },
  {
    "id": "mcst-399",
    "name": "베르힐컨트리클럽",
    "location": "전남 함평군 대동면 대동길 408",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "문금환",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "27홀",
      "함평"
    ]
  },
  {
    "id": "mcst-400",
    "name": "웨스트오션CC",
    "location": "전남 영광군 백수읍 해안로 1362-70",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "대호관광개발㈜(윤오중)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "18홀",
      "영광"
    ]
  },
  {
    "id": "mcst-401",
    "name": "에콜리안영광골프장",
    "location": "전남 영광군 영광읍 월현로 1길 40",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "영광군수(국민체육진흥공단)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "9홀",
      "영광"
    ]
  },
  {
    "id": "mcst-402",
    "name": "푸른솔 골프클럽",
    "location": "전남 장성군 동화면 임정로 155",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "유순태",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "27홀",
      "장성"
    ]
  },
  {
    "id": "mcst-403",
    "name": "백양우리CC",
    "location": "전남 장성군 북이면 사거리 752-1",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "김승룡",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전남",
      "전라",
      "대중제",
      "9홀",
      "장성"
    ]
  },
  {
    "id": "mcst-404",
    "name": "전주월드컵골프장",
    "location": "전북특별자치도 전주시 덕진구 온고을로 672",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "전주시장(전주시설공단)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전북",
      "전라",
      "대중제",
      "9홀",
      "전주"
    ]
  },
  {
    "id": "mcst-405",
    "name": "군산CC",
    "location": "전북특별자치도 군산시 옥서면 남산군로 1685",
    "totalHoles": 81,
    "membershipType": "대중제",
    "company": "군산레저산업㈜(박성주)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "전북",
      "전라",
      "대중제",
      "81홀",
      "산"
    ]
  },
  {
    "id": "mcst-406",
    "name": "익산컨트리클럽",
    "location": "전북특별자치도 익산시 무왕로38길 111",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "익산관광개발㈜(안정현)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전북",
      "전라",
      "대중제",
      "18홀",
      "익산"
    ]
  },
  {
    "id": "mcst-407",
    "name": "상떼힐CC",
    "location": "전북특별자치도 익산시 무왕로38길 111",
    "totalHoles": 6,
    "membershipType": "대중제",
    "company": "익산관광개발㈜(안정현)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전북",
      "전라",
      "대중제",
      "6홀",
      "익산"
    ]
  },
  {
    "id": "mcst-408",
    "name": "웅포컨트리클럽",
    "location": "전북특별자치도 익산시 웅포면 강변로 130",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜베어포트리조트(박재형)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전북",
      "전라",
      "대중제",
      "18홀",
      "익산"
    ]
  },
  {
    "id": "mcst-409",
    "name": "포세븐금강컨트리클럽",
    "location": "전북특별자치도 익산시 웅포면 강변로 130",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "포세븐금강 컨트리클럽㈜(박승백)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전북",
      "전라",
      "대중제",
      "18홀",
      "익산"
    ]
  },
  {
    "id": "mcst-410",
    "name": "태인CC",
    "location": "전북특별자치도 정읍시 태인면 상증길 28",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "우진관광개발㈜(고환승)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전북",
      "전라",
      "대중제",
      "18홀",
      "정읍"
    ]
  },
  {
    "id": "mcst-411",
    "name": "태인CC",
    "location": "전북특별자치도 정읍시 태인면 상증길 28",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "우진관광개발㈜(고환승)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전북",
      "전라",
      "대중제",
      "9홀",
      "정읍"
    ]
  },
  {
    "id": "mcst-412",
    "name": "내장산골프&리조트",
    "location": "전북특별자치도 정읍시 첨단과학로 476",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜대일내장산 컨트리클럽         (김호석 김은정)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전북",
      "전라",
      "대중제",
      "18홀",
      "정읍"
    ]
  },
  {
    "id": "mcst-413",
    "name": "남원상록골프장",
    "location": "전북특별자치도 남원시 대산면 월계길 11",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "공무원연금공단",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전북",
      "전라",
      "대중제",
      "18홀",
      "남원"
    ]
  },
  {
    "id": "mcst-414",
    "name": "골프존 카운티 드래곤",
    "location": "전북특별자치도 남원시 대산면 대사로 498",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "신한레저㈜(박남식)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전북",
      "전라",
      "대중제",
      "18홀",
      "남원"
    ]
  },
  {
    "id": "mcst-415",
    "name": "골프존 카운티 드래곤",
    "location": "전북특별자치도 남원시 대산면 대사로 498",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "골프존카운티㈜(서상현)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전북",
      "전라",
      "대중제",
      "9홀",
      "남원"
    ]
  },
  {
    "id": "mcst-416",
    "name": "아네스빌CC",
    "location": "전북특별자치도 김제시 황산면 높은메길 160-39",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "유한책인회사 벽원레저개발(이우복)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전북",
      "전라",
      "대중제",
      "9홀",
      "김제"
    ]
  },
  {
    "id": "mcst-417",
    "name": "에스페란사GC",
    "location": "전북특별자치도 김제시 금구면 낙산로 120",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "에스페란사GC(정양기외2)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전북",
      "전라",
      "대중제",
      "9홀",
      "김제"
    ]
  },
  {
    "id": "mcst-418",
    "name": "김제스파힐스CC",
    "location": "전북특별자치도 김제시 온천길 37",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜티엠지개발(김현하)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전북",
      "전라",
      "대중제",
      "18홀",
      "김제"
    ]
  },
  {
    "id": "mcst-419",
    "name": "더나인골프클럽",
    "location": "전북특별자치도 김제시 금구면 대화1길 8-75",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "부흥산업개발㈜(김병철)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전북",
      "전라",
      "대중제",
      "9홀",
      "김제"
    ]
  },
  {
    "id": "mcst-420",
    "name": "OKCC",
    "location": "전북특별자치도 완주군 소양면 화심리 300",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜오케이(문무양)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전북",
      "전라",
      "대중제",
      "9홀",
      "완주"
    ]
  },
  {
    "id": "mcst-421",
    "name": "케이밸리컨트리클럽",
    "location": "전북특별자치도 완주군 운주면 산북리 65-4",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "스마트시티(유)(김한주)(유)미래로골프(송호범)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전북",
      "전라",
      "대중제",
      "9홀",
      "완주"
    ]
  },
  {
    "id": "mcst-422",
    "name": "써미트CC",
    "location": "전북특별자치도 진안군 부귀면 부귀로 72-161",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "㈜써미트(정순례)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "전북",
      "전라",
      "대중제",
      "27홀",
      "진안"
    ]
  },
  {
    "id": "mcst-423",
    "name": "무주덕유산CC",
    "location": "전북특별자치도 무주군 설천면 만선로 185",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "㈜무주덕유산리조트(이중근 이종혁)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전북",
      "전라",
      "회원제",
      "18홀",
      "무주"
    ]
  },
  {
    "id": "mcst-424",
    "name": "골프존카운티무주",
    "location": "전북특별자치도 무주군 안성면 장무로 1537-21",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜케이제이클럽(유현식)㈜골프존카운티(서상현)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전북",
      "전라",
      "대중제",
      "18홀",
      "무주"
    ]
  },
  {
    "id": "mcst-425",
    "name": "장수골프리조트",
    "location": "전북특별자치도 장수군 계남면 장안산로 303",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "장수레저㈜(박평섭)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전북",
      "전라",
      "대중제",
      "18홀",
      "장수"
    ]
  },
  {
    "id": "mcst-426",
    "name": "전주샹그릴라CC",
    "location": "전북특별자치도 임실군 신덕면 수지로 559-90",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "광산관광개발㈜(최영범)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "전북",
      "전라",
      "회원제",
      "27홀",
      "임실"
    ]
  },
  {
    "id": "mcst-427",
    "name": "금과골프장",
    "location": "전북특별자치도 순창군 금과면 담순로 716",
    "totalHoles": 6,
    "membershipType": "대중제",
    "company": "금과관광레저타운( 정영곤)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전북",
      "전라",
      "대중제",
      "6홀",
      "순창"
    ]
  },
  {
    "id": "mcst-428",
    "name": "디케이레저",
    "location": "전북특별자치도 순창군 순창읍 금산로 152",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜순창씨씨(CC)(김대식)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전북",
      "전라",
      "대중제",
      "9홀",
      "순창"
    ]
  },
  {
    "id": "mcst-429",
    "name": "고창CC",
    "location": "전북특별자치도 고창군 심원면 애향갯벌로 70",
    "totalHoles": 21,
    "membershipType": "대중제",
    "company": "동호레저㈜(김선미)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전북",
      "전라",
      "대중제",
      "21홀",
      "고창"
    ]
  },
  {
    "id": "mcst-430",
    "name": "골프존카운티선운",
    "location": "전북특별자치도 고창군 아산면 운곡로 418",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜골프존카운티(서상현)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전북",
      "전라",
      "대중제",
      "18홀",
      "고창"
    ]
  },
  {
    "id": "mcst-431",
    "name": "석정힐CC",
    "location": "전북특별자치도 고창군 고창읍 석정2로 192",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "석정레저㈜(김혜성)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "전북",
      "전라",
      "대중제",
      "18홀",
      "고창"
    ]
  },
  {
    "id": "mcst-432",
    "name": "타미우스cc",
    "location": "제주특별자치도 제주시 애월읍 화전길 201",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "㈜타미우스(김양옥)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "제주",
      "회원제",
      "27홀"
    ]
  },
  {
    "id": "mcst-433",
    "name": "그린필드GC",
    "location": "제주특별자치도 제주시 조천읍 번영로 1040-70",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "㈜형삼문(박대성)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "회원제",
      "18홀"
    ]
  },
  {
    "id": "mcst-434",
    "name": "라헨느CC",
    "location": "제주특별자치도 제주시 봉개동 241-13",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "라헨느리조트㈜(강창원 박준영)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "회원제",
      "18홀"
    ]
  },
  {
    "id": "mcst-435",
    "name": "볼카노골프앤리조트",
    "location": "제주특별자치도 서귀포시 산록남로 1391",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "㈜볼카노골프앤리조트",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "제주",
      "회원제",
      "27홀",
      "서귀포"
    ]
  },
  {
    "id": "mcst-436",
    "name": "테디밸리",
    "location": "제주특별자치도 서귀포시 한창로 365",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "㈜제이에스엔에프개발(김준)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "회원제",
      "18홀",
      "서귀포"
    ]
  },
  {
    "id": "mcst-437",
    "name": "㈜그랜드부민 꿈드림목장",
    "location": "제주특별자치도 제주시 516로 2596-117",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜그랜드부민 꿈드림목장(강동화)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "대중제",
      "9홀"
    ]
  },
  {
    "id": "mcst-438",
    "name": "에코랜드",
    "location": "제주특별자치도 제주시 조천읍 번영로 1278-169",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "㈜더원(정우석)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "제주",
      "대중제",
      "27홀"
    ]
  },
  {
    "id": "mcst-439",
    "name": "라온골프클럽",
    "location": "제주특별자치도 제주시 한경면 용금로 998",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "라온레저개발㈜(손광섭)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "제주",
      "대중제",
      "27홀"
    ]
  },
  {
    "id": "mcst-440",
    "name": "크라운CC",
    "location": "제주특별자치도 제주시 조천읍 북선로 125",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "(재)관정이종환재단(이종환)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "제주",
      "대중제",
      "27홀"
    ]
  },
  {
    "id": "mcst-441",
    "name": "더시에나CC",
    "location": "제주특별자치도 제주시 516로 2695",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜시에나컨트리클럽(신동휴)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "대중제",
      "18홀"
    ]
  },
  {
    "id": "mcst-442",
    "name": "아덴힐",
    "location": "제주특별자치도 제주시 화전길 82",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "아덴힐리조트앤골프㈜(정종인)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "대중제",
      "18홀"
    ]
  },
  {
    "id": "mcst-443",
    "name": "한라산CC",
    "location": "제주특별자치도 제주시 선돌목동길 56-46",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜부건(김용덕 김철우)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "대중제",
      "18홀"
    ]
  },
  {
    "id": "mcst-444",
    "name": "플라자CC",
    "location": "제주특별자치도 제주시 명림로 575-107",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "한화호텔앤드리조트㈜(김형조)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "대중제",
      "9홀"
    ]
  },
  {
    "id": "mcst-445",
    "name": "부영CC",
    "location": "제주특별자치도 서귀포시 남원읍 남조로 960",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "주식회사 부영CC(최양환 최병영)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "제주",
      "대중제",
      "27홀",
      "서귀포"
    ]
  },
  {
    "id": "mcst-446",
    "name": "서귀포팬텀 골프앤리조트",
    "location": "제주특별자치도 서귀포시 산록남로 2914",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "서귀포팬텀골프앤리조트(이재학)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "대중제",
      "18홀",
      "서귀포"
    ]
  },
  {
    "id": "mcst-447",
    "name": "중문GC",
    "location": "제주특별자치도 서귀포시 중문관광로 72번길 60",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "한국관광공사(김장실)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "대중제",
      "18홀",
      "서귀포"
    ]
  },
  {
    "id": "mcst-448",
    "name": "스프링데일",
    "location": "제주특별자치도 서귀포시 남원읍 서성로 459",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜동국개발(강국창)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "대중제",
      "18홀",
      "서귀포"
    ]
  },
  {
    "id": "mcst-449",
    "name": "더클래식CC",
    "location": "제주특별자치도 서귀포시 남원읍 남조로 1105",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜더클래식CC(최병영)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "대중제",
      "18홀",
      "서귀포"
    ]
  },
  {
    "id": "mcst-450",
    "name": "샤인빌파크CC",
    "location": "제주특별자치도 서귀포시 표선면 가시로 384",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜록(박찬수)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "대중제",
      "18홀",
      "서귀포"
    ]
  },
  {
    "id": "mcst-451",
    "name": "골프존카운티오라",
    "location": "제주특별자치도 제주시 오라남로 130-16",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "글래드호텔앤리조트㈜ (박명신)㈜골프존카운티 (서상현)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "회원제",
      "18홀"
    ]
  },
  {
    "id": "mcst-452",
    "name": "골프존카운티오라",
    "location": "제주특별자치도 제주시 오라남로 130-16",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "글래드호텔앤리조트㈜ (박명신)㈜골프존카운티 (서상현)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "대중제",
      "18홀"
    ]
  },
  {
    "id": "mcst-453",
    "name": "엘리시안제주",
    "location": "제주특별자치도 제주시 평화로 1738-116",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "GS건설㈜(임병용)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "회원제",
      "18홀"
    ]
  },
  {
    "id": "mcst-454",
    "name": "엘리시안제주",
    "location": "제주특별자치도 제주시 평화로 1738-116",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "GS건설㈜(임병용)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "대중제",
      "18홀"
    ]
  },
  {
    "id": "mcst-455",
    "name": "에버리스CC",
    "location": "제주특별자치도 제주시 평화로 1693-75",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "신안관광개발㈜(최형순)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "회원제",
      "18홀"
    ]
  },
  {
    "id": "mcst-456",
    "name": "에버리스CC",
    "location": "제주특별자치도 제주시 평화로 1693-75",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "신안관광개발㈜(최형순)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "대중제",
      "9홀"
    ]
  },
  {
    "id": "mcst-457",
    "name": "아난티클럽제주",
    "location": "제주특별자치도 제주시 선유로 445-55",
    "totalHoles": 9,
    "membershipType": "회원제",
    "company": "㈜아난티한라(이만규)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "회원제",
      "9홀"
    ]
  },
  {
    "id": "mcst-458",
    "name": "아난티클럽제주",
    "location": "제주특별자치도 제주시 선유로 445-55",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "㈜아난티한라(이만규)",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "제주",
      "대중제",
      "27홀"
    ]
  },
  {
    "id": "mcst-459",
    "name": "블랙스톤제주",
    "location": "제주특별자치도 제주시 한창로 925-122",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "㈜블랙스톤리조트(원기룡)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "회원제",
      "18홀"
    ]
  },
  {
    "id": "mcst-460",
    "name": "블랙스톤제주",
    "location": "제주특별자치도 제주시 한창로 925-122",
    "totalHoles": 9,
    "membershipType": "회원제",
    "company": "㈜블랙스톤리조트(원기룡)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "회원제",
      "9홀"
    ]
  },
  {
    "id": "mcst-461",
    "name": "캐슬렉스제주",
    "location": "제주특별자치도 서귀포시 안덕면 평화로 1241",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "㈜캐슬렉스제주(이성무)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "회원제",
      "18홀",
      "서귀포"
    ]
  },
  {
    "id": "mcst-462",
    "name": "캐슬렉스제주",
    "location": "제주특별자치도 서귀포시 안덕면 평화로 1241",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜캐슬렉스제주(이성무)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "대중제",
      "9홀",
      "서귀포"
    ]
  },
  {
    "id": "mcst-463",
    "name": "해비치CC",
    "location": "제주특별자치도 서귀포시 남원읍 원님로 399번길 319",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "해비치호텔앤드리조트㈜(김민수)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "회원제",
      "18홀",
      "서귀포"
    ]
  },
  {
    "id": "mcst-464",
    "name": "해비치CC",
    "location": "제주특별자치도 서귀포시 남원읍 원님로 399번길 319",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "해비치호텔앤드리조트㈜(김민수)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "대중제",
      "18홀",
      "서귀포"
    ]
  },
  {
    "id": "mcst-465",
    "name": "롯데스카이힐제주",
    "location": "제주특별자치도 서귀포시 상예로 530",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "㈜호텔롯데(김태홍)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "회원제",
      "18홀",
      "서귀포"
    ]
  },
  {
    "id": "mcst-466",
    "name": "롯데스카이힐제주",
    "location": "제주특별자치도 서귀포시 상예로 530",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜호텔롯데(김태홍)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "대중제",
      "18홀",
      "서귀포"
    ]
  },
  {
    "id": "mcst-467",
    "name": "사이프러스골프",
    "location": "제주특별자치도 서귀포시 번영로 2300",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "남영산업㈜(김헌국)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "회원제",
      "18홀",
      "서귀포"
    ]
  },
  {
    "id": "mcst-468",
    "name": "사이프러스골프",
    "location": "제주특별자치도 서귀포시 번영로 2300",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "남영산업㈜(김헌국)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "대중제",
      "18홀",
      "서귀포"
    ]
  },
  {
    "id": "mcst-469",
    "name": "나인브릿지",
    "location": "제주특별자치도 서귀포시 안덕면 광평로 34-156",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "CJ대한통운주식회사(박근희)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "회원제",
      "18홀",
      "서귀포"
    ]
  },
  {
    "id": "mcst-470",
    "name": "나인브릿지",
    "location": "제주특별자치도 서귀포시 안덕면 광평로 34-156",
    "totalHoles": 6,
    "membershipType": "대중제",
    "company": "CJ대한통운주식회사 (박근희) / 임대 _ 나인브릿지 퍼블릭 (김영찬)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "대중제",
      "6홀",
      "서귀포"
    ]
  },
  {
    "id": "mcst-471",
    "name": "SK핀크스",
    "location": "제주특별자치도 서귀포시 안덕면 산록남로 863",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "SK핀크스㈜(강석현)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "회원제",
      "18홀",
      "서귀포"
    ]
  },
  {
    "id": "mcst-472",
    "name": "SK핀크스",
    "location": "제주특별자치도 서귀포시 안덕면 산록남로 863",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "SK핀크스㈜(강석현)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "제주",
      "대중제",
      "9홀",
      "서귀포"
    ]
  },
  {
    "id": "mcst-473",
    "name": "우정힐스 컨트리클럽",
    "location": "충남 목천읍 충절로 1048-68",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "그린나래㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충남",
      "충청",
      "회원제",
      "18홀"
    ]
  },
  {
    "id": "mcst-474",
    "name": "천안상록 골프장",
    "location": "충남 수신면 수신로 576",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "공무원연금관리공단",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "충남",
      "충청",
      "대중제",
      "27홀"
    ]
  },
  {
    "id": "mcst-475",
    "name": "골프존카운티 천안",
    "location": "충남 병천면 매성2길 103",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜지씨천안",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충남",
      "충청",
      "대중제",
      "18홀"
    ]
  },
  {
    "id": "mcst-476",
    "name": "마론컨트리클럽",
    "location": "충남 동남구 북면 납안5길 74",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜마론",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충남",
      "충청",
      "대중제",
      "18홀",
      "동남"
    ]
  },
  {
    "id": "mcst-477",
    "name": "프린세스 골프클럽",
    "location": "충남 공주시 정안면 방자들길 81-50(인풍리)",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "공주개발(주)",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충남",
      "충청",
      "대중제",
      "18홀",
      "공주"
    ]
  },
  {
    "id": "mcst-478",
    "name": "골드리버CC",
    "location": "충남 공주시 의당면 신정말길 67-133(청룡리)",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜웅진",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충남",
      "충청",
      "대중제",
      "9홀",
      "공주"
    ]
  },
  {
    "id": "mcst-479",
    "name": "계룡산골프장",
    "location": "충남 공주시 계룡면 아랫난댕이길 17(내흥리)",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "계룡산골프장",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충남",
      "충청",
      "대중제",
      "9홀",
      "공주"
    ]
  },
  {
    "id": "mcst-480",
    "name": "보령베이스CC",
    "location": "충남 보령시 옥마벚길 10",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜대천리조트",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충남",
      "충청",
      "대중제",
      "9홀",
      "보령"
    ]
  },
  {
    "id": "mcst-481",
    "name": "에스앤 골프리조트",
    "location": "충남 보령시 남포면 양항리 650-2",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜에스앤골프리조트",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충남",
      "충청",
      "대중제",
      "9홀",
      "보령"
    ]
  },
  {
    "id": "mcst-482",
    "name": "도고컨트리 구락부",
    "location": "충남 선장면 삼봉산길 188",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "㈜도고칸추리크럽",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충남",
      "충청",
      "회원제",
      "18홀"
    ]
  },
  {
    "id": "mcst-483",
    "name": "에스지아름다운골프&리조트",
    "location": "충남 영인면 영인산로 440",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "㈜단톡",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "충남",
      "충청",
      "대중제",
      "27홀"
    ]
  },
  {
    "id": "mcst-484",
    "name": "서산수 골프앤리조트",
    "location": "충남 서산시 대산읍 삼길포7로 8",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "서산수골프앤리조트",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충남",
      "충청",
      "대중제",
      "18홀",
      "서산"
    ]
  },
  {
    "id": "mcst-485",
    "name": "더힐 컨트리클럽",
    "location": "충남 논산시 상월면 선비로 1079",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "㈜일상",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충남",
      "충청",
      "대중제",
      "9홀",
      "논산"
    ]
  },
  {
    "id": "mcst-486",
    "name": "아리스타 CC",
    "location": "충남 연무읍 황화정리 산100",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "대양레져산업개발㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충남",
      "충청",
      "대중제",
      "18홀"
    ]
  },
  {
    "id": "mcst-487",
    "name": "파인스톤 컨트리클럽",
    "location": "충남 당진시 송산면 무수들길 90",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜동양관광레저",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충남",
      "충청",
      "대중제",
      "18홀",
      "당진"
    ]
  },
  {
    "id": "mcst-488",
    "name": "파나시아 골프클럽",
    "location": "충남 당진시 신평면 계명길 33",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "만진집단㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충남",
      "충청",
      "대중제",
      "9홀",
      "당진"
    ]
  },
  {
    "id": "mcst-489",
    "name": "플라밍고C.C",
    "location": "충남 당진시 석문면 산단8로 299",
    "totalHoles": 30,
    "membershipType": "대중제",
    "company": "최영수",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "충남",
      "충청",
      "대중제",
      "30홀",
      "당진"
    ]
  },
  {
    "id": "mcst-490",
    "name": "에딘버러 컨트리클럽",
    "location": "충남 금산군 진산면 살구정길 167",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "(주)부토",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충남",
      "충청",
      "회원제",
      "18홀",
      "금산"
    ]
  },
  {
    "id": "mcst-491",
    "name": "백제컨트리클럽",
    "location": "충남 부여군 은산면 충절로 3734-82",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "백제컨트리클럽㈜",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "충남",
      "충청",
      "대중제",
      "27홀",
      "부여"
    ]
  },
  {
    "id": "mcst-492",
    "name": "㈜호텔롯데 스카이힐 부여CC",
    "location": "충남 부여군 규암면 백제문로 470",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜호텔롯데",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충남",
      "충청",
      "대중제",
      "18홀",
      "부여"
    ]
  },
  {
    "id": "mcst-493",
    "name": "골든베이골프&리조트",
    "location": "충남 태안군 근흥면 정선포로 217",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "㈜셀럽골프앤리조트",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "충남",
      "충청",
      "대중제",
      "27홀",
      "태안"
    ]
  },
  {
    "id": "mcst-494",
    "name": "스톤비치컨트리클럽",
    "location": "충남 태안군 근흥면 갈음이길 88",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜스톤비치",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충남",
      "충청",
      "대중제",
      "18홀",
      "태안"
    ]
  },
  {
    "id": "mcst-495",
    "name": "로얄링스1",
    "location": "충남 태안군 태안읍 반곡길 284",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "로얄링스㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충남",
      "충청",
      "대중제",
      "18홀",
      "태안"
    ]
  },
  {
    "id": "mcst-496",
    "name": "로얄링스2",
    "location": "충남 태안군 태안읍 반곡길 284",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "로얄링스㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충남",
      "충청",
      "대중제",
      "18홀",
      "태안"
    ]
  },
  {
    "id": "mcst-497",
    "name": "솔라고CC1",
    "location": "충남 태안군 태안읍 소곳이길 92-234",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜현대도시개발 일진레저㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충남",
      "충청",
      "대중제",
      "18홀",
      "태안"
    ]
  },
  {
    "id": "mcst-498",
    "name": "솔라고CC2",
    "location": "충남 태안군 태안읍 소곳이길 92-234",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "㈜현대도시개발 일진레저㈜",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충남",
      "충청",
      "대중제",
      "18홀",
      "태안"
    ]
  },
  {
    "id": "mcst-499",
    "name": "내포골프클럽",
    "location": "충남 예산군 삽교읍 산수길 242(목리 1420)",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "(주)내포개발",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충남",
      "충청",
      "대중제",
      "9홀",
      "예산"
    ]
  },
  {
    "id": "mcst-500",
    "name": "그랜드cc",
    "location": "충북 청주시 청원군 오창읍 꽃화산길 14",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "임재풍",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "충북",
      "충청",
      "회원제",
      "27홀",
      "청주"
    ]
  },
  {
    "id": "mcst-501",
    "name": "아난티 중앙골프클럽",
    "location": "충북 진천군 백곡면 배티로 818-105",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "이대현",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "충북",
      "충청",
      "회원제",
      "27홀",
      "진천"
    ]
  },
  {
    "id": "mcst-502",
    "name": "천 룡cc",
    "location": "충북 진천군 이월면 진안로 347-123",
    "totalHoles": 27,
    "membershipType": "회원제",
    "company": "윤진동",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "충북",
      "충청",
      "회원제",
      "27홀",
      "진천"
    ]
  },
  {
    "id": "mcst-503",
    "name": "세레니티cc",
    "location": "충북 청주시 서원구 남이면 문곡구절골길 235",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "김주영",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충북",
      "충청",
      "회원제",
      "18홀",
      "청주"
    ]
  },
  {
    "id": "mcst-504",
    "name": "스 타cc",
    "location": "충북 충주시 앙성면 상대촌1길 198",
    "totalHoles": 18,
    "membershipType": "회원제",
    "company": "변재길",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충북",
      "충청",
      "회원제",
      "18홀",
      "충주"
    ]
  },
  {
    "id": "mcst-505",
    "name": "임페리얼레이크",
    "location": "충북 충주시 금가면 다래울길 52",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "서향기",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "18홀",
      "충주"
    ]
  },
  {
    "id": "mcst-506",
    "name": "천 룡cc",
    "location": "충북 진천군 이월면 진안로 425",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "윤진동",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "9홀",
      "진천"
    ]
  },
  {
    "id": "mcst-507",
    "name": "시그너스cc",
    "location": "충북 충주시 앙성면 중방곡길 57-44",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "김영란 강석무",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "9홀",
      "충주"
    ]
  },
  {
    "id": "mcst-508",
    "name": "시그너스cc",
    "location": "충북 충주시 앙성면 중방곡길 57-44",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "강석무",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "18홀",
      "충주"
    ]
  },
  {
    "id": "mcst-509",
    "name": "떼제베운영",
    "location": "충북 청주시 흥덕구 옥산면 동림2길 149",
    "totalHoles": 36,
    "membershipType": "대중제",
    "company": "김명신",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "36홀",
      "청주"
    ]
  },
  {
    "id": "mcst-510",
    "name": "썬밸리cc",
    "location": "충북 음성군 삼성면 법말길 49",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "이성주",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "18홀",
      "음성"
    ]
  },
  {
    "id": "mcst-511",
    "name": "중 원cc",
    "location": "충북 충주시 산척면 인등로 392",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "김영민",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "27홀",
      "충주"
    ]
  },
  {
    "id": "mcst-512",
    "name": "레인보우힐스",
    "location": "충북 음성군 생극면 차생로 168",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "정인환",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "27홀",
      "음성"
    ]
  },
  {
    "id": "mcst-513",
    "name": "히든밸리cc",
    "location": "충북 진천군 백곡면 소토골길 61",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "정현숙",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "27홀",
      "진천"
    ]
  },
  {
    "id": "mcst-514",
    "name": "골드나인cc",
    "location": "충북 청주시 청원구 낭성면 산성로 1520-17",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "정우석",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "9홀",
      "청주"
    ]
  },
  {
    "id": "mcst-515",
    "name": "센테리움cc",
    "location": "충북 충주시 노은면 솔고개로 750",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "조형득",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "27홀",
      "충주"
    ]
  },
  {
    "id": "mcst-516",
    "name": "대호단양cc",
    "location": "충북 단양군 매포읍 고양5길 43",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "황호현",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "18홀",
      "단양"
    ]
  },
  {
    "id": "mcst-517",
    "name": "대영베이스cc",
    "location": "충북 충주시 대소원면 성종두담길 113",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "권혁희",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "18홀",
      "충주"
    ]
  },
  {
    "id": "mcst-518",
    "name": "골프존카운티 진천cc",
    "location": "충북 진천군 진천읍 송강로 783-51",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "서상현",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "27홀",
      "진천"
    ]
  },
  {
    "id": "mcst-519",
    "name": "오창 에딘버러",
    "location": "충북 청주시 청원구 오창읍 두릉유리로 846",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "오형근 윤종묵",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "9홀",
      "청주"
    ]
  },
  {
    "id": "mcst-520",
    "name": "이븐데일cc",
    "location": "충북 청주시 상당구 미원면 대신2길 31",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "홍승우",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "18홀",
      "청주"
    ]
  },
  {
    "id": "mcst-521",
    "name": "킹즈락cc",
    "location": "충북 제천시 천남동 내토로7길 136",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "정성훈",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "27홀",
      "제천"
    ]
  },
  {
    "id": "mcst-522",
    "name": "골프존카운티 화랑cc",
    "location": "충북 진천군 문백면 농다리로 809",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "서상현",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "18홀",
      "진천"
    ]
  },
  {
    "id": "mcst-523",
    "name": "젠스필드cc",
    "location": "충북 음성군 삼성면 덕호로 382",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "이상균",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "18홀",
      "음성"
    ]
  },
  {
    "id": "mcst-524",
    "name": "로얄포레cc",
    "location": "충북 충주시 신니면 화치3길 35",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "구정현",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "18홀",
      "충주"
    ]
  },
  {
    "id": "mcst-525",
    "name": "대영힐스cc",
    "location": "충북 충주시 대소원면 성종두담길 114",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "권혁희",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "27홀",
      "충주"
    ]
  },
  {
    "id": "mcst-526",
    "name": "진양밸리cc",
    "location": "충북 음성군 삼성면 금일로 1195",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "이종현",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "27홀",
      "음성"
    ]
  },
  {
    "id": "mcst-527",
    "name": "에콜리안제천",
    "location": "충북 제천시 고암동 송학 주천로 102",
    "totalHoles": 9,
    "membershipType": "대중제",
    "company": "조현재",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "9홀",
      "제천"
    ]
  },
  {
    "id": "mcst-528",
    "name": "코스카cc",
    "location": "충북 음성군 음성읍 동음로 318",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "허흥영",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "27홀",
      "음성"
    ]
  },
  {
    "id": "mcst-529",
    "name": "클럽디속리산",
    "location": "충북 보은군 탄부면 평각상장로 230",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "최정훈",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "18홀",
      "보은"
    ]
  },
  {
    "id": "mcst-530",
    "name": "동 촌cc",
    "location": "충북 충주시 노은면 감노로 1327",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "한명희",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "18홀",
      "충주"
    ]
  },
  {
    "id": "mcst-531",
    "name": "세 일cc",
    "location": "충북 충주시 신니면 동락길 207",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "권민수",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "18홀",
      "충주"
    ]
  },
  {
    "id": "mcst-532",
    "name": "클럽디보은",
    "location": "충북 보은군 보은읍 장속중초로 386",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "최정훈",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "18홀",
      "보은"
    ]
  },
  {
    "id": "mcst-533",
    "name": "올데이 골프앤리조트",
    "location": "충북 충주시 앙성면 비내길 189",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "서향기",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "27홀",
      "충주"
    ]
  },
  {
    "id": "mcst-534",
    "name": "감곡CC",
    "location": "충북 음성군 감곡면 문촌리 산81-6",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "심천보",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "18홀",
      "음성"
    ]
  },
  {
    "id": "mcst-535",
    "name": "일라이트 컨트리클럽",
    "location": "충북 영동군 영동읍 매천리 산 35-1",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "전문수",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "18홀",
      "영동"
    ]
  },
  {
    "id": "mcst-536",
    "name": "일레븐cc",
    "location": "충북 충주시 앙성면 본평리 산 43-1",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "김정태",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "18홀",
      "충주"
    ]
  },
  {
    "id": "mcst-537",
    "name": "킹스데일cc",
    "location": "충북 충주시 주덕면 기업도시3로 2",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "정지완 김종해",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "18홀",
      "충주"
    ]
  },
  {
    "id": "mcst-538",
    "name": "블랙스톤cc",
    "location": "충북 증평군 도안면 벼루재길 334",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "원성역",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "18홀",
      "증평"
    ]
  },
  {
    "id": "mcst-539",
    "name": "모나크cc",
    "location": "충북 음성군 금왕읍 대금로 1851번길 3-14",
    "totalHoles": 18,
    "membershipType": "대중제",
    "company": "서남종",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "18홀",
      "음성"
    ]
  },
  {
    "id": "mcst-540",
    "name": "음성 힐데스하임cc",
    "location": "충북 음성군 소이면 후미리 산40-4",
    "totalHoles": 27,
    "membershipType": "대중제",
    "company": "김정선",
    "courses": {
      "outCourseName": "동 코스",
      "inCourseName": "서 코스"
    },
    "tags": [
      "충북",
      "충청",
      "대중제",
      "27홀",
      "음성"
    ]
  },
  {
    "id": "mcst-541",
    "name": "세레니티cc",
    "location": "충북 청주시 서원구 남이면 산막리 산 128",
    "totalHoles": 9,
    "membershipType": "비회원제",
    "company": "김주영",
    "courses": {
      "outCourseName": "OUT 코스",
      "inCourseName": "IN 코스"
    },
    "tags": [
      "충북",
      "충청",
      "비회원제",
      "9홀",
      "청주"
    ]
  }
];

function getSubCoursesForRaw(raw: RawKoreaCourse) {
  const stdPars: (3 | 4 | 5)[] = [4, 4, 3, 5, 4, 3, 4, 5, 4];
  const list = [
    { id: `${raw.id}-sub-1`, name: raw.courses.outCourseName || 'OUT 코스', pars: [...stdPars] },
    { id: `${raw.id}-sub-2`, name: raw.courses.inCourseName || 'IN 코스', pars: [...stdPars] },
  ];
  if (raw.totalHoles >= 27) {
    const thirdName = raw.courses.outCourseName.includes('동') ? '남 코스' :
                      raw.courses.outCourseName.includes('레이크') ? '밸리 코스' :
                      raw.courses.outCourseName.includes('마운틴') ? '힐 코스' : 'C 코스';
    list.push({ id: `${raw.id}-sub-3`, name: thirdName, pars: [...stdPars] });
  }
  if (raw.totalHoles >= 36) {
    const fourthName = raw.courses.outCourseName.includes('동') ? '북 코스' :
                       raw.courses.outCourseName.includes('레이크') ? '파인 코스' :
                       raw.courses.outCourseName.includes('마운틴') ? '레이크 코스' : 'D 코스';
    list.push({ id: `${raw.id}-sub-4`, name: fourthName, pars: [...stdPars] });
  }
  return list;
}

export function createCourseInstance(raw: RawKoreaCourse): Course {
  let cachedHoles: HoleInfo[] | null = null;
  return {
    id: raw.id,
    name: raw.name,
    location: raw.location,
    totalHoles: raw.totalHoles,
    courses: raw.courses,
    subCourses: getSubCoursesForRaw(raw),
    tags: raw.tags,
    isCustom: false,
    get holes(): HoleInfo[] {
      if (!cachedHoles) {
        cachedHoles = createStandardHoles(
          raw.name,
          raw.courses.outCourseName,
          raw.courses.inCourseName,
          raw.totalHoles >= 27 ? 1.03 : 1.0,
          0
        );
      }
      return cachedHoles;
    },
  };
}

export const KOREA_COURSES: Course[] = KOREA_COURSES_RAW.map(createCourseInstance);
