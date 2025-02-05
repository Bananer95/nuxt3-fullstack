import {navigateTo, defineNuxtRouteMiddleware, useUserSession} from "#imports";

export default defineNuxtRouteMiddleware(async () => {
    const { loggedIn, user } = useUserSession()
    if (!loggedIn.value || !user.value?.isAdmin) {
        return navigateTo("/", { redirectCode: 302 });
    }
})