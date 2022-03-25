/** Recoil로 관리 시 오류가 났던 것들
 * isEditing : 편집 버튼 클릭 시 모든 항목에서 편집 기능이 동작함
 * 
 **/

 import { atom } from 'recoil'

 export const PER_PAGE = 3

 export const isAddingState = atom({
     key: 'isAddingStateCert',
     default: false
 })
 
 export const pageState = atom({
     key: 'pageStateCert',
     default: 1
 })
 
 export const allPageState = atom({
     key: 'allPageStateCert',
     default: 1
 })

 export const certsState = atom({
     key: 'certsState',
     default: []
 })
