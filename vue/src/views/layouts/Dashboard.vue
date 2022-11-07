<template>
  <div class="min-h-full">
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img
                class="h-8 w-8"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <router-link
                  v-for="item in getRole()"
                  :key="item.name"
                  :to="item.to"
                  active-class="bg-gray-900 text-white"
                  :class="[
                    this.$route.name === item.to.name
                      ? ''
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'px-3 py-2 rounded-md text-sm font-medium',
                  ]"
                  >{{ item.name }}
                </router-link>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                class="
                  rounded-full
                  bg-gray-800
                  p-1
                  text-gray-400
                  hover:text-white
                  focus:outline-none
                  focus:ring-2
                  focus:ring-white
                  focus:ring-offset-2
                  focus:ring-offset-gray-800
                "
              >
                <span class="sr-only">View notifications</span>
                <BellIcon class="h-6 w-6" aria-hidden="true" />
              </button>

              <!-- Profile dropdown -->
              <Menu as="div" class="relative ml-3">
                <div>
                  <MenuButton
                    class="
                      flex
                      max-w-xs
                      items-center
                      rounded-full
                      bg-gray-800
                      text-sm
                      focus:outline-none
                      focus:ring-2
                      focus:ring-white
                      focus:ring-offset-2
                      focus:ring-offset-gray-800
                    "
                    v-on:click="logoutButton"
                  >
                    <span class="sr-only">Open user menu</span>
                    <img
                      class="h-8 w-8 rounded-full"
                      :src="user.imageUrl"
                      alt=""
                    />
                  </MenuButton>
                </div>
              </Menu>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="
                inline-flex
                items-center
                justify-center
                rounded-md
                bg-gray-800
                p-2
                text-gray-400
                hover:bg-gray-700 hover:text-white
                focus:outline-none
                focus:ring-2
                focus:ring-white
                focus:ring-offset-2
                focus:ring-offset-gray-800
              "
            >
              <span class="sr-only">Open main menu</span>
              <Bars3Icon
                v-if="!open"
                class="block h-6 w-6"
                aria-hidden="true"
              />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>
    </Disclosure>

    <header class="bg-white shadow">
      <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>
      </div>
    </header>
    <main>
      <div>
        <router-view :key="$route.path"></router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import useAuth from "../../composables/Auth";
import jwt_decode from "jwt-decode";
const getToken = localStorage.getItem("token");
const { logout } = useAuth();
const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

function getRole() {
  const token = jwt_decode(getToken);
  const userRole = token.user.roles[0].name;
  if (userRole === "user") {
    const navigation = [
      { name: "Dashboard", to: { name: "User" } },
      { name: "UserPage1", to: { name: "UserPage" } },
    ];
    return navigation;
  } else if (userRole === "admin") {
    const navigation = [
      { name: "Dashboard", to: { name: "Admin" } },
      { name: "AdminPage1", to: { name: "AdminPage" } },
    ];
    return navigation;
  }
}

const logoutButton = async () => {
  logout();
};
</script>