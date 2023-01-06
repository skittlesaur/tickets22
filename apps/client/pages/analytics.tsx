import AppLayout from '@layouts/app'
import Seo from '@components/seo'
import Analytics from '@components/analytics'

const AnalyticsPage = () => {
  return (
    <AppLayout activePage="Analytics">
      <Seo
        title="Analytics"
        description="Analytics for Tickets22"
      />
      <Analytics />
    </AppLayout>
  )
}

export default AnalyticsPage