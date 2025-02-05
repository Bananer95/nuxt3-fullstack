<template>
    <div class="pageWrapper">
        <h2>Sign in</h2>
        <div class="form">
            <UICustomInput v-model="_form.email" placeholder="Email" type="email" @focus="loginError = null"/>
            <UICustomInput v-model="_form.password" placeholder="Password" type="password" @focus="loginError = null"/>
            <div class="error-wrapper">
            <span  v-if="loginError" class="error">{{ loginError }}</span>
            </div>
            <UIBtn @click="login">Signin</UIBtn>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'default'
})

const _form = reactive({
    email: '',
    password: '',
})

const loginError = ref(null)

const login = async () => {
  const { data, error } = await useFetch('/api/auth', {
    method: 'POST',
    body: { ..._form },
    server: false,
  });

  if (error.value) {
    loginError.value = error.value.data.message
    return;
  }

  if (data.value) {
    window.location.href = '/profile'
  }
};
</script>

<style lang="scss" scoped>
h2 {
    @include Title;
}
.form {
    @include flex-column;
    align-items: center;
    gap: 40px;
}
.pageWrapper {
    margin: 150px auto 0;
    @include cardWrapper;
}

.error-wrapper {
  height: 14px;
  margin: -30px 0;
}

.error {
  font-size: 12px;
  color: red;
  text-align: center;
}

</style>