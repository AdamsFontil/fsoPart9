import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from "./types";

export const getAllDiaries = () => {
  return axios
    .get<DiaryEntry[]>('http://localhost:3000/api/diaries')
    .then(response => response.data)
}

export const createDiary = (object: DiaryEntry) => {
  return axios
    .post<DiaryEntry>('http://localhost:3000/api/diaries', object)
    .then(response => response.data)

}
