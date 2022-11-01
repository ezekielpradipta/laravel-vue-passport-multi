import axiosClient from "../axios";
import { createToaster } from "@meforma/vue-toaster";
import jwt_decode from "jwt-decode";
import router from "../router";
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
                toaster.success(
                    response.data.message + " " + response.data.data.name
                );
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
            })
            .catch((err) => {
                if (err.response.data.errors) {
                    for (const [key, value] of Object.entries(
                        err.response.data.errors
                    )) {
                        toaster.error(`${value}`);
                    }
                }
            });
    };
    const logout = async () => {
        let coba = await axiosClient.post("/logout");
        console.log(coba);
        localStorage.removeItem("token");
        router.push({
            name: "Login",
        });
    };
    return {
        login,
        logout,
    };
}