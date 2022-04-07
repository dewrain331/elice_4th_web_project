import { atom } from 'recoil'

export const techsState = atom({
    key: 'techsState',
    default: []
})

export const isAddingState = atom({
    key: 'isAddingStateTech',
    default: false
})