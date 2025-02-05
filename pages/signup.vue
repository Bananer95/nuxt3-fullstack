<template>
    <div class="pageWrapper">
        <h2>Registration</h2>
        <div class="form" >
            <UICustomInput v-model="_form.username" placeholder="Username" type="text" @focus="handleFocus" />
            <UICustomInput v-model="_form.name" placeholder="Name" type="text" @focus="handleFocus" />
            <UICustomInput v-model="_form.email" placeholder="Email" type="email" @focus="handleFocus" />
            <UICustomInput v-model="_form.password" placeholder="Password" type="password" @focus="handleFocus" />
            <div class="form-bottom">
                <UICustomCheckbox v-model="_form.distribution" label="Email newsletter" boxlPosition="bottom" id="distribution"/>
                <UICustomSelect  v-model="_form.theme" id="theme" name="theme" label="Theme" :options="usersThemes"/>
            </div>
            <div class="error-wrapper">
            <span  v-if="error" class="error">{{ error }}</span>
            </div>
            <UIBtn @click="handleLogin">Registration</UIBtn>
        </div>
    </div>
</template>

<script setup>
import { validateEmail } from '../utils/checkFunctions';

definePageMeta({
    layout: 'default'
})
const _form = reactive({
    username: '',
    password: '',
    name: '',
    distribution: false,
    email: '',
    theme: '',
    isAdmin: false
})

const error = ref(null)

const { data: usersThemes } = await useFetch('/api/themes', {
    server:false
})

const handleFocus = () => {
    error.value = null
}

function validateForm() {
    if (!_form.username) {
        return "Username is required.";
    }
    if (!_form.password) {
        return "Password is required.";
    }
    if (!_form.name) {
        return "Name is required.";
    }
    if (!_form.email) {
        return "Email is required.";
    }
     if (!_form.theme) {
        return "Theme is required.";
    }

    const checkEmail  = validateEmail(_form.email)
    if (!checkEmail) {
        return "Email is invalid.";
    }
    return null;
}

const handleLogin = async () => {
    const err = validateForm()
    if (err) {
        error.value = err;
        return
    } else {
    try {
        const res = await $fetch('/api/user', {
            method: 'POST',
            body: { ..._form }
        })
        if (res) {
            navigateTo('/')
        }
    } catch (e) {
        error.value = e.value
    } finally {
        Object.keys(_form).forEach(key => {
            if (key === 'distribution' || key === 'isAdmin') {
                _form[key] = false
            } else {
                _form[key] = ''
            }
        });
    }
    }
}
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

.form-bottom {
    @include flex-row-center;
    width: 100%;
    padding: 0 10px;
    justify-content: space-between;
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