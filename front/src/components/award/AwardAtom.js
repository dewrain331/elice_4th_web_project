/** Recoil로 관리 시 오류가 났던 것들
 * isEditing : 편집 버튼 클릭 시 모든 항목에서 편집 기능이 동작함
 **/

 import { atom } from 'recoil'

 export const PER_PAGE = 3

 export const isAddingState = atom({
     key: 'isAddingStateAward',
     default: false
 })
 
 export const pageState = atom({
     key: 'pageStateAward',
     default: 1
 })
 
 export const allPageState = atom({
     key: 'allPageStateAward',
     default: 1
 })

 export const awardsState = atom({
     key: 'awardsState',
     default: []
 })