<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img
            :src="administratorImage"
            class="c-avatar-img "
          />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader>
      <strong>Account Settings</strong>
    </CDropdownHeader>
    <CDropdownItem @click="adminProfile">
      <CIcon name="cil-user" /> Profile 
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-settings" /> Settings
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-dollar" /> Payments
      <CBadge color="secondary" class="mfs-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem>
    <CDropdownItem @click="logoutPerform">
      <CIcon name="cil-lock-locked" /> Logout
    </CDropdownItem>
  </CDropdown>
</template>

<script>
export default {
  name: 'TheHeaderDropdownAccnt',
  data () {
    return { 
      itemsCount: 42,
    }
  },
  computed:{
    administratorImage(){
      const actifAdministrator = this.$store.getters.getActifAdministrator
      const id = actifAdministrator.id;
      const imagePath = actifAdministrator.administrator_image;
      const path = 'http://localhost:8000/storage/administratorImages/'+id+'/'+imagePath;
      console.log(path);
      return path;
    }
  },
  methods:{
    logoutPerform(){
      this.$store.dispatch('logoutPerform')
      .then( res => {
        console.log("Logout Done");
        this.$router.push('/login');
      })
      .catch( error => {
        console.log(error.message);
      })
    },
    adminProfile(){
      this.$router.push('/dash/profile');
    }
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>