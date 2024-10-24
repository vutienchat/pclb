import { SearchingWorkParams } from '@src/services'
import SerializeParams from '@src/utils/SerializeParams'

export const URIS = {
  auth: {
    login: 'auth/login',
    logout: 'auth/logout'
  },
  user: {
    profile: 'api/v1/user/profile',
    edit: 'api/v1/user/edit-profile',
    search: 'api/v1/management-user/get-all-user',
    delete: (userId: number) => `api/v1/management-user/delete-user/${userId}`,
    editUser: (userId: number) => `api/v1/management-user/edit-user-info/${userId}`,
    systemRole: 'api/v1/param/get-system-role',
    userInfo: (userId: number) => `api/v1/management-user/user-info/${userId}`
  },
  position: 'api/v1/param/get-position',
  center: 'api/v1/param/get-center',
  department: (params: { centerId: number }) => `api/v1/param/get-department?${SerializeParams(params)}`,
  team: (params: { centerId: number; departmentId: number }) => `api/v1/param/get-team?${SerializeParams(params)}`,
  uploadFile: 'api/upload-file',
  new: {
    getAll: 'api/v1/news/get-list-news-warning',
    getDetail: (postNewsId: number) => `api/v1/news/detail-news-warning/${postNewsId}`
  },
  groupUser: {
    search: 'api/v1/group/get-list-group',
    listMemberGroup: (groupId: number) => `api/v1/group/get-list-member/${groupId}`,
    addMember: (groupId: number) => `api/v1/group/add-member/${groupId}`,
    create: 'api/v1/group/create',
    edit: (groupId: number) => `api/v1/group/edit/${groupId}`,
    delete: (groupId: number) => `api/v1/group/delete-group/${groupId}`,
    getAll: 'api/v1/param/get-list-group'
  },
  storms: {
    list: `api/v1/storms/list`,
    create: 'api/v1/storms/create',
    edit: (id: number) => `api/v1/storms/edit/${id}`,
    delete: (id: number) => `api/v1/storms/delete/${id}`,
    get: (id: number) => `api/v1/storms/get/${id}`,
    getDirectHistory: (id: number) => `api/v1/storms/get-direct-histories/${id}`
  },
  masterdata: {
    provinces: 'api/v1/master-data/get-provinces',
    userGroup: 'api/v1/master-data/get-user-groups',
    districts: 'api/v1/master-data/get-district'
  },
  work: {
    search: (params: SearchingWorkParams) => `api/v1/task/search?${SerializeParams(params)}`,
    create: 'api/v1/task/create',
    edit: `api/v1/task/edit`,
    delete: (id: number) => `api/v1/task/delete/${id}`,
    get: (id: number) => `api/v1/task/get/${id}`
  },
  digitalMap: {
    getMapSite: 'api/v1/map/get-map-site',
    getTransmissionDeviceMap: (provinceId: number) => `api/v1/map/get-map-transmission-device?provinceId=${provinceId}`,
    detailSite: (siteId: number) => `api/v1/map/site-detail/${siteId}`,
    detailDevice: (deviceId: number) => `api/v1/map/transmission-device-detail/${deviceId}`
  },
  issue: {
    getIssue: 'api/v1/issue/issue-analysis'
  }
}
