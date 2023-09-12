// 用户授权
export function wxGetUserProfile():Promise<void> {
    return new Promise((resolve, reject) => {
        uni.getUserProfile({
            desc: '用户登录',
            success: (res:any) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

export function wxLogin():Promise<void> {
    return new Promise((resolve, reject) => {
      uni.login({
        success: (res:any) => {
          resolve(res)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }
