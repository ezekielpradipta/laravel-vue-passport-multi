import axiosClient from "../axios";
import { createToaster } from "@meforma/vue-toaster";
import jwt_decode from "jwt-decode";
import router from "../router";
import axios from "axios";
export default function useAuth() {
    const toaster = createToaster({
        position: "top-right",
        duration: 3000,
    });
    const login = async (data) => {
        await axiosClient
            .post("/login", data)
            .then((response) => {
                console.log(response);

                if (response.response) {
                    if (response.response.status === 400) {
                        for (const [key, value] of Object.entries(
                            response.response.data
                        )) {
                            toaster.error(`${value}`);
                        }
                    }
                } else {
                    if (response.data.success === false) {
                        toaster.error(
                            response.data.message +
                                ", Periksa Kembali Email/Password"
                        );
                    } else {
                        if (response.data.token) {
                            localStorage.setItem("token", response.data.token);
                            let token = jwt_decode(response.data.token);
                            let userRole = token.user.roles[0].name;
                            if (userRole === "user") {
                                router.push({
                                    name: "User",
                                });
                            } else if (userRole === "admin") {
                                router.push({
                                    name: "Admin",
                                });
                            }
                            toaster.success(response.data.message);
                        }
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const logout = async () => {
        let coba = await axiosClient.post("/logout");
        localStorage.removeItem("token");
        router.push({
            name: "Login",
        });
        if (coba.data) {
            toaster.success(coba.data.message);
        }
    };
    return {
        login,
        logout,
    };
}
