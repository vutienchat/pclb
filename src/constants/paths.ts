export const EndPoints = {
  auth: {
    login: '/dang-nhap'
  },
  account: '/thong-tin-tai-khoan',
  home: '/',
  weather: {
    weather: '/thong-tin-thoi-tiet/thong-tin-thoi-tiet',
    digitalMap: '/thong-tin-thoi-tiet/ban-do-so'
  },
  user: {
    users: '/nguoi-dung/thong-tin-nguoi-dung',
    role: '/nguoi-dung/vai-tro-nguoi-dung',
    groupUser: '/nguoi-dung/nhom-nguoi-dung'
  },
  dashboard: {
    digitalMap: '/dashboard/ban-do-so'
  },
  listStorm: '/danh-sach-con-bao',
  preparingStormManagement: {
    before: '/chuan-bi-truoc-khi-bao/danh-sach-chuan-bi-truoc-bao',
    works: '/chuan-bi-truoc-khi-bao/danh-sach-cong-viec-can-chuan-bi'
  },
  influence: {
    overallReport: '/anh-huong-bao/bao-cao-tong-hop',
    digitalMap: '/anh-huong-bao/ban-do-so'
  },
  chat: 'dieu-hanh-ung-cuu',
  standardData: {
    influenceStationManagement: '/chuan-hoa-du-lieu/quan-ly-tram-anh-huong',
    transmissionEquipmentManagement: '/chuan-hoa-du-lieu/quan-ly-thiet-bi-truyen-dan=anh-huong'
  },
  notificationManagement: {
    sms: '/thong-bao/sms',
    email: '/thong-bao/email',
    notify: '/thong-bao/notify'
  },
  notification: '/thong-bao',
  settings: {
    logSms: '/cai-dat/log-sms',
    logEmail: '/cai-dat/log-email',
    logNotify: '/cai-dat/log-notify',
    logAction: '/cai-dat/log-action',
    frequency: '/cai-dat/tan-xuat-su-dung',
    updateInformation: '/cai-dat/cap-nhat-thong-tin'
  }
}

export const DEFAULT_PAGE = EndPoints.home
