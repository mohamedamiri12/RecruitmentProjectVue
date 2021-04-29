<template>
    <div class="card">
        <div class="card-header">
          User id : {{ item.id }}
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ item.name }}</h5>
          <table class="table table-striped table-fixed text-center">
                <tbody>
                    <tr>
                      <th scope="col">username</th>
                      <th>{{ item.username }}</th>
                    </tr>
                    <tr>
                        <th scope="col">email</th>
                        <td>{{ item.email }}</td>
                    </tr>
                    <tr>
                        <th scope="col">phone</th>
                        <td>{{ item.phone }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="card-footer text-muted">
          <button class="btn btn-primary float-left" @click="goBack">Back</button>
          <button class="btn btn-warning float-right" @click="showUpdateForm">Edit</button>
        </div>
    </div>
</template>


<script>

export default{
    props:['user'],
    data() {
        return {

        };
    },
    computed:{
        item(){
            console.log(this.user);
            return this.user;
        }
    },
    methods:{
      goBack() {
        this.item ? this.$router.go(-1) : this.$router.push({path: '/users'})
      },
      showUpdateForm(){
        const id = this.$route.params.id;
        this.$router.push({path: '/users/'+id+'/edit'})
      }
    }
}
</script>

<style scoped>
.card-title{
  font-weight: bold;
}
</style>
