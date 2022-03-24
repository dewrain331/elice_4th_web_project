// 한달
export const EXPIRE_DELAY_TIME = 30*86400*1000;

// 5분
export const EXPIRE_CODE_TIME = 1000 * 60 * 5;

export const randomString = () => {
    const chars = "0123456789";
    const stringLength = 6
    
    let randomstring = ''
    for (let i = 0; i < stringLength; i++) {
      const rnum = Math.floor(Math.random() * chars.length)
      randomstring += chars.substring(rnum, rnum + 1)
    }
    return randomstring
}