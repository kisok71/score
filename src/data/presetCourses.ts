// src/data/presetCourses.ts
// 문화체육관광부 전국 골프장 현황 (2024.12.31 기준 총 541개 공식 등록 골프장)
import { Course } from '../types/golf';
import { KOREA_COURSES } from './koreaCourses';

export { createStandardHoles } from '../utils/golfHoleGenerator';

export const PRESET_COURSES: Course[] = KOREA_COURSES;
