<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main'

export default {
  page: {
    title: 'Dashboard',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout },
}
</script>

<template>
  <Layout>

    <div class="row">
      <div class="col-md-12">
        <b-card>
          This is dashboard page
        </b-card>
      </div>
    </div>
  </Layout>
</template>
