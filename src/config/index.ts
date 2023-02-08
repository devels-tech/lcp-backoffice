interface IConfig {
  API: { URL: string }
  FILE_LIMITS: {
    BANNERS: {
      IMAGE_SIZE: 2097152 // 2mb
    }
    DEVOTIONALS: {
      FILE_SIZE: 5242880 // 5mb
    }
  }
}

export const config: IConfig = {
  API: { URL: process.env.NEXT_PUBLIC_API_URL },
  FILE_LIMITS: {
    BANNERS: {
      IMAGE_SIZE: 2097152 // 2mb
    },
    DEVOTIONALS: {
      FILE_SIZE: 5242880 // 5mb
    }
  }
}
