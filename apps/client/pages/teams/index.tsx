import AppLayout from '@layouts/app'
import Seo from '@components/seo'
import Teams from '@components/teams/main'

const TeamsPage = () => {
  return (
    <AppLayout activePage="Teams">
      <Seo title="Teams" description="See all the FIFA World Cup Qatar 2022 teams." />
      <Teams />
    </AppLayout>
  )
}

export default TeamsPage