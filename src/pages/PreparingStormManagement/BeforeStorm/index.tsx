import PageWrapper from '@src/components/shared/Page/PageWrapper'
import AdminPreparingBeforeStormManagement from './Admin'
import ManagePreparingBeforeStormPage from '@src/pages/PreparingStormManagement/BeforeStorm/Unit'
import useAuthState from "@src/hooks/useAuthState";

const PreparingBeforeStormManagementPage = () => {
  const {user} = useAuthState()
  return (
    <PageWrapper title='Quản lý thông tin chuẩn bị trước bão'>
      {user?.username === 'trungdq' || user?.username === 'admin' ? (
        <AdminPreparingBeforeStormManagement />
      ) : (
        <ManagePreparingBeforeStormPage />
      )}
    </PageWrapper>
  )
}

export default PreparingBeforeStormManagementPage
