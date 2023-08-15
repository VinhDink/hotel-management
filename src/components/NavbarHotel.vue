<template>
    <div class="sidebar" id="sidebar">
        <div class="nav">
            <router-link to="/" class="router-link" v-if="userRole == 'admin'">
                <div class="nav-content" :class="{ 'active-route': currentView == '/' }">
                    <i class="bi bi-clipboard-fill icon"></i>
                    Dashboard
                </div>
            </router-link>
            <router-link to="/booking" class="router-link">
                <div class="nav-content" :class="{ 'active-route': currentView == '/booking' }">
                    <i class="bi bi-book-fill icon"> </i>
                    View booking
                </div>
            </router-link>
            <router-link to="/checkin" class="router-link">
                <div class="nav-content" :class="{ 'active-route': currentView == '/checkin' }">
                    <i class="bi bi-bookmark-check-fill icon"></i>
                    View checkin
                </div>
            </router-link>
            <router-link to="/employee" class="router-link" v-if="userRole == 'admin'">
                <div class="nav-content" :class="{ 'active-route': currentView == '/employee' }">
                    <i class="bi bi-people-fill icon"></i>
                    View employee
                </div>
            </router-link>
            <router-link to="/room" class="router-link">
                <div class="nav-content" :class="{ 'active-route': currentView == '/room' }">
                    <i class="bi bi-bank2 icon"></i>
                    View room
                </div>
            </router-link>
            <router-link to="/user-list" class="router-link" v-if="userRole == 'admin'">
                <div class="nav-content" :class="{ 'active-route': currentView == '/user-list' }">
                    <i class="bi bi-person-badge-fill icon"></i>
                    User list
                </div>
            </router-link>
            <router-link to="/guest" class="router-link" v-if="userRole == 'admin'">
                <div class="nav-content" :class="{ 'active-route': currentView == '/guest' }">
                    <i class="bi bi-person-fill-check icon"></i>
                    Guest
                </div>
            </router-link>
        </div>
        <div class="logout" @click="logout">
            <i class="bi bi-box-arrow-right icon"> </i>Logout
        </div>
    </div>
</template>

<script>
import store from '../store'

export default {
    name: 'NavbarHotel',
    props: {
        closeMenu: {
            type: Function,
            required: false,
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('role');
            this.$router.push('/login');
        },
    },
    //get current route
    computed: {
        currentView() {
            return this.$route.path;
        },
        userRole() {
            console.log(store.state.role);
            return store.state.role;
        }
    }
}

</script>

<style scoped>
.active-route {
    background-color: #c0bfbf;
    color: #000;
    font-size: 15px;
}

.icon {
    color: rgb(74, 74, 74);
    font-size: 25px;
}

.nav {
    background-color: rgb(248, 248, 248);
    color: #f0f0f0;
    min-height: 80vh;
    width: 200px;
    display: flex;
    flex-direction: column;
}

.nav-content {
    padding-left: 20px;
    font-size: 15px;
    display: flex;
    gap: 15px;
    padding: 15px;
    min-height: 100px;
    align-items: center;
}

.nav-content:not(.active-route):hover {
    background-color: #eaeaea;
    color: #000;
    font-size: 15px;
}

.sidebar {
    height: 100%;
    width: 2;
    display: flex;
    flex-direction: column;
}

.router-link {
    text-decoration: none;
    color: rgb(35, 35, 35);
    font-size: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
}

.logout {
    cursor: pointer;
    padding-left: 20px;
    font-size: 15px;
    display: flex;
    gap: 15px;
    padding: 15px;
    min-height: 100px;
    align-items: center;
}

.logout:hover {
    background-color: rgb(247, 108, 105);
    color: #fff;
}

@media (max-width:425px) {
    .logout {
        cursor: pointer;
        padding-left: 20px;
        font-size: 15px;
        display: flex;
        gap: 15px;
        padding: 15px;
        min-height: 100px;
        align-items: center;
        background-color: rgb(247, 108, 105);
    }
}
</style>
